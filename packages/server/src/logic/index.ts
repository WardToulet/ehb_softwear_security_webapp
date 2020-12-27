import { NewAccount, Account } from '@ss/types';
import { Repo } from '../service'
import bcyrpt from 'bcrypt';
import PasswordPolicy from '../service/passwordPolicy';
import LoginWaitList from '../service/loginWaitList';

const SALT_ROUNDS = 10;

type LogicProps = {
  repo: Repo,
  passwordPolicy: PasswordPolicy,  
  loginWaitList: LoginWaitList,
}

class Logic {
  props: LogicProps;

  constructor(props: LogicProps) {
    this.props = props;
  }

  /**
   * Create a new account and persist it
   *
   * @throws AccountTaken if the email is alrady used
   * @throws PasswordInsufficientLength if the password is to short
   * @throws PasswordInvalidCharacters if the password contains invalid characters
   * @throws PasswordCommonlyUsed if the password appears in a list of common passwords
   * @returns Account
   */
  async registerAccount(newAccount: NewAccount): Promise<Account> {
    try {
      const password = await this.props.passwordPolicy.checkPassword(newAccount.password);
      const hashed = await bcyrpt.hash(password, SALT_ROUNDS);

      newAccount.password = hashed;
      return this.props.repo.createAccount(newAccount);
    } catch(e) {
      return Promise.reject(e);
    }
  }

  /**
   * Returns the account if the email and passwords are valid
   * @returns Account
   * @throws AccountDoesNotExist if no account with this email exists
   * @throws WrongCredentials if the password does not match
   */
  login(email: string, password: string): Account {
    let account = this.props.repo.getAccountByEmail(email);
    account = this.props.loginWaitList.check(account);

    if(!bcyrpt.compareSync(password, account.password)) {
      this.props.loginWaitList.add(account);
      throw new WrongCredentials();
    }

    return account;

  }
}

export class WrongCredentials extends Error {
  constructor() {
    super('Email and password do not match');
    this.name = 'WrongCredentials';
  }
}

// Rexport error types that are not dealth with in the businesslogic
export { AccountDoesNotExist, AccountTaken } from '../service/repo';

export default Logic;

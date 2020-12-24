import { NewAccount, Account } from '@ss/types';
import { Repo } from '../service'
import bcyrpt from 'bcrypt';
import passwordPolicy from './passwordPolicy';

const SALT_ROUNDS = 10;

class Logic {
  repo: Repo;

  constructor(repo: Repo) {
    this.repo = repo;
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
  registerAccount(newAccount: NewAccount): Account {
    const password = passwordPolicy(newAccount.password);
    newAccount.password = bcyrpt.hashSync(password, SALT_ROUNDS);
    return this.repo.createAccount(newAccount);
  }

  /**
   * Returns the account if the email and passwords are valid
   *
   * @returns Account
   * @throws AccountDoesNotExist if no account with this email exists
   * @throws WrongCredentials if the password does not match
   */
  login(email: string, password: string): Account {
    // TODO: use hashing lib to compare passwords
    const account = this.repo.getAccountByEmail(email);

    if(!bcyrpt.compareSync(password, account.password)) {
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

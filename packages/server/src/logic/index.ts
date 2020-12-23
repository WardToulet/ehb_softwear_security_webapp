import { NewAccount, Account } from '@ss/types';
import { Repo } from '../service'

class Logic {
  repo: Repo;

  constructor(repo: Repo) {
    this.repo = repo;
  }

  /**
   * Create a new account and persist it
   *
   * @throws AccountTaken if the email is alrady used
   * @returns Account
   */
  registerAccount(newAccount: NewAccount): Account {
    // TODO: salt and hash the password 
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
    if(account.password !== password) {
      throw new WrongCredentials();
    }

    return account;
  }
}

export class WrongCredentials extends Error {
  constructor() {
    super('Wrong credentials');
    this.name = 'WrongCredentials';
  }
}

// Rexport error types that are not dealth with in the businesslogic
export { AccountDoesNotExist, AccountTaken } from '../service/repo';

export default Logic;

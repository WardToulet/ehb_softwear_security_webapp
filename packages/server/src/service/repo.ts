import { Account, NewAccount } from '@ss/types';

/**
 * Generic spec for creating accounts in a repo 
 */ 
export default interface Repo {
  /**
   * Returns the created account
   *
   * @param newAccount the account information
   * @returns `Account` that was created
   * @throws `AccountTaken` if an account with the email already exists
   */
  createAccount(newAccount: NewAccount): Account,

  /**
   * Returns the account with email
   *
   * @param email the emailadress of the account
   * @throws AccountDoesNotExist if no account with the email exists
   * @returns `Account` with email
   */ 
  getAccountByEmail(email: string): Account,

  /**
   * Returns the account with id 
   *
   * @param id the id of the account
   * @throws AccountDoesNotExist if no account with the email exists
   * @returns `Account` with email
   */
  getAccountById(id: string): Account
}

/**
 * Error for claimed accounts
 */
export class AccountTaken extends Error {
  constructor(email: string) {
    super(`An account with email: "${email}" has already been created`);
    this.name = 'AccountTaken';
  }
}

/**
 * Error for nonexistent accounts 
 */
export class AccountDoesNotExist extends Error {
  constructor(props: Object) {
    super(`No account with ${Object.entries(props).map(([k, v]) => `${k}: "${v}"`).join(', ')}`);
    this.name = 'AccountDoesNotExist';
  }
}

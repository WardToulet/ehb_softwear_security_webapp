import { Account } from '@ss/types';
/**
 * Generic spec for checking passwords
 */ 
export default interface LoginWaitlist {
  /**
   * Add an account to the timeout list if the account is already timed out increases time exponentialy
   * @throws AccountTimedOut
   */
  add(account: Account): void;

  /**
   * Returns the account if not timed out otherwiser throws an error 
   * @throws AccountTimedOut
   */
  check(account: Account): Account;
}

export class AccountTimedOut extends Error {
  constructor(until: number) {
    super(`Account Timed out until: ${new Date(until).toString()}`);
    this.name = 'AccountTimedOut';
  }
}

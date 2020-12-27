/**
 * Generic spec for checking passwords
*
 */ 
export default interface PasswordPolicy {
  /**
   * Returns the password if valid otherwiser throws an error 
   * @param password the password to check 
   * @throws PasswordError
   * @returns string Password
   */
  checkPassword(password: string): Promise<string>;
}

export class PasswordError extends Error {
  constructor(reason: string) {
    super(`Password not allowed: ${reason}`);
    this.name = 'PasswordError';
  }
}

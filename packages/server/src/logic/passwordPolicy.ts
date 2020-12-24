/**
 * Returns the password
 * @arg password
 * @throws PasswordInsufficientLength
 * @throws PasswordInvalidCharacters
 * @throws PasswordCommonlyUsed
 * @return `string` password
 **/
function validatePassword(password: string): string {
  if(password.length < 7)
    throw new PasswordInsufficientLength();

  console.log(password.split('').map(c => c.charCodeAt(0)).every(cc => cc >= 33 && cc <= 126));
  if(password.split('').map(c => c.charCodeAt(0)).map(x => {console.log(x); return x}).some(cc => cc < 33 || cc > 126))
    throw new PasswordInvalidCharacters();

  // TODO: check password against HIBP api

  return password;
}

export class PasswordInvalidCharacters extends Error {
  constructor() {
    super('The password contains invalid characters only printable ASCII characters may be used');
    this.name = 'PasswordInvalidCharacters';
  }
}

export class PasswordCommonlyUsed extends Error {
  constructor() {
    super('This occurs in a list of most used passwords');
    this.name = 'PasswordCommonlyUsed';
  }
}

export class PasswordInsufficientLength extends Error {
  constructor() {
    super('Password must consist out of at least 7 characters');
    this.name = 'PasswordInsufficientLength';
  }
}

export default validatePassword;

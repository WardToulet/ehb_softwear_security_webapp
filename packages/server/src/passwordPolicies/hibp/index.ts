import PasswordPolicy, { PasswordError } from '../../service/passwordPolicy';
import { pwnedPassword } from 'hibp';

class HibpPasswordPolicy implements PasswordPolicy {
  async checkPassword(password: string) {
    // Checks the length of the password
    if(password.length < 7)
      throw new PasswordError('insuficient length');

    // Check if the password only consist of ascii characters
    if(password.split('')
      .map(c => c.charCodeAt(0))
      .some(cc => cc < 33 || cc > 126)
    ) throw new PasswordError('contains invalid characters');
      
    // Check if the password is commony used
    // pwnedPasswordRange
    const hibpCount = await pwnedPassword(password);
    if(hibpCount > 300)
      throw new PasswordError('commonly used');

    return password;
  }
}

export default HibpPasswordPolicy;

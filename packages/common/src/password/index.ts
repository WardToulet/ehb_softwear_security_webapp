const isPrintableAscci = (charCode: number) =>
  charCode >= 32 && charCode <= 123;

// TODO: use the hibp api to check if the password is common
const containsAllowed = (input: string): boolean => input.split('')
  .map(c => c.charCodeAt(0))
  .every(isPrintableAscci)

const isAllowedPassword = (password: string): boolean => password.length >= 7 
  && containsAllowed(password)

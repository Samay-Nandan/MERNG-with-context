const EMAIL_REGEX = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

export const validateRegisterInput = ( username, email, password, confirmPassword ) => {
  const errors = {};
  if ( !username ) errors.username = 'Username must not be empty';
  else if (username.length < 6) errors.username = 'Username must contain least 6 characters';

  if ( !email ) errors.email = 'Email must not be empty';
  else if (!email.match( EMAIL_REGEX ) ) errors.email = 'Email must be a valid email address';

  if ( !password ) errors.password = 'Password must not be empty';
  else if ( password.length < 8 ) errors.password = 'Password must contain at least 8 characters';
  else if ( password !== confirmPassword ) errors.confirmPassword = 'Passwords must match';

  return {
    errors,
    valid: Object.keys(errors).length < 1 
  };
}

export const validateLoginInput = ( username, password ) => {
  const errors = {};

  if ( !username ) errors.username = 'Username must not be empty';
  if ( !password ) errors.password = 'Password must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length < 1 
  };
}
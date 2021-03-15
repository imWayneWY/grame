const errors = {
  // SIGN UP ERROR
  REGISITER_USERNAME_OR_EMAIL_EXISITED: { id: 1001, message: 'Username or Email has already existed'},
  REGISITER_USERNAME_INVALID: { id: 1002, message: 'Invalid Username'},
  REGISITER_EMAIL_INVALID: {id: 1003, message: 'Invalid Email'},
  REGISITER_PASSWORD_INVALID: {id: 1004, message: 'Invalid Password'},
  REGISITER_PASSWORD_NO_MATCH: {id: 1005, message: 'Passwords must match'},
  
  // LOGIN ERROR
  LOGIN_USERNAME_INVALID: { id: 2001, message: 'Username must not be empty'},
  LOGIN_PASSWORD_INVALID: {id: 2002, message: 'Password must not be empty'},
  LOGIN_USER_NOT_EXISTED: {id: 2003, message: 'User not found'},
  LOGIN_WRONG_PASSWORD: {id: 2004, message: 'Wrong credentials'},
}

export default errors;

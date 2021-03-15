import { errorProps, LoginInputProps, RegisterInputProps, validRes } from "../types";
import errors from "./../errorCode";

export const validRegisiterInput: (props:RegisterInputProps) => validRes = ({username, email, password, confirmPassword}) => {
  let error = {} as errorProps;
  if (username.trim() === "") {
    error = errors.REGISITER_USERNAME_INVALID;
  }
  if (email.trim() === "") {
    error = errors.REGISITER_EMAIL_INVALID;
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      error = errors.REGISITER_EMAIL_INVALID;
    }
  }
  if (password.trim() === "") {
    error = errors.REGISITER_PASSWORD_INVALID;
  } else if (password.trim() !== confirmPassword.trim()) {
    error = errors.REGISITER_PASSWORD_NO_MATCH;
  }
  return {error, isValid: !error.id};
};

export const validLoginInput: (props:LoginInputProps) => validRes = ({username, password}) => {
  let error = {} as errorProps;
  if (username.trim() === "") {
    error = errors.LOGIN_USERNAME_INVALID;
  }
  if (password.trim() === "") {
    error = errors.LOGIN_PASSWORD_INVALID;
  }
  return {error, isValid: !error.id};
}
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config';
import {AuthenticationError} from 'apollo-server';
import { userTokenProps } from '../types';

export default (token?: string) => {
  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY) as userTokenProps;
      return user;
    } catch(err) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  } else {
    throw new Error("Authentication token must be provided, and must be 'Bearer [token]'");
  }
}

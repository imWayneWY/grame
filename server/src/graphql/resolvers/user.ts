import User, { UserDoc } from "./../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { UserInputError } from "apollo-server";
import errors from "../../errorCode";
import { errorProps, LoginInputProps, RegisterInputProps, userTokenProps } from "../../types";
import { validLoginInput, validRegisiterInput } from "../../utils";
const genToken = (user: UserDoc) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    } as userTokenProps,
    SECRET_KEY,
    { expiresIn: "2h" }
  );

export default {
  Mutation: {
    async register(
      parent: any,
      args: { registerInput: RegisterInputProps },
      context: any,
      info: any
    ) {
      const { username, email, password, confirmPassword } = args.registerInput;
      const { error, isValid } = validRegisiterInput({
        username,
        email,
        password,
        confirmPassword,
      });
      if (!isValid) {
        throw new UserInputError(error.message, { error });
      }
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!!user) {
        const $error: errorProps = errors.REGISITER_USERNAME_OR_EMAIL_EXISITED;
        throw new UserInputError($error.message, {
          error: $error,
        });
      }
      const encryptPwd = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password: encryptPwd,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = genToken(res);

      return {
        email: res.email,
        username: res.username,
        createdAt: res.createdAt,
        token,
      };
    },
    async login(parent: any, args: LoginInputProps, context: any, info: any) {
      const { username, password } = args;
      const { isValid, error } = validLoginInput(args);
      if (!isValid) {
        throw new UserInputError(error.message, { error });
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError(errors.LOGIN_USER_NOT_EXISTED.message, {
          error: errors.LOGIN_USER_NOT_EXISTED,
        });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError(errors.LOGIN_WRONG_PASSWORD.message, {
          error: errors.LOGIN_WRONG_PASSWORD,
        });
      }
      const token = genToken(user);
      
      return {
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        token,
      };
    },
  },
};

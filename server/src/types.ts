export type errorProps = {
  id: number;
  message: string;
}

export type RegisterInputProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputProps = {
  username: string;
  password: string;
}

export type validRes = {
  error: errorProps;
  isValid: boolean;
}

export type PostQueryByIdProps = {
  postId: string;
}
export type User = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

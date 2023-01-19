export interface Context {
  userId: string
}

export interface UserPayload {
  username: string;
  password: string;
}

export interface CreateUserOrLogin {
  data: UserPayload
}

export interface GetUsers {
  limit: number | undefined
}

export interface JwtPayload {
  userId: string;
  exp: number;
}
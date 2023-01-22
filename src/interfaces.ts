export interface Context {
  userId: string
}

export interface JwtPayload {
  userId: string;
  exp: number;
}
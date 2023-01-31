export interface Context {
  userId?: string;
  ipAddress: string;
}

export interface JwtPayload {
  userId: string;
  exp: number;
}
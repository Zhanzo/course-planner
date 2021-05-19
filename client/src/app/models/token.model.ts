export interface Token {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
  refreshToken: string;
}

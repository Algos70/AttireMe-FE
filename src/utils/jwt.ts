import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  nickname: string;
  picture: string;
  email_verified: boolean;
  custom_roles: string[];
  updated_at: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sid: string;
  at_hash: string;
  nonce: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}; 
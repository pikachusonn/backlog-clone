import { ErrorKey } from '../constant/common.js';

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  errorKey?: ErrorKey;
  timestamp: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

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

export interface PaginatedResult<T> {
  data: T[];
  metaData: {
    pageIndex: number;
    pageSize?: number;
    total: number;
    totalPages?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorKey } from '../constant/common.js';
import { ApiErrorResponse } from '../interface/common.js';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorKey: ErrorKey = ErrorKey.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as ApiErrorResponse;
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        if (res.message !== undefined) {
          message = res.message;
        }

        if (status === HttpStatus.BAD_REQUEST && Array.isArray(res.message)) {
          errorKey = ErrorKey.VALIDATION_ERROR;
        } else if (res.errorKey) {
          errorKey = res.errorKey;
        }
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      errorKey,
      timestamp: new Date().toISOString(),
    });
  }
}

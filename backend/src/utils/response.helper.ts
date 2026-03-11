import { Response } from 'express';
import { SuccessResponse, ErrorResponse, ValidationErrorResponse } from '@shared/types';

export class ResponseHelper {
  static success<T>(res: Response, data: T, statusCode: number = 200): void {
    const response: SuccessResponse<T> = {
      success: true,
      data,
    };
    res.status(statusCode).json(response);
  }

  static successWithMessage<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): void {
    const response: SuccessResponse<T> = {
      success: true,
      data: data as T,
      message,
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, statusCode: number = 500, error?: string): void {
    const response: ErrorResponse = {
      success: false,
      message,
      error,
    };
    res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string): void {
    const response: ErrorResponse = {
      success: false,
      message,
    };
    res.status(404).json(response);
  }

  static validationError(res: Response, message: string, errors?: Record<string, string[]>): void {
    const response: ValidationErrorResponse = {
      success: false,
      message,
      errors,
    };
    res.status(400).json(response);
  }
}

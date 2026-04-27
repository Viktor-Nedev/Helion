import type { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(_request: Request, response: Response) {
  response.status(404).json({
    success: false,
    error: "Route not found",
    generatedAt: new Date().toISOString()
  });
}

export function errorHandler(
  error: Error | ApiError,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;

  response.status(statusCode).json({
    success: false,
    error: error.message || "Internal server error",
    generatedAt: new Date().toISOString()
  });
}

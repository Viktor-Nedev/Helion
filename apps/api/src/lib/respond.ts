import type { ApiResponse } from "@helio/shared";

export function ok<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    generatedAt: new Date().toISOString()
  };
}

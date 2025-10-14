export interface apiResponse<T> {
  timestamp: string | null;
  status: string | null;
  message: string | null;
  data: T | null;
}

export interface UseApiResult<T> {
  data: T | null;
  message: string | null;
  error: string | null;
  loading: boolean;
}
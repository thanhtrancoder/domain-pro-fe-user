export interface apiResponse<T> {
  timestamp: string | null;
  status: number | null;
  message: string | "";
  data: T | null;
}

export interface UseApiResult<T> {
  data: T | null;
  message: string | "";
  error: apiResponse<null> | null;
  loading: boolean;
}
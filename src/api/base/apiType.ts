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

interface page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface pageRes<T> {
  content: T[];
  page: page;
}

export interface pageReq {
  size: number;
  page: number;
  sort?: string;
}
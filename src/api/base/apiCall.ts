import type { apiResponse, UseApiResult } from "./apiType";
import apiClient from "./apiClient";

export async function callGet<T, B>(url: string, params?: B): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | null = null;
  let error: string | null = null;
  let loading = true;

  try {
    const resp = await apiClient.get<apiResponse<T>>(url, {params});
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = "Lỗi kết nối đến server";
    } else {
      error = err.message || "Error";
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callDelete<T>(url: string, id: string): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | null = null;
  let error: string | null = null;
  let loading = true;

  try {
    const resp = await apiClient.delete<apiResponse<T>>(url+"/"+id);
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = "Lỗi kết nối đến server";
    } else {
      error = err.message || "Error";
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callPost<T, B>(
  url: string,
  body: B
): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | null = null;
  let error: string | null = null;
  let loading = true;

  try {
    const resp = await apiClient.post<apiResponse<T>>(url, body);
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = "Lỗi kết nối đến server";
    } else {
      error = err.message || "Error";
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callPut<T, B>(
  url: string,
  body: B
): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | null = null;
  let error: string | null = null;
  let loading = true;

  try {
    const resp = await apiClient.put<apiResponse<T>>(url, body);
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = "Lỗi kết nối đến server";
    } else {
      error = err.message || "Error";
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}


import type { apiResponse, UseApiResult } from "./apiType";
import apiClient from "./apiClient";

interface callApiParams<B> {
  url: string;
  id?: string;
  data?: B;
  login?: boolean;
  withCredentials?: boolean;
}

export async function callGet<T, B>(params: callApiParams<B>): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | "" = "";
  let error: apiResponse<null> | null = null;
  let loading = true;

  try {
    const resp = await apiClient.get<apiResponse<T>>(
      params.url,
      {params: params.data, login: params.login, withCredentials: params.withCredentials}
    );
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = {
        timestamp: null,
        status: null,
        message: "Lỗi kết nối đến server",
        data: null,
      };
    } else if(err.path !== undefined && err.path !== null && err.path !== "") {
      error = {
        timestamp: null,
        status: null,
        message: "Có lỗi xảy ra trong quá trình xử lý",
        data: null,
      };
    } else {
      error = err;
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callDelete<T>(params: callApiParams<null>): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | "" = "";
  let error: apiResponse<null> | null = null;
  let loading = true;

  try {
    const resp = await apiClient.delete<apiResponse<T>>(
      params.url + "/" + params.id,
      { login: params.login, withCredentials: params.withCredentials }
    );
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = {
        timestamp: null,
        status: null,
        message: "Lỗi kết nối đến server",
        data: null,
      };
    } else if(err.path !== undefined && err.path !== null && err.path !== "") {
      error = {
        timestamp: null,
        status: null,
        message: "Có lỗi xảy ra trong quá trình xử lý",
        data: null,
      };
    } else {
      error = err;
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callPost<T, B>(params: callApiParams<B>): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | "" = "";
  let error: apiResponse<null> | null = null;
  let loading = true;

  try {
    const resp = await apiClient.post<apiResponse<T>>(
      params.url,
      params.data,
      { login: params.login, withCredentials: params.withCredentials }
    );
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = {
        timestamp: null,
        status: null,
        message: "Lỗi kết nối đến server",
        data: null,
      };
    } else if(err.path !== undefined && err.path !== null && err.path !== "") {
      error = {
        timestamp: null,
        status: null,
        message: "Có lỗi xảy ra trong quá trình xử lý",
        data: null,
      };
    } else {
      error = err;
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callPut<T, B>(params: callApiParams<B>): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | "" = "";
  let error: apiResponse<null> | null = null;
  let loading = true;

  try {
    const resp = await apiClient.put<apiResponse<T>>(
      params.url,
      params.data,
      { login: params.login, withCredentials: params.withCredentials }
    );
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = {
        timestamp: null,
        status: null,
        message: "Lỗi kết nối đến server",
        data: null,
      };
    } else if(err.path !== undefined && err.path !== null && err.path !== "") {
      error = {
        timestamp: null,
        status: null,
        message: "Có lỗi xảy ra trong quá trình xử lý",
        data: null,
      };
    } else {
      error = err;
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}

export async function callPatch<T, B>(params: callApiParams<B>): Promise<UseApiResult<T>> {
  let data: T | null = null;
  let message: string | "" = "";
  let error: apiResponse<null> | null = null;
  let loading = true;

  try {
    const resp = await apiClient.patch<apiResponse<T>>(
      params.url,
      params.data,
      { login: params.login, withCredentials: params.withCredentials }
    );
    const responseCustom: apiResponse<T> = resp.data;
    data = responseCustom.data;
    message = responseCustom.message;
  } catch (err: any) {
    if (err instanceof TypeError) {
      error = {
        timestamp: null,
        status: null,
        message: "Lỗi kết nối đến server",
        data: null,
      };
    } else if(err.path !== undefined && err.path !== null && err.path !== "") {
      error = {
        timestamp: null,
        status: null,
        message: "Có lỗi xảy ra trong quá trình xử lý",
        data: null,
      };
    } else {
      error = err;
    }
  } finally {
    loading = false;
  }

  return { data, error, message, loading };
}


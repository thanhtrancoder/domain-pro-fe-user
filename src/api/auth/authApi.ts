import type { UseApiResult } from '../base/apiType';
import { callPost, callGet } from '../base/apiCall';
import type { registerReq } from './authReq';
import type { loginRes } from './authRes';

const authUrl = `/auth`;

export async function register(req: registerReq): Promise<UseApiResult<loginRes>> {
  return callPost<loginRes, registerReq>({
    url: authUrl + `/register`,
    data: req,
  });
}

export async function oauth2(): Promise<UseApiResult<loginRes>> {
  return callGet<loginRes, null>({
    url: `/oauth2/me`,
    withCredentials: true,
  });
}
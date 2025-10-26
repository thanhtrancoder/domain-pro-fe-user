import type { UseApiResult } from '../base/apiType';
import { callPost, callGet, callPut } from '../base/apiCall';
import type { registerReq, loginReq, updateAccountReq } from './authReq';
import type { loginRes } from './authRes';
import type { accountProfileRes } from '../account/accountRes';

const authUrl = `/auth`;

export async function register(req: registerReq): Promise<UseApiResult<loginRes>> {
  return callPost<loginRes, registerReq>({
    url: authUrl + `/register`,
    data: req,
  });
}

export async function login(req: loginReq): Promise<UseApiResult<loginRes>> {
  return callPost<loginRes, loginReq>({
    url: authUrl + `/login`,
    data: req,
  });
}

export async function oauth2(): Promise<UseApiResult<loginRes>> {
  return callGet<loginRes, null>({
    url: `/oauth2/me`,
    withCredentials: true,
  });
}

export async function updateAccount(req: updateAccountReq): Promise<UseApiResult<accountProfileRes>> {
  return callPut<accountProfileRes, updateAccountReq>({
    url: authUrl + `/update`, 
    data: req,
    login: true,
  });
}
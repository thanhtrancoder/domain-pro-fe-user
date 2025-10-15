import type { UseApiResult } from '../base/apiType';
import { callPost } from '../base/apiCall';
import type { registerReq } from './authReq';
import type { loginRes } from './authRes';

const authUrl = `/auth`;

export async function register(req: registerReq): Promise<UseApiResult<loginRes>> {
  return callPost<loginRes, registerReq>({
    url: authUrl + `/register`,
    data: req,
  });
}
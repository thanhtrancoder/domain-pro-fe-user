
import { callGet } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { accountProfileRes } from "./accountRes";

const accountUrl = `/account`;

export async function getProfile(): Promise<UseApiResult<accountProfileRes>> {
  return callGet<accountProfileRes, null>({
    url: accountUrl + `/profile`,
    login: true,
  });
}
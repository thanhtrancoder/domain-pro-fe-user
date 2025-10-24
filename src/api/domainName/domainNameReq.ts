import type { pageReq } from "../base/apiType";

export interface searchDomainNameReq extends pageReq {
  keyword?: string;
  status?: string;
}

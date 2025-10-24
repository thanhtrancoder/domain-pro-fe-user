import { callGet } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { domainNameDashboardRes } from "./domainNameRes";

const domainNameUrl = `/domain-name`;

export async function getCountDomainName(): Promise<UseApiResult<domainNameDashboardRes>> {
  return callGet<domainNameDashboardRes, null>({
    url: `${domainNameUrl}/count`,
    login: true,
  });
}
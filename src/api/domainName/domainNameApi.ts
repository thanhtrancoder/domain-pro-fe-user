import { callGet, callPut } from "../base/apiCall";
import type { pageRes, UseApiResult } from "../base/apiType";
import type { domainNameDashboardRes, domainNameDto } from "./domainNameRes";
import type { searchDomainNameReq } from "./domainNameReq";

const domainNameUrl = `/domain-name`;

export async function getCountDomainName(): Promise<UseApiResult<domainNameDashboardRes>> {
  return callGet<domainNameDashboardRes, null>({
    url: `${domainNameUrl}/count`,
    login: true,
  });
}

export async function searchDomainName(req: searchDomainNameReq): Promise<UseApiResult<pageRes<domainNameDto>>> {
  return callGet<pageRes<domainNameDto>, searchDomainNameReq>({
    url: `${domainNameUrl}/search`,
    login: true,
    data: req,
  });
}

export async function updateDomainName(req: domainNameDto): Promise<UseApiResult<domainNameDto>> {
  return callPut<domainNameDto, domainNameDto>({
    url: `${domainNameUrl}/update`,
    login: true,
    data: req,
  });
}

export async function getDomainNameDetail(domainNameId: string): Promise<UseApiResult<domainNameDto>> {
  return callGet<domainNameDto, { domainNameId: string }>({
    url: `${domainNameUrl}/detail`,
    data: {
      domainNameId: domainNameId,
    },
    login: true,
  });
}
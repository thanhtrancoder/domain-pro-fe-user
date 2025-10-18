import type { UseApiResult } from '../base/apiType';
import { callGet, callPost } from '../base/apiCall';
import type { searchRequest } from './domainExtendReq';
import type { domainExtendDto } from './domainExtendRes';
import type { pageRes } from '../base/apiType';

const domainExtendUrl = `/domain-extend`;

export async function getDomainExtendPopular(): Promise<UseApiResult<domainExtendDto[]>> {
  return callGet<domainExtendDto[], null>({
    url: `${domainExtendUrl}/popular`,
  });
}

export async function searchDomainExtend(request: searchRequest): Promise<UseApiResult<pageRes<domainExtendDto>>> {
  return callGet<pageRes<domainExtendDto>, searchRequest>({
    url: `${domainExtendUrl}/search`,
    data: request,
  });
}
import type { UseApiResult } from '../base/apiType';
import { callGet, callPost } from '../base/apiCall';
import type { searchRequest } from './domainExtendReq';
import type { searchResponse, domainExtendDto } from './domainExtendRes';

const domainExtendUrl = `/domain-extend`;

export async function getDomainExtendPopular(): Promise<UseApiResult<domainExtendDto[]>> {
  return callGet<domainExtendDto[], null>({
    url: `${domainExtendUrl}/popular`,
  });
}

export async function searchDomainExtend(request: searchRequest): Promise<UseApiResult<searchResponse>> {
  return callGet<searchResponse, searchRequest>({
    url: `${domainExtendUrl}/search`,
    data: request,
  });
}
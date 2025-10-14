import type { UseApiResult } from './base/apiType';
import { callGet, callPost } from './base/apiCall';

export interface domainExtendDto {
  domainExtendId: number;
  name: string;
  basePrice: number;
}

const domainExtendUrl = `/domain-extend`;

export async function getPopular(): Promise<UseApiResult<domainExtendDto[]>> {
  return callGet<domainExtendDto[], null>(`${domainExtendUrl}/popular`);
}

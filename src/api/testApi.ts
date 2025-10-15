import type { UseApiResult } from './base/apiType';
import { callGet, callPost } from './base/apiCall';

export interface testDto {
  id: string;
  name: string;
}

const testUrl = `/test`;

export async function getTest(): Promise<UseApiResult<testDto>> {
  return callGet<testDto, null>({
    url: testUrl,
  });
}

export async function postTest(
  payload: testDto
): Promise<UseApiResult<testDto>> {
  return callPost<testDto, testDto>({
    url: testUrl + `/post`,
    data: payload,
  });
}



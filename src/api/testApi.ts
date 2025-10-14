import type { UseApiResult } from './base/apiType';
import { callGet, callPost } from './base/apiCall';

export interface testDto {
  id: string;
  name: string;
}

export async function getTest(): Promise<UseApiResult<testDto>> {
  return callGet<testDto, null>(`/test`);
}

export async function postTest(
  payload: testDto
): Promise<UseApiResult<testDto>> {
  return callPost<testDto, testDto>(`/test/post`, payload);
}



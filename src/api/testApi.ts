import type { UseApiResult } from './apiType';
import { callGet, callPost } from './apiCall';

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



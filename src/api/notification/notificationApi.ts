import type { pageRes, UseApiResult } from '../base/apiType';
import { callGet } from '../base/apiCall';
import type { notificationDto } from './notificationRes';
import type { pageReq } from '../base/apiType';

const notificationUrl = `/notification`;

export async function getAllNotification(req: pageReq): Promise<UseApiResult<pageRes<notificationDto>>> {
  return callGet<pageRes<notificationDto>, pageReq>({
    url: `${notificationUrl}/all`,
    login: true,
    data: req,
  });
}
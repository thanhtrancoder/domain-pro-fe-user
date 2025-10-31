import type { pageRes, UseApiResult } from '../base/apiType';
import { callGet, callPost } from '../base/apiCall';
import type { notificationDto } from './notificationRes';
import type { pageReq } from '../base/apiType';
import type { notificationNewsReq } from './notificationReq';

const notificationUrl = `/notification`;

export async function getAllNotification(req: pageReq): Promise<UseApiResult<pageRes<notificationDto>>> {
  return callGet<pageRes<notificationDto>, pageReq>({
    url: `${notificationUrl}/all`,
    login: true,
    data: req,
  });
}

export async function registerNews(req: notificationNewsReq): Promise<UseApiResult<null>> {
  return callPost<null, notificationNewsReq>({
    url: `${notificationUrl}/news/register`,
    data: req,
  });
}
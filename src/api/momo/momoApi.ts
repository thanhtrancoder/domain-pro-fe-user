import { callPost } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { CollectionLinkReq, CheckPaymentReq } from "./momoReq";
import type { MoMoRes, checkPaymentRes } from "./momoRes";

const momoUrl = `/momo`;

export async function createCollectionLink(req: CollectionLinkReq): Promise<UseApiResult<MoMoRes>> {
  return callPost<MoMoRes, CollectionLinkReq>({
    url: `${momoUrl}/create`,
    data: req,
    login: true,
  });
}

export async function checkPayment(req: CheckPaymentReq): Promise<UseApiResult<checkPaymentRes>> {
  return callPost<checkPaymentRes, CheckPaymentReq>({
    url: `${momoUrl}/check`,
    data: req,
    login: true,
  });
}
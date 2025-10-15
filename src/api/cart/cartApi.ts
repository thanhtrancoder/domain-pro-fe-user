import { callGet, callPost } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { cartDto } from "./cartReq";

const cartUrl = `/cart`;

export async function addToCart(request: cartDto): Promise<UseApiResult<null>> {
  return callPost<null, cartDto>({
    url: `${cartUrl}/add`,
    data: request,
    login: true,
  });
}
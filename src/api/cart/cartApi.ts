import { callGet, callPost, callPut, callDelete } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { addCartReq, updateCartReq } from "./cartReq";
import type { cartDto } from "./cartRes";
import type { pageRes } from "../base/apiType";

const cartUrl = `/cart`;

export async function addToCart(request: addCartReq): Promise<UseApiResult<null>> {
  return callPost<null, addCartReq>({
    url: `${cartUrl}/add`,
    data: request,
    login: true,
  });
}

export async function getAllCart(): Promise<UseApiResult<pageRes<cartDto>>> {
  return callGet<pageRes<cartDto>, null>({
    url: `${cartUrl}/all`,
    login: true,
  });
}

export async function updateCartItem(request: updateCartReq): Promise<UseApiResult<cartDto>> {
  return callPut<cartDto, updateCartReq>({
    url: `${cartUrl}/update`,
    data: request,
    login: true,
  });
}

export async function deleteCartItem(cartId: number): Promise<UseApiResult<null>> {
  return callDelete<null>({
    url: `${cartUrl}/delete`,
    id: cartId.toString(),
    login: true,
  });
}
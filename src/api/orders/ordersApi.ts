import { callPost } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { OrderCreateRes, OrderDto } from "./ordersRes";

const ordersUrl = `/orders`;

export async function createOrder(req: OrderDto): Promise<UseApiResult<OrderCreateRes>> {
  return callPost<OrderCreateRes, OrderDto>({
    url: `${ordersUrl}/create`,
    data: req,
    login: true,
  });
}
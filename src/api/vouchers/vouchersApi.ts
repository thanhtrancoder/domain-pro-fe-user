import type { vouchersApplyRes } from "./vouchersRes";
import { callGet } from "../base/apiCall";
import type { UseApiResult } from "../base/apiType";
import type { vouchersApplyReq } from "./vouchersReq";

const vouchersUrl = `/vouchers`;

export async function applyVoucher(request: vouchersApplyReq): Promise<UseApiResult<vouchersApplyRes>> {
  return callGet<vouchersApplyRes, vouchersApplyReq>({
    url: `${vouchersUrl}/apply`,
    data: request,
    login: true,
  });
}
import type { UseApiResult } from "./base/apiType";
import { callGet } from "./base/apiCall";

export interface voucherDto {
  vouchersId: number | null;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount: number;
  usageLimit: number;
  usagePerUser: number;
  startAt: string; // ISO string format for LocalDateTime
  expiresAt: string; // ISO string format for LocalDateTime
}

const vouchersUrl = `/vouchers`;

export async function getDiscountest(): Promise<UseApiResult<voucherDto>> {
  return callGet<voucherDto, null>({
    url: `${vouchersUrl}/discountest`,
  });
}
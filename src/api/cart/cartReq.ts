export interface addCartReq {
  cartId?: number | null;
  accountId?: number | null;
  domainName?: string;
  domainExtendId?: number | null;
  period?: number;
  domainExtend?: string;
  price?: number;
  discountPrice?: number;
  isAvailable?: boolean | null;
}

export interface updateCartReq {
  cartId: number;
  period: number;
}
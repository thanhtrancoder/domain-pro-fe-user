export interface CollectionLinkReq {
  orderId: string;
}

export interface CheckPaymentReq {
  partnerCode: string | null;
  orderId: string | null;
  requestId: string | null;
  amount: string | null;
  orderInfo: string | null;
  orderType: string | null;
  transId: string | null;
  resultCode: string | null;
  message: string | null;
  payType: string | null;
  responseTime: string | null;
  extraData: string | null;
  signature: string | null;
}
  
export interface MoMoRes {
  payUrl: string;
  shortLink: string;
}

export interface checkPaymentRes {
  orderId: string;
  amount: number;
  createdAt: string;
}

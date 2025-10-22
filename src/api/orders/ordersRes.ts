export interface OrderDto {
  orderId?: number;
  accountId?: number;
  fullname: string;
  email: string;
  phone?: string;
  province?: string;
  address?: string;
  paymentMethodId: number;
  paymentMethodName?: string;
  discountCode?: string;
  discountPrice?: number;
  totalPrice?: number;
  status?: number;
}

export interface OrderCreateRes {
  orderId: number;
}
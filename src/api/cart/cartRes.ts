export interface cartDto {
  cartId: number;
  accountId?: number | null;
  domainName: string;
  domainExtendId?: number | null;
  period: number;
  domainExtend: string;
  price: number;
  discountPrice: number;
  isAvailable?: boolean | null;
}
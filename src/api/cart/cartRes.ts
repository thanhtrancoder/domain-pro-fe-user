export interface cartDto {
  cartId: number;
  accountId?: number | null;
  domainName: string;
  domainExtendId?: number | null;
  period: number;
  domainExtend: string;
  basePrice: number;
  discountPrice: number;
  isAvailable?: boolean | null;
}
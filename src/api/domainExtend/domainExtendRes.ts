export interface domainExtendDto {
  domainExtendId: number;
  name: string;
  basePrice: number;
  isAddToCart: boolean;
}

interface page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface searchResponse {
  content: domainExtendDto[];
  page: page;
}
export interface relatedDomainType {
  id:number;
  domain: string;
  price: number;
  priceDiscount: number;
}

export const relatedDomainSample: relatedDomainType[] = [
  {
    id: 1,
    domain: ".com",
    price: 1399000,
    priceDiscount: 1299000,
  },
  {
    id: 2,
    domain: ".net",
    price: 449000,
    priceDiscount: 349000,
  },
  {
    id: 3,
    domain: ".vn",
    price: 799000,
    priceDiscount: 599000,
  },
  {
    id: 4,
    domain: ".org",
    price: 429000,
    priceDiscount: 329000,
  },
  {
    id: 5,
    domain: ".info",
    price: 299000,
    priceDiscount: 199000,
  },
  {
    id: 6,
    domain: ".xyz",
    price: 199000,
    priceDiscount: 99000,
  },
]

export interface resultDomainType {
  domain: string;
  price: number;
  priceDiscount: number;
  isAvailable: boolean;
}

export const resultDomainSample: resultDomainType = {
  domain: "thanhtrancoder.vn",
  price: 1199000,
  priceDiscount: 1099000,
  isAvailable: true
}
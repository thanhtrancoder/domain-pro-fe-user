export interface domainType {
  id: number;
  name: string;
  period: number;
  price: number;
  priceDiscout: number;
}

export const domainListSample: domainType[] = [{
  id: 1,
  name: "mydomain.com",
  period: 2,
  price: 399000,
  priceDiscout: 598000,
}, {
  id: 2,
  name: "mybusiness.net",
  period: 1,
  price: 499000,
  priceDiscout: 349000,
}]
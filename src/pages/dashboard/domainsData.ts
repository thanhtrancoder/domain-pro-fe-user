export type domainType = {
  id: number;
  isChecked: boolean;
  name: string;
  isAutoRenew: boolean;
  status: "active" | "expiring" | "expired";
  expiredDate: string;
  isBlocked: boolean;
};

export const searchDomainListTemp: domainType[] = [
  {
    id: 1,
    isChecked: false,
    name: "mydomain.com",
    isAutoRenew: true,
    status: "active",
    expiredDate: "2025-12-25",
    isBlocked: false,
  },
  {
    id: 2,
    isChecked: false,
    name: "mybusiness.net",
    isAutoRenew: false,
    status: "active",
    expiredDate: "2025-10-20",
    isBlocked: false,
  },
  {
    id: 3,
    isChecked: false,
    name: "mystore.vn",
    isAutoRenew: false,
    status: "expiring",
    expiredDate: "2025-09-25",
    isBlocked: false,
  },
  {
    id: 4,
    isChecked: false,
    name: "oldsite.org",
    isAutoRenew: false,
    status: "expired",
    expiredDate: "2025-09-25",
    isBlocked: false,
  },
];

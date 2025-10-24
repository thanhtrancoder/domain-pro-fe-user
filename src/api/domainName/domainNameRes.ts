export interface domainNameDashboardRes {
  totalDomainNameActive: number;
  totalDomainNameExpiring: number;
  totalDomainNameExpired: number;
}

export interface domainNameDto {
  domainNameId?: number | null;
  domainName?: string;
  domainExtend?: string;
  domainExtendId?: number | null;
  isAutoRenewal?: boolean | null;
  registerAt?: string | null; // ISO string format
  expiresAt?: string | null; // ISO string format
  isBlock?: boolean | null;
  dnsProvider?: string;
  accountId?: number | null;
  status?: number | null;
  isChecked?: boolean;
}
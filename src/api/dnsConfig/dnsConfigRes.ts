export interface dnsConfigDto {
  virtualId: number | null;
  dnsConfigId: number | null;
  domainNameId: number | null;
  host: string;
  type: string;
  value: string;
  ttl: number | null;
}
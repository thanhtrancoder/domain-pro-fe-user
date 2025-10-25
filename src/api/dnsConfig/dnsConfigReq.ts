import type { dnsConfigDto } from "./dnsConfigRes";

export interface dnsConfigMatchReq {
  domainNameId: number;
  dnsConfigs: dnsConfigDto[];
}
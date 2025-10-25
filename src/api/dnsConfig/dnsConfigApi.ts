import type { pageRes, UseApiResult } from "../base/apiType"
import { callGet, callPatch } from "../base/apiCall"
import type { dnsConfigDto } from "./dnsConfigRes"
import type { dnsConfigMatchReq } from "./dnsConfigReq"

const dnsConfigUrl = `/dns-config`;

export async function getAllDnsConfig(domainNameId: string): Promise<UseApiResult<pageRes<dnsConfigDto>>> {
  return callGet<pageRes<dnsConfigDto>, { domainNameId: string }>({
    url: `${dnsConfigUrl}/all`,
    data: {
      domainNameId: domainNameId,
    },
    login: true,
  });
}

export async function matchDnsConfig(req: dnsConfigMatchReq): Promise<UseApiResult<pageRes<dnsConfigDto>>> {
  return callPatch<pageRes<dnsConfigDto>, dnsConfigMatchReq>({
    url: `${dnsConfigUrl}/match`,
    data: req,
    login: true,
  });
}
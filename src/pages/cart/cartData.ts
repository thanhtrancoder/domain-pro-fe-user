import { ShieldIcon, LockClosedIcon, ServerIcon, EnvelopeIcon } from "../../components/icons/Icon";
import type { iconProps } from "../../components/icons/Icon";

export interface domainType {
  id: number;
  domainName: string;
  price: number;
  priceDiscount: number;
  period: number;
}

export const domainListSample: domainType[] = [{
  id: 1,
  domainName: "mydomain.com",
  price: 399000,
  priceDiscount: 299000,
  period: 1,
}, {
  id: 2,
  domainName: "mybusiness.net",
  price: 449000,
  priceDiscount: 349000,
  period: 2,
}]

export interface serviceType {
  id: number;
  icon: React.FC<iconProps>;
  name: string;
  description: string;
  price: number;
  priceDiscount: number;
  isChecked: boolean;
}

export const serviceListSample: serviceType[] = [{
  id: 1,
  icon: ShieldIcon,
  name: "Personal information protection (Domain Privacy)",
  description: "Hide personal information from the public WHOIS database",
  price: 299000,
  priceDiscount: 199000,
  isChecked: false,
}, {
  id: 2,
  icon: LockClosedIcon,
  name: "Standard SSL Certificate",
  description: "Secure your website with 256-bit encryption",
  price: 399000,
  priceDiscount: 299000,
  isChecked: false,
}, {
  id: 3,
  icon: ServerIcon,
  name: "Web Hosting Starter",
  description: "10GB SSD hosting, unlimited bandwidth",
  price: 299000,
  priceDiscount: 199000,
  isChecked: false,
}, {
  id: 4,
  icon: EnvelopeIcon,
  name: "Business Email",
  description: "5 mailboxes with 10GB storage each",
  price: 149000,
  priceDiscount: 99000,
  isChecked: false,
}]
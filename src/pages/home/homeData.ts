import { GlobeIcon, ServerIcon, ShieldIcon, EnvelopeIcon } from "../../components/icons/Icon";
import type { iconProps } from "../../components/icons/Icon";

interface serviceType {
  id: number;
  icon: React.FC<iconProps>;
  title: string;
  description: string;
  feature: string[];
  price: number;
  unitPrice: string;
  navigate: string;
};

export const serviceListSample: serviceType[] = [
  {
    id: 1,
    icon: GlobeIcon,
    title: "Domain Registration",
    description:
      "Register domains with 500+ extensions. Competitive pricing, professional service.",
    feature: ["24/7 support", "Free DNS", "Easy transfer"],
    price: 99000,
    unitPrice: "year",
    navigate: "/search?domain=yourdomain.com",
  },
  {
    id: 2,
    icon: ServerIcon,
    title: "Web Hosting",
    description:
      "High-speed hosting with SSD, unlimited bandwidth, and 99.9% uptime.",
    feature: ["NVMe SSD", "Free SSL", "Automatic backup"],
    price: 199000,
    unitPrice: "month",
    navigate: "/coming-soon",
  },
  {
    id: 3,
    icon: ShieldIcon,
    title: "SSL Certificates",
    description:
      "Secure your website with SSL certificates from top global providers.",
    feature: ["256-bit encryption", "Auto-installation", "100% warranty"],
    price: 299000,
    unitPrice: "year",
    navigate: "/coming-soon",
  },
  {
    id: 4,
    icon: EnvelopeIcon,
    title: "Business Email",
    description:
      "Professional email with custom domain, large storage, and high security.",
    feature: ["50GB storage", "Anti-spam", "Multi-device sync"],
    price: 99000,
    unitPrice: "month",
    navigate: "/coming-soon",
  },
];

interface domainDiscountType {
  domain: string;
  discount: number;
  expiredDuringDate: number;
};

export const domainDiscountSample: domainDiscountType = {
  domain: ".xyz",
  discount: 50,
  expiredDuringDate: 7,
};

interface domainDiscountListType {
  id: number;
  domain: string;
  price: number;
  priceDiscount: number;
  feature: string[];
};

export const domainDiscountListSample: domainDiscountListType[] = [{
  id: 1,
  domain: ".net",
  price: 449000,
  priceDiscount: 349000,
  feature: ["Free DNS", "Free transfer", "24/7 support"],
},{
  id: 2,
  domain: ".com",
  price: 399000,
  priceDiscount: 299000,
  feature: ["Free DNS", "Free transfer", "24/7 support"],
},{
  id: 3,
  domain: ".vn",
  price: 799000,
  priceDiscount: 599000,
  feature: ["Free DNS", "Free transfer", "24/7 support"],
}]
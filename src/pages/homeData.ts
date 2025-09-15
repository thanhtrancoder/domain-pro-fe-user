import { GlobeIcon, ServerIcon, ShieldIcon, EnvelopeIcon } from "../components/icons/Icon";
import type { iconProps } from "../components/icons/Icon";

interface domainSaleType {
  id: number;
  domain: string;
  price: number;
  priceSale: number;
};

export const domainSaleListSample:domainSaleType[] = [
  {
    id: 1,
    domain: ".com",
    price: 399000,
    priceSale: 299000,
  },
  {
    id: 2,
    domain: ".net",
    price: 449000,
    priceSale: 349000,
  },
  {
    id: 3,
    domain: ".vn",
    price: 799000,
    priceSale: 599000,
  },
  {
    id: 4,
    domain: ".org",
    price: 429000,
    priceSale: 329000,
  },
  {
    id: 5,
    domain: ".info",
    price: 299000,
    priceSale: 199000,
  },
  {
    id: 5,
    domain: ".xyz",
    price: 199000,
    priceSale: 99000,
  },
];

interface serviceType {
  id: number;
  icon: React.FC<iconProps>;
  title: string;
  description: string;
  feature: string[];
  price: number;
  unitPrice: string;
};

export const serviceListSample: serviceType[] = [
  {
    id: 1,
    icon: GlobeIcon,
    title: "Đăng ký tên miền",
    description:
      "Đăng ký tên miền với hơn 500+ đuôi tên miền khác nhau. Giá cả cạnh tranh, dịch vụ chuyên nghiệp.",
    feature: ["Hỗ trợ 24/7", "DNS miễn phí", "Chuyển đổi dễ dàng"],
    price: 99000,
    unitPrice: "năm",
  },
  {
    id: 2,
    icon: ServerIcon,
    title: "Web Hosting",
    description:
      "Hosting tốc độ cao với SSD, băng thông không giới hạn và uptime 99.9%.",
    feature: ["SSD NVMe", "SSL miễn phí", "Backup tự động"],
    price: 199000,
    unitPrice: "tháng",
  },
  {
    id: 3,
    icon: ShieldIcon,
    title: "Chứng chỉ SSL",
    description:
      "Bảo mật website với chứng chỉ SSL từ các nhà cung cấp uy tín hàng đầu thế giới.",
    feature: ["Mã hóa 256-bit", "Cài đặt tự động", "Bảo hành 100%"],
    price: 299000,
    unitPrice: "năm",
  },
  {
    id: 4,
    icon: EnvelopeIcon,
    title: "Email doanh nghiệp",
    description:
      "Email chuyên nghiệp với tên miền riêng, dung lượng lớn và bảo mật cao.",
    feature: ["50GB dung lượng", "Anti-spam", "Đồng bộ đa thiết bị"],
    price: 99000,
    unitPrice: "tháng",
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
  feature: ["DNS miễn phí", "Chuyển đổi miễn phí", "Hỗ trợ 24/7"],
},{
  id: 2,
  domain: ".com",
  price: 399000,
  priceDiscount: 299000,
  feature: ["DNS miễn phí", "Chuyển đổi miễn phí", "Hỗ trợ 24/7"],
},{
  id: 3,
  domain: ".vn",
  price: 799000,
  priceDiscount: 599000,
  feature: ["DNS miễn phí", "Chuyển đổi miễn phí", "Hỗ trợ 24/7"],
}]
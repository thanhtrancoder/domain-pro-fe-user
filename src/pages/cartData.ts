import { ShieldIcon, LockClosedIcon, ServerIcon, EnvelopeIcon } from "../components/icons/Icon";
import type { iconProps } from "../components/icons/Icon";

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
  name: "Bảo vệ thông tin cá nhân (Domain Privacy)",
  description: "Ẩn thông tin cá nhân khỏi cơ sở dữ liệu WHOIS công khai",
  price: 299000,
  priceDiscount: 199000,
  isChecked: false,
}, {
  id: 2,
  icon: LockClosedIcon,
  name: "Chứng chỉ SSL Standard",
  description: "Bảo mật website với mã hóa 256-bit",
  price: 399000,
  priceDiscount: 299000,
  isChecked: false,
}, {
  id: 3,
  icon: ServerIcon,
  name: "Web Hosting Starter",
  description: "Hosting SSD 10GB, băng thông không giới hạn",
  price: 299000,
  priceDiscount: 199000,
  isChecked: false,
}, {
  id: 4,
  icon: EnvelopeIcon,
  name: "Email doanh nghiệp",
  description: "5 hộp thư với 10GB dung lượng mỗi hộp",
  price: 149000,
  priceDiscount: 99000,
  isChecked: false,
}]
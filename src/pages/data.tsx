import { ShieldIcon, BoltIcon, UserIcon } from "../components/icons/Icon";
import type { iconProps } from "../components/icons/Icon";

export interface supportType {
  icon: React.FC<iconProps>;
  content: string;
}

export const supportData: supportType[] = [
  {
    icon: ShieldIcon,
    content: "Bảo mật thông tin tuyệt đối",
  },
  {
    icon: BoltIcon,
    content: "Đăng ký tên miền nhanh chóng",
  },
  {
    icon: UserIcon,
    content: "Hỗ trợ khách hàng 24/7",
  },
];

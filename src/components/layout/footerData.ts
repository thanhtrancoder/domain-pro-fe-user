import {
  HomeIcon,
  GlobeIcon,
  CartIcon,
  UserCircleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  FacebookIcon,
  XIcon,
  LinkedInIcon,
  InstagramIcon,
  ShieldIcon,
  LockClosedIcon,
} from "../icons/Icon";
import type { menuType } from "./types";

export const footerMenuList: menuType[] = [
  {
    label: "Trang chủ",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Tên miền",
    href: "/domains",
    icon: GlobeIcon,
  },
  {
    label: "Giỏ hàng",
    href: "/cart",
    icon: CartIcon,
  },
  {
    label: "Bảng điều khiển",
    href: "/dashboard",
    icon: UserCircleIcon,
  },
];

export const contactList: menuType[] = [
  {
    label: "Tầng 15, Tòa nhà ABC,123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    href: "https://maps.app.goo.gl/HmFDfMuEm7GUPWir8",
    icon: MapPinIcon,
  },
  {
    label: "(01) 2345 6789",
    href: "tel:+84123456789",
    icon: PhoneIcon,
  },
  {
    label: "support@domainpro.vn",
    href: "mailto:support@domainpro.vn",
    icon: EnvelopeIcon,
  },
];

export const socialList: menuType[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FacebookIcon,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: InstagramIcon,
  },
];

export const certificateList: menuType[] = [
  {
    label: "SSL Secured",
    href: "",
    icon: ShieldIcon,
  },
  {
    label: "Comodo Verified",
    href: "",
    icon: LockClosedIcon,
  },
];

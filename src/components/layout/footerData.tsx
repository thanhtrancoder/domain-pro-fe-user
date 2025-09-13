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
    icon: <HomeIcon className="size-4"></HomeIcon>,
  },
  {
    label: "Tên miền",
    href: "/domains",
    icon: <GlobeIcon className="size-4"></GlobeIcon>,
  },
  {
    label: "Giỏ hàng",
    href: "/cart",
    icon: <CartIcon className="size-4"></CartIcon>,
  },
  {
    label: "Bảng điều khiển",
    href: "/dashboard",
    icon: <UserCircleIcon className="size-4"></UserCircleIcon>,
  },
];

export const contactList: menuType[] = [
  {
    label: "Tầng 15, Tòa nhà ABC,123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    href: "https://maps.app.goo.gl/HmFDfMuEm7GUPWir8",
    icon: (
      <MapPinIcon className="text-primary size-5 flex-shrink-0"></MapPinIcon>
    ),
  },
  {
    label: "(01) 2345 6789",
    href: "tel:+84123456789",
    icon: <PhoneIcon className="text-primary size-5 flex-shrink-0"></PhoneIcon>,
  },
  {
    label: "support@domainpro.vn",
    href: "mailto:support@domainpro.vn",
    icon: (
      <EnvelopeIcon className="text-primary size-5 flex-shrink-0"></EnvelopeIcon>
    ),
  },
];

export const socialList: menuType[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FacebookIcon className="h-6 w-6 text-gray-200"></FacebookIcon>,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: <XIcon className="h-6 w-6 text-gray-200"></XIcon>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <LinkedInIcon className="h-6 w-6 text-gray-200"></LinkedInIcon>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <InstagramIcon className="h-6 w-6 text-gray-200"></InstagramIcon>,
  },
];

export const certificateList: menuType[] = [
  {
    label: "SSL Secured",
    href: "",
    icon: <ShieldIcon className="text-fourth-hover h-6 w-6"></ShieldIcon>,
  },
  {
    label: "Comodo Verified",
    href: "",
    icon: <LockClosedIcon className="text-fifth size-6"></LockClosedIcon>,
  },
];

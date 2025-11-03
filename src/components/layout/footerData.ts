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
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Domains",
    href: "/search",
    icon: GlobeIcon,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: CartIcon,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: UserCircleIcon,
  },
];

export const contactList: menuType[] = [
  {
    label: "720A Dien Bien Phu, Ward 22, Binh Thanh District, Ho Chi Minh City",
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

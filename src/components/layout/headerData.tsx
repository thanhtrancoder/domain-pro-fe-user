import type { menuType } from "./types";
import { HomeIcon, GlobeIcon } from "../icons/Icon";

export const headerMenuList: menuType[] = [
  {
    label: "Trang chủ",
    href: "/",
    icon: <HomeIcon></HomeIcon>,
  },
  {
    label: "Tên miền",
    href: "/domains",
    icon: <GlobeIcon></GlobeIcon>,
  },
];

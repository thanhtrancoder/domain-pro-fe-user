import type { menuType } from "./types";
import { HomeIcon, GlobeIcon } from "../icons/Icon";

export const headerMenuList: menuType[] = [
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
];

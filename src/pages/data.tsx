import { ShieldIcon, BoltIcon, UserIcon } from "../components/icons/Icon";
import type { iconProps } from "../components/icons/Icon";

export interface supportType {
  icon: React.FC<iconProps>;
  content: string;
}

export const supportData: supportType[] = [
  {
    icon: ShieldIcon,
    content: "Absolute data security",
  },
  {
    icon: BoltIcon,
    content: "Fast domain registration",
  },
  {
    icon: UserIcon,
    content: "24/7 customer support",
  },
];

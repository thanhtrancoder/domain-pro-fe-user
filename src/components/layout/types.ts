import type { iconProps } from "../icons/Icon";

export interface menuType {
  label: string;
  href: string;
  icon: React.FC<iconProps>;
}
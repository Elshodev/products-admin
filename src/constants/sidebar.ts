import { LucideIcon, Package } from "lucide-react";
import { IconType } from "react-icons";

interface MenuItem {
  path?: string;
  label: string;
  icon: LucideIcon | IconType;
}

const adminMenu: MenuItem[] = [
  {
    path: "/",
    label: "Mahsulotlar",
    icon: Package,
  },
];

export default adminMenu;
export type { MenuItem };

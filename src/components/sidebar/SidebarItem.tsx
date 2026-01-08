import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: LucideIcon | IconType;
  label: string;
  path: string;
  count?: number;
  keyWord?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  path,
}) => {
  const baseStyle =
    "flex items-center justify-between gap-[10px] p-[14px_20px] pr-[15px] font-medium text-[14px]";
  const activeStyle = "bg-white text-main-orange";
  const inactiveStyle = "text-main-black hover:bg-gray-100";

  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return `${isActive ? activeStyle : inactiveStyle} ${baseStyle}`;
      }}
    >
      {({ isActive }) => (
        <>
          <div className="flex gap-2 items-center">
            <Icon
              className={`w-5 h-5 shrink-0 ${
                isActive ? "text-main-orange" : "text-main-black"
              }`}
            />
            <span>{label}</span>
          </div>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;

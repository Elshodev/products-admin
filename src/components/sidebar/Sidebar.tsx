import sidebar from "../../constants/sidebar";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  openMenu: boolean;
}

export default function Sidebar({ openMenu }: SidebarProps) {
  return (
    <aside
      className={`shadow h-[calc(100vh-48px)] no-scroll max-w-[230px] w-full shrink-0 overflow-y-auto ${
        openMenu ? "hidden" : ""
      }`}
    >
      <nav className="py-1">
        {sidebar.map((item: any) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </nav>
    </aside>
  );
}

import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function AdminLayout() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <Header setOpenMenu={setOpenMenu} />
      <div className="flex">
        <Sidebar openMenu={openMenu} />
        <main className="h-[calc(100vh-48px)] bg-[#F5F6F8] w-full overflow-hidden p-[16px_20px] relative">
          <Outlet />
        </main>
      </div>
    </>
  );
}

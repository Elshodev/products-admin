import { LogOut } from "lucide-react";
import HeaderLeft from "./HeaderLeft";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  setOpenMenu?: (value: boolean | ((prev: boolean) => boolean)) => void;
}

function Header({ setOpenMenu }: HeaderProps) {
  const { logout } = useAuthStore();

  return (
    <div className="h-[48px] w-full flex items-center top-0 py-[10px] bg-white main-shadow z-[1] relative">
      <HeaderLeft onToggleMenu={() => setOpenMenu?.((prev) => !prev)} />
      <div className="px-[24px] w-full flex justify-end items-center">
        <button onClick={() => logout()} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Chiqish
        </button>
      </div>
    </div>
  );
}

export default Header;

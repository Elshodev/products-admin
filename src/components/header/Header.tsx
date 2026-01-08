import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, LogOut } from "lucide-react";
import HeaderLeft from "./HeaderLeft";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  setOpenMenu?: (value: boolean | ((prev: boolean) => boolean)) => void;
}

interface DataItem {
  id: number;
  name: string;
  [key: string]: any;
}

function Header({ setOpenMenu }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [data, setData] = useState<DataItem | null>(null);
  const { id } = useParams<{ id: string }>();
  const excludeHeaderLeftPages = ["/reports/"];

  const shouldHideHeaderLeft = excludeHeaderLeftPages.some((path) =>
    pathname.startsWith(path)
  );
  const { logout } = useAuthStore();
  const selectedPath = pathname.split("/").filter((item) => item)[0] || "";

  useEffect(() => {
    if (shouldHideHeaderLeft) {
      const storedData = JSON.parse(
        localStorage.getItem(selectedPath) || "[]"
      ) as DataItem[];
      const currentItem = storedData.find(
        (item) => item.id === parseInt(id || "0")
      );
      if (!currentItem) {
        alert("Not Found");
        navigate(`/${selectedPath}`);
      } else {
        setData(currentItem);
      }
    }
  }, [shouldHideHeaderLeft, selectedPath, id, navigate]);

  return (
    <div className="h-[48px] w-full flex items-center top-0 py-[10px] bg-white main-shadow z-[1] relative">
      {!shouldHideHeaderLeft ? (
        <HeaderLeft onToggleMenu={() => setOpenMenu?.((prev) => !prev)} />
      ) : (
        <Link
          to={`/${selectedPath}`}
          className="text-main-black pl-4 flex items-center gap-4 whitespace-nowrap font-bold text-base"
        >
          <ChevronLeft />
          {data?.name}
        </Link>
      )}
      <div className="px-[24px] w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="text-main-black text-base whitespace-nowrap font-bold leading-[1]">
            {pathname.split("/").filter((item) => item)[0] || ""}
          </h1>
        </div>
        <div className="flex items-center gap-[30px]">
          <button onClick={() => logout()} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

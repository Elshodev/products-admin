import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderLeftProps {
  onToggleMenu: () => void;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({ onToggleMenu }) => {
  return (
    <div className="flex items-center w-full justify-between max-w-[230px] px-[24px_20px]">
      <Link to={`/`} className="text-main-black text-lg font-bold leading-[1]">
        LOGO
      </Link>
      <button onClick={onToggleMenu}>
        <Menu />
      </button>
    </div>
  );
};

export default HeaderLeft;

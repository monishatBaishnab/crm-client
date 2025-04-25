import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggler";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full h-14 px-5 flex items-center justify-between bg-white border-b border-b-gray-100 dark:bg-gray-900 dark:border-b-gray-800 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="hidden md:block text-gray-800 dark:text-gray-200"
          aria-label="Toggle sidebar"
        >
          <Menu />
        </button>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Hello {user?.name} 👋🏼
        </h3>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-colors duration-300 text-gray-500 dark:text-gray-200 hover:shadow-sm"
          aria-label="Toggle theme"
        >
          <LogOut className="size-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

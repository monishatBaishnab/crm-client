import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");

    // Clear cookie (just in case)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white h-14 border-b border-b-gray-100 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="hidden md:block"
          aria-label="Toggle sidebar"
        >
          <Menu />
        </button>
        <h3 className="text-xl font-semibold text-black">Hello Evano 👋🏼</h3>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-1.5 text-red-500 transition-all active:bg-red-200/80"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </header>
  );
};
export default Navbar;

import {
  Bell,
  Bolt,
  FolderKanban,
  Gauge,
  MessageSquare,
  Users2,
} from "lucide-react";
import { Link, NavLink } from "react-router";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", to: "/", icon: Gauge },
  { label: "Clients", to: "/clients", icon: Users2 },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Reminders", to: "/reminders", icon: Bell },
  { label: "Interactions", to: "/interactions", icon: MessageSquare },
] as const;

const Sidebar = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <aside
      className={`shrink-0 transition-all duration-300 ${
        isSmall ? "w-14" : "w-64"
      }`}
    >
      <div className="h-screen w-full border-r border-r-gray-100 bg-white dark:bg-gray-900 dark:border-r-gray-800">
        <div className="p-4">
          <Link to={"/"} className="flex items-center text-purple-500">
            <div className="shrink-0 flex items-center justify-center">
              <Bolt />
            </div>
            <h3
              className={`text-xl font-bold transition-all ml-2 text-nowrap ${
                isSmall ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              CRM Dashboard
            </h3>
          </Link>
        </div>
        <div className="space-y-2 p-2">
          {SIDEBAR_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg py-2 transition-all duration-300 ${
                  isSmall ? "px-[9px]" : "px-4"
                }
                ${
                  isActive
                    ? "bg-purple-500 text-white hover:bg-purple-500"
                    : "text-[#9197B3] dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-500 dark:hover:text-purple-400"
                }`
              }
            >
              <div className="shrink-0">
                <Icon className="size-5" />
              </div>
              <h3
                className={`transition-all text-nowrap ${
                  isSmall ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              >
                {label}
              </h3>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

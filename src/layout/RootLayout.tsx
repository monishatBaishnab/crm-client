import { Outlet } from "react-router";
import Navbar from "../components/sheared/Navbar";
import Sidebar from "../components/sheared/Sidebar";
import useIsSmallScreen from "../hooks/useSmallScreen";

const RootLayout = () => {
  const { isSmall, setIsSmall } = useIsSmallScreen();

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-2xl items-center bg-[#F8F8F8] dark:dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* –– Sidebar –– */}
      <Sidebar isSmall={isSmall} />

      {/* –– Main content –– */}
      <main className="h-screen w-full grow overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
        <Navbar toggle={() => setIsSmall(!isSmall)} />

        <div className="h-[calc(100vh_-_56px)] overflow-y-auto">
          {/* –– Routed pages –– */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;

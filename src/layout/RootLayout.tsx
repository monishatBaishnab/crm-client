import { Outlet } from "react-router";
import Navbar from "../components/sheared/Navbar";
import Sidebar from "../components/sheared/Sidebar";
import useIsSmallScreen from "../hooks/useSmallScreen";

const RootLayout = () => {
  const { isSmall, setIsSmall } = useIsSmallScreen();

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-2xl items-center bg-[#F8F8F8]">
      {/* –– Sidebar –– */}
      <Sidebar isSmall={isSmall} />

      {/* –– Main content –– */}
      <main className="h-screen w-full grow overflow-y-auto">
        <Navbar toggle={() => setIsSmall(!isSmall)} />

        {/* –– Routed pages –– */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

import RecentInteractions from "./components/RecentInteractions";
import RecentReminders from "./components/RecentReminders";
import { useQuery } from "@tanstack/react-query";
import { authServices } from "../../lib/axios/services/auth.services";
import DashboardStats from "./components/DashboardStates";

const Dashboard = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["states"],
    queryFn: () => authServices.fetchStates(),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-xl font-bold">Overview</h2>

      {/* -- States -- */}
      <DashboardStats stats={data?.data} isLoading={isLoading || isFetching} />

      {/* <ProductsTable /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecentInteractions />
        <RecentReminders />
      </div>
    </div>
  );
};

export default Dashboard;

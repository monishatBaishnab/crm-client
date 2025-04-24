import { Users2 } from "lucide-react";
import ProductsTable from "./components/ProductsTable";

const Dashboard = () => {
  return (
    <div className="p-5 space-y-5">
      <h2 className="text-xl font-bold">Overview</h2>

      {/* -- States -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white w-full min-h-20 rounded-lg border border-gray-200 flex items-center justify-between gap-2 p-5">
          <div>
            <span className="text-gray-500">Total Clients</span>
            <h2 className="text-4xl font-bold">0003</h2>
          </div>
          <div className="size-20 bg-purple-100 text-purple-500 flex items-center justify-center rounded-md">
            <Users2 className="size-12" />
          </div>
        </div>
        <div className="bg-white w-full min-h-20 rounded-lg border border-gray-200 flex items-center justify-between gap-2 p-5">
          <div>
            <span className="text-gray-500">Total Clients</span>
            <h2 className="text-4xl font-bold">0003</h2>
          </div>
          <div className="size-20 bg-purple-100 text-purple-500 flex items-center justify-center rounded-md">
            <Users2 className="size-12" />
          </div>
        </div>
        <div className="bg-white w-full min-h-20 rounded-lg border border-gray-200 flex items-center justify-between gap-2 p-5">
          <div>
            <span className="text-gray-500">Total Clients</span>
            <h2 className="text-4xl font-bold">0003</h2>
          </div>
          <div className="size-20 bg-purple-100 text-purple-500 flex items-center justify-center rounded-md">
            <Users2 className="size-12" />
          </div>
        </div>
        <div className="bg-white w-full min-h-20 rounded-lg border border-gray-200 flex items-center justify-between gap-2 p-5">
          <div>
            <span className="text-gray-500">Total Clients</span>
            <h2 className="text-4xl font-bold">0003</h2>
          </div>
          <div className="size-20 bg-purple-100 text-purple-500 flex items-center justify-center rounded-md">
            <Users2 className="size-12" />
          </div>
        </div>
      </div>

      <ProductsTable />
    </div>
  );
};

export default Dashboard;

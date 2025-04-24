import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productServices } from "../../../services/project.services";
import useDebounce from "../../../hooks/useDebounce";
import Table from "../../../components/ui/Table";
import { PRODUCTS_COLUMNS } from "../dashboard.constants";
import Pagination from "../../../components/ui/Pagination";

const DataTable = () => {
  const pageSize = 5;
  const totalItems = 10;
  const [page, setPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    code: "",
  });
  const debouncedName = useDebounce(searchFilters.name, 300);
  const debouncedCode = useDebounce(searchFilters.code, 300);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products"],
    queryFn: productServices.fetchProducts,
    refetchOnWindowFocus: false,
  });
  console.log(data);
  console.log(error);


  const products = [];
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      {/* Search inputs (optional UI—remove if handled elsewhere) */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none"
          placeholder="Filter by name…"
          value={searchFilters.name}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, name: e.target.value })
          }
        />
        <input
          className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none"
          placeholder="Filter by code…"
          value={searchFilters.code}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, code: e.target.value })
          }
        />
      </div>

      {/* Presentational table */}
      <Table
        columns={PRODUCTS_COLUMNS}
        data={products}
        isLoading={isLoading || isFetching}
      />

      <Pagination
        page={page}
        total={totalItems}
        pageSize={pageSize}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default DataTable;

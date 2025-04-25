import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import useDebounce from "../../hooks/useDebounce";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Edit, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { CLIENT_COLUMNS } from "./resources/client.constants";
import { deleteClient, TClient } from "./resources";
import { useClients } from "./hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Clients = () => {
  const navigate = useNavigate();
  const pageSize = 5;

  // Individual state slices
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalClients, setTotalClients] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Reset page when search or status filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const queryFilters = useMemo(() => {
    const filters = [
      { name: "page", value: page.toString() },
      { name: "limit", value: pageSize.toString() },
    ];

    if (debouncedSearchTerm) {
      filters.push({ name: "searchTerm", value: debouncedSearchTerm });
    }

    return filters;
  }, [page, debouncedSearchTerm]);

  const { data, meta, isLoading, isFetching, isSuccess } =
    useClients(queryFilters); // Use custom hook for fetching clients

  const formattedClients = data?.length
    ? data?.map((client: TClient) => ({
        ...client,
        created_at: new Date(client.created_at).toLocaleDateString(),
        updated_at: new Date(client.updated_at).toLocaleDateString(),
      }))
    : [];

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  useEffect(() => {
    if (isSuccess && meta?.total > 0) {
      setTotalClients(meta.total);
    } else if (isSuccess) {
      setTotalClients(1);
    }
  }, [isSuccess, meta]);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Clients Overview
        </h2>
        <Button onClick={() => navigate("/clients/create")}>
          Create <Plus className="size-5" />
        </Button>
      </div>
      <div className="space-y-5 bg-white shadow rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
            Clients
          </h4>
          <div>
            <input
              className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Table
          columns={CLIENT_COLUMNS} // Column configuration for the client table
          data={formattedClients}
          isLoading={isLoading || isFetching}
          renderActions={(client: TClient) => (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/clients/update/${client.id}`)}
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                title="Edit"
              >
                <Edit className="size-4" />
              </button>
              <button
                disabled={isPending}
                onClick={() => mutate(client.id)}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                title="Delete"
              >
                <Trash className="size-4" />
              </button>
            </div>
          )}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          total={totalClients}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Clients;

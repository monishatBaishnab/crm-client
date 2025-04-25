import { useMemo, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import useDebounce from "../../hooks/useDebounce";
import useProjects from "../../hooks/useProjects";
import { TProject } from "../../types/project.types";
import { PROJECT_COLUMNS, STATUS_OPTIONS } from "./project.constants";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";

const Projects = () => {
  const pageSize = 5;

  // Individual state slices
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedStatus = useDebounce(status, 300);

  // Reset page when search or status filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
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

    if (debouncedStatus) {
      filters.push({ name: "status", value: debouncedStatus });
    }

    return filters;
  }, [page, debouncedSearchTerm, debouncedStatus]);

  const { data, meta, isLoading, isFetching } = useProjects(queryFilters);

  const formattedProjects = data?.length
    ? data?.map((project: TProject) => ({
        ...project,
        clientName: project.client?.name ?? "N/A",
        budget: `$${Number(project.budget).toLocaleString()}`,
        deadline: new Date(project.deadline).toLocaleDateString(),
        created_at: new Date(project.created_at).toLocaleDateString(),
      }))
    : [];

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Overview</h2>
        <Button>
          Create <Plus className="size-5" />
        </Button>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">Projects</h4>
          <div className="flex gap-2 mb-4">
            <select
              className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none"
              placeholder="Search by title…"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Table
          columns={PROJECT_COLUMNS}
          data={formattedProjects}
          isLoading={isLoading || isFetching}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          total={meta?.total}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Projects;

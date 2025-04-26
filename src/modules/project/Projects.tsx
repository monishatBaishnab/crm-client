import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import useDebounce from "../../hooks/useDebounce";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Edit, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { PROJECT_COLUMNS, STATUS_OPTIONS } from "./resources/project.constants";
import { deleteProject, TProject } from "./resources";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjects } from "./hook";

const Projects = () => {
  const navigate = useNavigate();
  const pageSize = 5;

  // Individual state slices
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState("");
  const [totalProjects, setTotalProjects] = useState(1);

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
    if (status) {
      filters.push({ name: "status", value: status });
    }
    return filters;
  }, [page, debouncedSearchTerm, status]);
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };
  const { data, meta, isLoading, isFetching, isSuccess } =
    useProjects(queryFilters);

  const formattedProjects = data?.length
    ? data?.map((project: TProject) => ({
        ...project,
        clientName: project.client?.name ?? "N/A",
        budget: `$${Number(project.budget).toLocaleString()}`,
        deadline: new Date(project.deadline).toLocaleDateString(),
        created_at: new Date(project.created_at).toLocaleDateString(),
      }))
    : [];

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  useEffect(() => {
    if (isSuccess && meta?.total > 0) {
      setTotalProjects(meta.total);
    } else if (isSuccess) {
      setTotalProjects(1);
    }
  }, [isSuccess, meta]);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Projects Overview
        </h2>
        <Button onClick={() => navigate("/projects/create")}>
          Create <Plus className="size-5" />
        </Button>
      </div>
      <div className="space-y-5 bg-white shadow rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
            Projects
          </h4>
          <div className="flex gap-2">
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
              className="flex-1 min-w-[140px] px-4 py-1.5 border border-gray-200 rounded outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Table
          columns={PROJECT_COLUMNS} // Column configuration for the client table
          data={formattedProjects}
          isLoading={isLoading || isFetching}
          renderActions={(client: TProject) => (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate(`/projects/update/${client.id}`)}
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
          total={totalProjects}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Projects;

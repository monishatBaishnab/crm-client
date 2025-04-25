import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Edit, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { INTERACTION_COLUMNS } from "./resources/interaction.constants";
import { deleteInteraction, TInteraction } from "./resources";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInteractions } from "./hook";

const Interactions = () => {
  const navigate = useNavigate();
  const pageSize = 5;

  // Individual state slices
  const [page, setPage] = useState(1);
  const [totalInteractions, setTotalInteractions] = useState(1);

  const queryFilters = useMemo(() => {
    const filters = [
      { name: "page", value: page.toString() },
      { name: "limit", value: pageSize.toString() },
    ];

    return filters;
  }, [page]);

  const { data, meta, isLoading, isFetching, isSuccess } =
    useInteractions(queryFilters);

  const formattedInteractions = data?.length
    ? data.map((interaction: TInteraction) => ({
        ...interaction,
        projectTitle: interaction.project?.title ?? "-",
        clientName: interaction.client?.name ?? "-",
        occurredAt: new Date(interaction.occurred_at).toLocaleDateString(),
        created_at: new Date(interaction.created_at).toLocaleDateString(),
      }))
    : [];

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteInteraction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactions"] });
    },
  });

  useEffect(() => {
    if (isSuccess && meta?.total > 0) {
      setTotalInteractions(meta.total);
    } else if (isSuccess) {
      setTotalInteractions(1);
    }
  }, [isSuccess, meta]);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Interactions Overview
        </h2>
        <Button onClick={() => navigate("/interactions/create")}>
          Create <Plus className="size-5" />
        </Button>
      </div>
      <div className="space-y-5 bg-white shadow rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
        {/* Filters */}
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
          Interactions
        </h4>

        {/* Table */}
        <Table
          columns={INTERACTION_COLUMNS}
          data={formattedInteractions}
          isLoading={isLoading || isFetching}
          renderActions={(interaction: TInteraction) => (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  navigate(`/interactions/update/${interaction.id}`)
                }
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                title="Edit"
              >
                <Edit className="size-4" />
              </button>
              <button
                disabled={isPending}
                onClick={() => mutate(interaction.id)}
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
          total={totalInteractions}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Interactions;

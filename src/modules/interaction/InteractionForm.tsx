import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader, Save, X } from "lucide-react";
import Button from "../../components/ui/Button";
import FormInput from "../../components/form/FormInput";
import FormSelect from "../../components/form/FormSelect";
import FormTextarea from "../../components/form/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import Form from "../../components/form/Form";
import { create_interaction_schema } from "./resources/interaction.schemas";
import {
  createInteraction,
  updateInteraction,
  fetchInteractionById,
  TInteractionFormData,
  TInteraction,
} from "./resources";
import useAuth from "../../hooks/useAuth";
import { TInteractionPayload } from "./resources";
import InteractionFormSkeleton from "./components/InteractionFormSkeleton";
import { useProjects } from "../project/hook";
import { TClient, useClients } from "../client";
import { FieldValues } from "react-hook-form";
import InteractionFormPreview from "./components/InteractionFormPreview";
import { TProject } from "../project";

const InteractionForm = () => {
  const { id } = useParams();
  const isUpdating = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetching available projects and clients
  const { data: projects } = useProjects([]); // Adjust for your project fetch function
  const { data: clients } = useClients([]); // Adjust for your client fetch function

  const projectOptions = projects?.map((project: TProject) => ({
    label: project.title,
    value: project.id,
  }));

  const clientOptions = clients?.map((client: TClient) => ({
    label: client.name,
    value: client.id,
  }));

  const {
    mutate: mutateInteraction,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: TInteractionPayload) => {
      return isUpdating
        ? updateInteraction(id, payload)
        : createInteraction(payload);
    },
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["interaction", id],
    queryFn: () => fetchInteractionById(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const interaction: TInteraction = data?.data || {};

  const handleSubmit = async (formData: FieldValues) => {
    if (!user) return;

    const payload: TInteractionPayload = {
      user_id: user.id,
      project_id: formData.project_id,
      client_id: formData.client_id,
      type: formData.type,
      occurred_at: new Date(formData.occurred_at),
      notes: formData.notes,
    };

    mutateInteraction(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        isUpdating
          ? "Interaction updated successfully!"
          : "Interaction created successfully!",
      );
      navigate("/interactions");
    }

    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error, navigate, isUpdating]);

  const defaultValues: TInteractionFormData = {
    project_id: interaction?.project_id ?? "",
    client_id: interaction?.client_id ?? "",
    type: interaction?.type ?? "",
    occurred_at: (interaction?.occurred_at?.slice(0, 10) ??
      "") as unknown as Date,
    notes: interaction?.notes ?? "",
  };

  return (
    <div className="p-5 dark:bg-gray-900">
      <Form
        resolver={zodResolver(create_interaction_schema)}
        onSubmit={handleSubmit}
        defaultValues={
          isUpdating ? defaultValues : ({} as TInteractionFormData)
        }
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                {isUpdating ? "Update" : "Create"} Interaction
              </h2>
              <Button
                type="button"
                onClick={() => navigate("/interactions")}
                variant="secondary"
                className="size-10 !p-2"
              >
                <X className="size-5" />
              </Button>
            </div>

            {isLoading || isFetching ? (
              <InteractionFormSkeleton />
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormSelect
                    name="project_id"
                    options={projectOptions ?? []}
                    label="Project"
                    placeholder="Select project"
                  />
                  <FormSelect
                    name="client_id"
                    options={clientOptions ?? []}
                    label="Client"
                    placeholder="Select client"
                  />
                  <FormSelect
                    name="type"
                    options={[
                      { label: "Call", value: "CALL" },
                      { label: "Meeting", value: "MEETING" },
                      { label: "Email", value: "EMAIL" },
                    ]}
                    label="Interaction Type"
                    placeholder="Select type"
                  />
                  <FormInput
                    name="occurred_at"
                    type="date"
                    label="Occurred At"
                    placeholder="Select date and time"
                  />
                  <FormTextarea
                    name="notes"
                    label="Notes"
                    placeholder="Add any notes about the interaction"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/interactions")}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="gap-2">
                    {isPending ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      <Save className="size-5" />
                    )}
                    {isUpdating ? "Update" : "Create"} Interaction
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Optional Preview Section */}
          <div>
            <InteractionFormPreview
              clients={clientOptions}
              projects={projectOptions}
              isLoading={isFetching}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InteractionForm;

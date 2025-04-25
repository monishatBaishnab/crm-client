import { Loader, Save, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import FormInput from "../../components/form/FormInput";
import Form from "../../components/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_project_schema } from "./resources/project.schemas";
import useAuth from "../../hooks/useAuth";
import {
  createProject,
  fetchProjectById,
  STATUS_OPTIONS,
  TProjectFormData,
  TProjectPayload,
  updateProject,
} from "./resources";
import ProjectFormSkeleton from "./components/ProjectFormSkeleton";
import ProjectFormPreview from "./components/ProjectFormPreview";
import FormSelect from "../../components/form/FormSelect";
import FormTextarea from "../../components/form/FormTextarea";
import { TClient, useClients } from "../client";

const ProjectForm = () => {
  const { id } = useParams();
  const isUpdating = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: clients } = useClients([]);
  const clientOptions = clients?.map((client: TClient) => ({
    label: client.name,
    value: client.id,
  }));

  const {
    mutate: mutateProject,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: TProjectPayload) => {
      return isUpdating ? updateProject(id, payload) : createProject(payload);
    },
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => fetchProjectById(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const project = data?.data || {};

  const handleSubmit = async (formData: FieldValues) => {
    if (!user) return;

    const payload: TProjectPayload = {
      client_id: formData.client_id,
      title: formData.title,
      budget: formData.budget,
      deadline: formData.deadline,
      status: formData.status,
      description: formData.description,
    };
    mutateProject(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        isUpdating
          ? "Project updated successfully!"
          : "Project created successfully!",
      );
      navigate("/projects");
    }
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error, navigate, isUpdating]);

  const defaultValues: TProjectFormData = {
    client_id: project?.client_id ?? "",
    title: project?.title ?? "",
    budget: project?.budget ?? "",
    deadline: (project?.deadline?.slice(0, 10) ?? "") as unknown as Date,
    status: project?.status ?? "",
    description: project?.description ?? "",
  };

  return (
    <div className="p-5 dark:bg-gray-900">
      <Form
        resolver={zodResolver(create_project_schema)}
        onSubmit={handleSubmit}
        defaultValues={isUpdating ? defaultValues : ({} as TProjectFormData)}
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                {isUpdating ? "Update" : "Create"} Project
              </h2>
              <Button
                type="button"
                onClick={() => navigate("/projects")}
                variant="secondary"
                className="size-10 !p-2"
              >
                <X className="size-5" />
              </Button>
            </div>

            {isLoading || isFetching ? (
              <ProjectFormSkeleton />
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormSelect
                    name="client_id"
                    options={clientOptions?.length ? clientOptions : []}
                    label="Client ID"
                    placeholder="Enter client ID"
                  />
                  <FormInput
                    name="title"
                    type="text"
                    label="Project Title"
                    placeholder="Enter project title"
                  />
                  <FormInput
                    name="budget"
                    type="number"
                    label="Budget"
                    placeholder="Enter project budget"
                  />
                  <FormInput
                    name="deadline"
                    type="date"
                    label="Deadline"
                    placeholder="Select deadline"
                  />
                  <FormSelect
                    name="status"
                    options={STATUS_OPTIONS}
                    label="Status"
                    placeholder="Enter project status"
                  />
                  <FormTextarea
                    name="description"
                    label="Description"
                    placeholder="Project description"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/projects")}
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
                    {isUpdating ? "Update" : "Create"} Project
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Optional Preview Section */}
          <div>
            <ProjectFormPreview isLoading={isLoading || isFetching} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProjectForm;

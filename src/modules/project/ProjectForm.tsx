import { Loader, Save, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import FormInput from "../../components/form/FormInput";
import Form from "../../components/form/Form";
import FormTextarea from "../../components/form/FormTextarea";
import FormSelect from "../../components/form/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_project_schema } from "../../schemas/project.schema";
import { projectServices } from "../../services/project.services";
import {
  TProject,
  TProjectFormData,
  TProjectPayload,
} from "../../types/project.types";

type ProjectFormProps = {
  project?: TProject;
};

const ProjectForm = ({ project }: ProjectFormProps) => {
  const navigate = useNavigate();

  const {
    mutate: mutateProject,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: TProjectPayload) => {
      return project
        ? projectServices.updateProject(project.id, payload)
        : projectServices.createProject(payload);
    },
  });

  const handleSubmit = async (formData: FieldValues) => {
    const payload: TProjectPayload = {
      client_id:
        formData.client_id ||
        project?.client_id ||
        "eff5505d-755f-460d-a0e8-93b990e48bb3",
      title: formData.title,
      budget: parseFloat(formData.budget),
      deadline: formData.deadline,
      status: formData.status,
      description: formData.description,
    };

    mutateProject(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        project
          ? "Project updated successfully!"
          : "Project created successfully!",
      );
      navigate("/projects");
    }
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error, navigate, project]);

  const defaultValues: TProjectFormData = {
    title: project?.title ?? "",
    budget: project?.budget ?? "",
    deadline: (project?.deadline?.slice(0, 10) ?? "") as unknown as Date,
    status: project?.status ?? "",
    description: project?.description ?? "",
    client_id: project?.client_id || "",
  };

  return (
    <div className="bg-white rounded-lg p-5 space-y-5 m-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {project ? "Update" : "Create"} Project
        </h2>
        <Button variant="secondary" className="size-10 !p-2">
          <X className="size-5" />
        </Button>
      </div>
      <Form
        resolver={zodResolver(create_project_schema)}
        onSubmit={handleSubmit}
        defaultValues={project ? defaultValues : ({} as TProjectFormData)}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <FormInput
                name="title"
                type="text"
                label="Project Title"
                placeholder="Enter project title"
              />
            </div>
            <FormInput name="client_id" label="Client" />
            <FormInput
              name="budget"
              type="number"
              label="Budget"
              placeholder="Enter budget (e.g. 125000.00)"
            />
            <FormInput name="deadline" type="date" label="Deadline" />
            <FormSelect
              name="status"
              options={[
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "On Hold", value: "ON_HOLD" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Canceled", value: "CANCELED" },
              ]}
              label="Status"
              placeholder="e.g. IN_PROGRESS"
            />
          </div>
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Project description"
          />
          <div className="flex justify-end gap-3">
            <Button disabled={isPending}>
              <Save className="size-5" />
              {isPending ? (
                <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : project ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProjectForm;

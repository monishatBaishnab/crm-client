import { Loader, Save, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import FormInput from "../../components/form/FormInput";
import Form from "../../components/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_reminder_schema } from "./resources/reminder.schemas";
import useAuth from "../../hooks/useAuth";
import {
  createReminder,
  fetchReminderById,
  updateReminder,
  TReminderPayload,
  TReminderFormData,
} from "./resources";
import ReminderFormSkeleton from "./components/ReminderFormSkeleton";
import FormSelect from "../../components/form/FormSelect";
import { TClient, useClients } from "../client";
import ReminderFormPreview from "./components/ReminderFormPreview";
import { useProjects } from "../project/hook";
import { TProject } from "../project";
import Select from "../../components/ui/Select";

const ReminderForm = () => {
  const { id } = useParams();
  const isUpdating = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reminderWith, setReminderWith] = useState("client");

  const { data: clients } = useClients([]);
  const clientOptions = clients?.map((client: TClient) => ({
    label: client.name,
    value: client.id,
  }));

  const { data: projects } = useProjects([]);
  const projectsOptions = projects?.map((project: TProject) => ({
    label: project.title,
    value: project.id,
  }));

  const {
    mutate: mutateReminder,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: TReminderPayload) =>
      isUpdating ? updateReminder(id!, payload) : createReminder(payload),
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["reminders", id],
    queryFn: () => fetchReminderById(id!),
    enabled: isUpdating,
    refetchOnWindowFocus: false,
  });

  const reminder = data?.data || {};

  const handleSubmit = async (formData: FieldValues) => {
    if (!user) return;
    console.log("updating");
    const payload: TReminderPayload = {
      user_id: user.id,
      project_id: reminderWith === "project" ? formData.project_id : null,
      client_id: reminderWith === "client" ? formData.client_id : null,
      title: formData.title,
      due_at: formData.due_at,
      is_completed: false,
    };
    mutateReminder(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        isUpdating
          ? "Reminder updated successfully!"
          : "Reminder created successfully!",
      );
      navigate("/reminders");
    }
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error, navigate, isUpdating]);

  useEffect(() => {
    if (data?.data?.client_id) {
      setReminderWith("client");
    } else if (data?.data?.project_id) {
      setReminderWith("project");
    }
  }, [data]);

  const defaultValues: TReminderFormData = {
    client_id: reminder?.client_id ?? "",
    project_id: reminder?.project_id ?? "",
    title: reminder?.title ?? "",
    due_at: reminder?.due_at?.slice(0, 10) ?? "",
  };

  return (
    <div className="p-5 dark:bg-gray-900">
      <Form
        resolver={zodResolver(create_reminder_schema)}
        onSubmit={handleSubmit}
        defaultValues={isUpdating ? defaultValues : ({} as TReminderFormData)}
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                {isUpdating ? "Update" : "Create"} Reminder
              </h2>
              <Button
                type="button"
                onClick={() => navigate("/reminders")}
                variant="secondary"
                className="size-10 !p-2"
              >
                <X className="size-5" />
              </Button>
            </div>

            {isLoading || isFetching ? (
              <ReminderFormSkeleton />
            ) : (
              <div className="space-y-4">
                <Select
                  name="with"
                  options={[
                    { label: "Client", value: "client" },
                    { label: "Project", value: "project" },
                  ]}
                  label="Reminder With"
                  value={reminderWith}
                  onChange={(value) => setReminderWith(value)}
                />
                <FormSelect
                  name="client_id"
                  options={clientOptions || []}
                  hidden={reminderWith === "project"}
                  label="Client"
                  placeholder={`Select Client`}
                />
                <FormSelect
                  name="project_id"
                  options={projectsOptions || []}
                  hidden={reminderWith === "client"}
                  label="Project"
                  placeholder="Select Project"
                />
                <FormInput
                  name="title"
                  type="text"
                  label="Title"
                  placeholder="Enter reminder title"
                />
                <FormInput
                  name="due_at"
                  type="date"
                  label="Due Date"
                  placeholder="Pick a due date"
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/reminders")}
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
                    {isUpdating ? "Update" : "Create"} Reminder
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ReminderFormPreview clients={clientOptions} isLoading={false} />
        </div>
      </Form>
    </div>
  );
};

export default ReminderForm;

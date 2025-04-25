import { Loader, Save, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import FormInput from "../../components/form/FormInput";
import Form from "../../components/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_client_schema } from "./resources/client.schemas";
import useAuth from "../../hooks/useAuth";
import ClientFormPreview from "./components/ClientFormPreview";
import { createClient, TClient, TClientFormData, TClientPayload, updateClient } from "./resources";

type ClientFormProps = {
  client?: TClient;
};

const ClientForm = ({ client }: ClientFormProps) => {
  const { id } = useParams();
  const isUpdating = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    mutate: mutateClient,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload: TClientPayload) => {
      return client
        ? updateClient(client.user_id, payload)
        : createClient(payload);
    },
  });

  const handleSubmit = async (formData: FieldValues) => {
    if (!user) return;

    const payload: TClientPayload = {
      user_id: user.id as string,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
    };

    mutateClient(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        isUpdating
          ? "Client updated successfully!"
          : "Client created successfully!",
      );
      navigate("/clients");
    }
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error, navigate, isUpdating]);

  const defaultValues: TClientFormData = {
    name: client?.name ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    company: client?.company ?? "",
  };

  return (
    <div className="p-5 dark:bg-gray-900">
      {/* Main Container */}
      <Form
        resolver={zodResolver(create_client_schema)}
        onSubmit={handleSubmit}
        defaultValues={client ? defaultValues : ({} as TClientFormData)}
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                {isUpdating ? "Update" : "Create"} Client
              </h2>
              <Button
                type="button"
                onClick={() => navigate("/clients")}
                variant="secondary"
                className="size-10 !p-2"
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  name="name"
                  type="text"
                  label="Client Name"
                  placeholder="Enter client name"
                />
                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter client email"
                />
                <FormInput
                  name="phone"
                  type="text"
                  label="Phone"
                  placeholder="Enter client phone number"
                />
                <FormInput
                  name="company"
                  type="text"
                  label="Company"
                  placeholder="Enter company name"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/clients")}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="gap-2">
                  {isPending ? (
                    <Loader
                      className="size-5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Save className="size-5" />
                  )}
                  {isUpdating ? "Update" : "Create"} Client
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Card Section - Inside the Form to access context */}
          <ClientFormPreview />
        </div>
      </Form>
    </div>
  );
};

export default ClientForm;

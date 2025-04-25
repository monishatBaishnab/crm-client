import { FileText, DollarSign, CalendarDays, CheckCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";
import InteractionFormPreviewSkeleton from "./InteractionFormPreviewSkeleton";

type Option = { label: string; value: string };

const InteractionFormPreview = ({
  isLoading,
  clients,
  projects,
}: {
  isLoading: boolean;
  clients: Option[];
  projects: Option[];
}) => {
  const { watch } = useFormContext();
  const formValues = watch();
  const client = clients?.find(
    (client) => client.value === formValues.client_id,
  );
  const project = projects?.find(
    (project) => project.value === formValues.project_id,
  );
  if (isLoading) {
    return <InteractionFormPreviewSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full lg:w-96">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
          Interaction Preview
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Live update as you type
        </p>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <FileText className="size-8" />
            </div>
          </div>

          <h4 className="text-xl font-medium text-center text-gray-800 dark:text-gray-300 mb-4">
            {project?.label || "Project Name"}
          </h4>

          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <DollarSign className="size-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span className="text-sm">
                {formValues.client_id
                  ? `Client: ${client?.label}`
                  : "Client not set"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <CalendarDays className="size-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span className="text-sm">
                {formValues.occurred_at
                  ? `Occurred At: ${new Date(
                      formValues.occurred_at,
                    ).toLocaleString()}`
                  : "No date set"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle className="size-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span className="text-sm capitalize">
                {formValues.type || "No type selected"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            This is a preview of how the interaction details will appear in the
            system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractionFormPreview;

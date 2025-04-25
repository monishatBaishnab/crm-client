import { User, Mail, Phone, Building } from "lucide-react";
import { useFormContext } from "react-hook-form";

// Form Preview component that has access to form context
const ClientFormPreview = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  return (
    <div className="bg-white rounded-lg shadow-md w-full lg:w-96">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Client Preview</h3>
        <p className="text-sm text-gray-500">Live update as you type</p>
      </div>

      <div className="p-6">
        {/* Client Preview Card */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <User className="size-8" />
            </div>
          </div>

          <h4 className="text-xl font-medium text-center text-gray-800 mb-4">
            {formValues.name || "Client Name"}
          </h4>

          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="size-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm truncate">
                {formValues.email || "client@example.com"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="size-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm">
                {formValues.phone || "+1 (555) 123-4567"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Building className="size-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm">
                {formValues.company || "Company Name"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            This is a preview of how the client information will appear in the
            system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientFormPreview;
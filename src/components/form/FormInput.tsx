/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CircleSlash } from "lucide-react";
import { TFormElementProps } from "../../types/form.types";

export type FormInputProps = TFormElementProps & {
  type?: string;
  hidden?: boolean;
  onChange?: (key: string) => void;
};

const FormInput = ({
  label,
  name,
  required = false,
  type = "text",
  placeholder,
  disabled = false,
  hidden = false,
  autoFocus = false,
  onChange,
}: FormInputProps) => {
  const {
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(name);
  const error = errors[name];

  /* clear stale error when user types */
  useEffect(() => {
    if (value) clearErrors(name);
  }, [value]);

  return (
    <div className={hidden ? "hidden" : ""}>
      {/* label */}
      {label && (
        <label htmlFor={name} className="mb-1 block font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(e.currentTarget.value);
              onChange(e.currentTarget.value);
            }}
            id={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            hidden={hidden}
            autoComplete="off"
            className={[
              "block w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-offset-1 focus:border-purple-500 focus:ring-purple-500",
              disabled &&
                "bg-gray-100 cursor-not-allowed focus:border-gray-200 focus:ring-0",
              error?.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 "
                : "",
            ].join(" ")}
          />
        )}
      />

      {/* validation message */}
      {error?.message && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
          <CircleSlash className="size-4" />
          <span className="block mb-0.5">{error.message as string}</span>
        </p>
      )}
    </div>
  );
};

export default FormInput;

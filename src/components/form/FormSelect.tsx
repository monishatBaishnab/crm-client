import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CircleSlash } from "lucide-react";
import { TFormElementProps } from "../../types/form.types";

export type FormSelectProps = TFormElementProps & {
  options?: { value: string | number; label: string }[];
  hidden?: boolean;
};

const FormSelect = ({
  label,
  name,
  required = false,
  disabled = false,
  hidden = false,
  autoFocus = false,
  options = [],
}: FormSelectProps) => {
  const {
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const [shouldFocus, setShouldFocus] = useState(false);
  const value = watch(name);
  const error = errors[name];

  useEffect(() => {
    if (value) clearErrors(name);
  }, [value, clearErrors, name]);

  useEffect(() => {
    if (autoFocus) setShouldFocus(true);
  }, [autoFocus]);

  return (
    <div className={hidden ? "hidden" : ""}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              id={name}
              autoFocus={shouldFocus}
              disabled={disabled}
              required={required}
              hidden={hidden}
              aria-invalid={!!error}
              className={[
                "block w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-offset-1",
                "focus:border-purple-500 focus:ring-purple-500",
                "dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400",
                disabled && "bg-gray-100 dark:bg-gray-700 cursor-not-allowed focus:ring-0",
                error?.message && "border-red-500 focus:border-red-500 focus:ring-red-500",
              ].join(" ")}
            >
              <option value={""}>Select Option</option>
              {options.map(({ value: v, label: l }) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        )}
      />

      {error?.message && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
          <CircleSlash className="size-4" />
          <span>{error.message as string}</span>
        </p>
      )}
    </div>
  );
};

export default FormSelect;

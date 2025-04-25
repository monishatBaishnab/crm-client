import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CircleSlash } from "lucide-react";
import { TFormElementProps } from "../../types/form.types";

export type FormTextareaProps = TFormElementProps & {
  type?: string;
  hidden?: boolean;
};

const FormTextarea = ({
  label,
  name,
  required = false,
  placeholder,
  disabled = false,
  hidden = false,
  autoFocus = false,
}: FormTextareaProps) => {
  const {
    control,
    trigger,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);
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
        <label htmlFor={name} className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            autoFocus={shouldFocus}
            disabled={disabled}
            required={required}
            hidden={hidden}
            autoComplete="off"
            aria-invalid={!!error}
            onFocus={() => setIsFocused(true)}
            onBlur={async () => {
              field.onBlur();
              setIsFocused(false);
              await trigger(name);
            }}
            onChange={async (e) => {
              field.onChange(e);
              if (!e.target.value) await trigger(name);
            }}
            className={[
              "block w-full rounded-lg border px-4 py-2 outline-none resize-none transition focus:ring-2 focus:ring-offset-1",
              "bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
              disabled && "bg-gray-100 dark:bg-gray-700 cursor-not-allowed",
              error?.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : value && !isFocused
                ? "border-purple-500 focus:border-purple-500"
                : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500",
            ].join(" ")}
          />
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

export default FormTextarea;

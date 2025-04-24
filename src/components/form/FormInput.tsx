/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CircleSlash } from "lucide-react";
import { TFormElementProps } from "../../types/form.types";

export type FormInputProps = TFormElementProps & {
  type?: string;
  hidden?: boolean;
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
}: FormInputProps) => {
  const {
    control,
    trigger,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);
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
            id={name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            hidden={hidden}
            autoComplete="off"
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
              "block w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-offset-1",
              disabled && "bg-gray-100 cursor-not-allowed",
              error?.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 "
                : value && !isFocused
                ? "border-purple-500 focus:border-purple-500"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-500",
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

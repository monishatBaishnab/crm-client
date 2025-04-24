/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CircleSlash, ChevronDown } from "lucide-react";
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
    trigger,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);
  const value = watch(name);
  const error = errors[name];

  /* clear stale error when user selects */
  useEffect(() => {
    if (value) clearErrors(name);
  }, [value]);

  return (
    <div className={hidden ? "hidden" : ""}>
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
          <div className="relative">
            {/* native select */}
            <select
              {...field}
              id={name}
              autoFocus={autoFocus}
              disabled={disabled}
              required={required}
              hidden={hidden}
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
                "peer block w-full appearance-none rounded-lg bg-white px-4 py-2 pr-10",
                "text-gray-800 placeholder-gray-400",
                "border outline-none transition focus:ring-2 focus:ring-offset-1",
                disabled && "bg-gray-100 cursor-not-allowed",
                error?.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : value && !isFocused
                  ? "border-purple-500 focus:border-purple-500"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-500",
              ].join(" ")}
            >
              {options.map(({ value: v, label: l }) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>

            {/* custom arrow */}
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 peer-disabled:text-gray-300"
              aria-hidden
            />
          </div>
        )}
      />

      {error?.message && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
          <CircleSlash className="size-4" />
          <span className="block mb-0.5">{error.message as string}</span>
        </p>
      )}
    </div>
  );
};

export default FormSelect;

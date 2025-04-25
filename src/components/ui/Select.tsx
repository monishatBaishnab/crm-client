type SelectProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
};

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  hidden = false,
}: SelectProps) => {
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className="block w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-offset-1 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 disabled:bg-gray-100 dark:disabled:bg-gray-700"
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

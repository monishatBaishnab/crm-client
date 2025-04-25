import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "relative inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  let variantClass = "";

  if (variant === "primary") {
    variantClass =
      "bg-purple-500 hover:bg-purple-600 active:bg-purple-500 text-white dark:bg-purple-700 dark:hover:bg-purple-800 dark:active:bg-purple-700 dark:text-white";
  } else if (variant === "secondary") {
    variantClass =
      "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-white";
  } else if (variant === "danger") {
    variantClass =
      "bg-red-500 hover:bg-red-600 active:bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-600 dark:text-white";
  } else if (variant === "ghost") {
    variantClass =
      "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 dark:bg-transparent dark:hover:bg-gray-600 dark:active:bg-gray-700 dark:text-gray-300";
  }

  return (
    <button
      className={`${base} ${variantClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

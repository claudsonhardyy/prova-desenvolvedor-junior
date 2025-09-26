import React from "react";

const base =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:focus:ring-primary",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

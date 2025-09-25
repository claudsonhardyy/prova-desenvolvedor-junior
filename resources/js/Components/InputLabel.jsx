export default function InputLabel({ forInput, value, className = '', children, ...props }) {
  return (
    <label
      htmlFor={forInput}
      className={`block font-medium text-sm text-text-light dark:text-text-dark ${className}`}
      {...props}
    >
      {value ? value : children}
    </label>
  );
}

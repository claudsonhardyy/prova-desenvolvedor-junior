export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const base = "px-4 py-2 rounded-md font-semibold transition shadow focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button {...props} className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}

import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5
                ${active
                    ? 'border-primary text-primary dark:text-primary-light'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}
                transition duration-150 ease-in-out
                ` + className
            }
        >
            {children}
        </Link>
    );
}

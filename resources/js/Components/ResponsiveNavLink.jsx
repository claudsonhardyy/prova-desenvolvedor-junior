import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
  return (
    <Link
      {...props}
      className={
        `block w-full pl-3 pr-4 py-2 border-l-4 text-base font-medium
        ${active
          ? 'border-primary text-primary dark:text-primary bg-gray-50 dark:bg-gray-800'
          : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'}
        transition duration-150 ease-in-out ` + className
      }
    >
      {children}
    </Link>
  );
}

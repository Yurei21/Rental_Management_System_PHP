import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? "border-primary-500 bg-primary-50 text-primary-700 focus:border-primary-600 focus:bg-primary-100 focus:text-primary-800 dark:border-primary-400 dark:bg-primary-900/30 dark:text-primary-200 dark:focus:border-primary-300 dark:focus:bg-primary-900/50 dark:focus:text-primary-100"
                    : "border-transparent text-surface-600 hover:border-surface-300 hover:bg-surface-50 hover:text-surface-800 focus:border-surface-300 focus:bg-surface-50 focus:text-surface-800 dark:text-surface-400 dark:hover:border-surface-600 dark:hover:bg-surface-700 dark:hover:text-surface-200 dark:focus:border-surface-600 dark:focus:bg-surface-700 dark:focus:text-surface-200"
            } text-base font-medium transition duration-200 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

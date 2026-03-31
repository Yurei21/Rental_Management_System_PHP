import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-200 ease-in-out focus:outline-none " +
                (active
                    ? "border-primary-500 text-surface-900 focus:border-primary-600 dark:border-primary-400 dark:text-surface-50"
                    : "border-transparent text-surface-600 hover:border-surface-300 hover:text-surface-800 focus:border-surface-300 focus:text-surface-800 dark:text-surface-400 dark:hover:border-surface-600 dark:hover:text-surface-200 dark:focus:border-surface-600 dark:focus:text-surface-200") +
                className
            }
        >
            {children}
        </Link>
    );
}

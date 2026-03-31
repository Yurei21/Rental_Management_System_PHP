export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-semibold text-surface-700 shadow-sm transition duration-200 ease-in-out hover:bg-surface-50 hover:border-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 dark:focus:ring-offset-surface-900 ${
                    disabled && "opacity-50 cursor-not-allowed"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

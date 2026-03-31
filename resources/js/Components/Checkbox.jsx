export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-surface-300 bg-white text-primary-600 shadow-sm transition duration-200 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-600 dark:bg-surface-800 dark:focus:ring-primary-400/20 " +
                className
            }
        />
    );
}

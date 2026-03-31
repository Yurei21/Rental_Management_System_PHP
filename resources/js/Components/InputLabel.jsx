export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-semibold text-surface-700 dark:text-surface-200 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

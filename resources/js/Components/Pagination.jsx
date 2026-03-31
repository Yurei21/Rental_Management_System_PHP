import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    const isNavButton = (label) => {
        return label.includes("&laquo;") || label.includes("&raquo;");
    };

    return (
        <nav className="mt-6 flex w-full justify-center">
            <div className="inline-flex px-10 items-center space-x-1 rounded-lg border border-surface-200 bg-white p-2 dark:border-surface-700 dark:bg-surface-800">
                {links.map((link) => (
                    <Link
                        preserveScroll
                        href={link.url || ""}
                        key={link.label}
                        className={
                            "inline-flex items-center justify-center h-8 rounded-md transition duration-200 text-sm font-medium " +
                            (isNavButton(link.label) ? "px-3" : "w-8") +
                            " " +
                            (link.active
                                ? "bg-primary-600 text-white"
                                : !link.url
                                  ? "text-surface-400 dark:text-surface-500 cursor-not-allowed"
                                  : "text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700")
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </nav>
    );
}

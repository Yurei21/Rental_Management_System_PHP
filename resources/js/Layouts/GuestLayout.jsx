import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 flex flex-col items-center justify-start pt-6 sm:justify-center sm:pt-0">
            {/* Logo Container */}
            <div className="w-full px-4 sm:px-0">
                <Link href="/" className="flex justify-center">
                    <ApplicationLogo className="h-24 w-24 fill-current text-primary-600 dark:text-primary-400" />
                </Link>
            </div>

            {/* Content Container */}
            <div className="mt-8 w-full px-4 sm:mt-10 sm:px-0 overflow-hidden bg-white rounded-2xl shadow-lg dark:bg-surface-800 sm:max-w-md">
                <div className="px-6 py-8 sm:px-8">{children}</div>
            </div>
        </div>
    );
}

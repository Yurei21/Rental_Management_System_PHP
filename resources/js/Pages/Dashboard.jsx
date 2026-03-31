import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-surface-900 dark:text-surface-50">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl sm:rounded-xl dark:bg-surface-800">
                        <div className="p-6 text-surface-900 dark:text-surface-100">
                            Welcome back! You're logged in successfully.
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

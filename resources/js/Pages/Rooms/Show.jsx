import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show(room) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {room.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Manage and organize all your rental rooms
                    </p>
                </div>
            }
        ></AuthenticatedLayout>
    );
}

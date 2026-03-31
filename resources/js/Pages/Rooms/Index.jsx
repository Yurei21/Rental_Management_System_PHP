import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TextInput from "@/Components/TextInput";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Pagination from "@/Components/Pagination";

export default function Index({ rooms, queryParams = null, success }) {
    queryParams = queryParams || {};

    const [showSuccess, setShowSuccess] = useState(!!success);
    const [searchTerm, setSearchTerm] = useState(queryParams.search || "");

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("room.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const deleteRoom = (room) => {
        if (
            !window.confirm(
                `Are you sure you want to delete room "${room.room_name}"?`,
            )
        ) {
            return;
        }

        router.visit(route("room.destroy", room.id), {
            method: "delete",
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Rooms
                    </h2>
                    <Link
                        href={route("room.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Rooms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {showSuccess && success && (
                        <div className="bg-emerald-500 px-4 py-2 text-white rounded mb-4 shadow-md">
                            {success}
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-6">
                        <TextInput
                            className="w-full"
                            placeholder="Search rooms by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                onKeyPress("search", e);
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>

                    {/* Building Grid Layout */}
                    {rooms.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {rooms.data.map((room) => (
                                    <div
                                        key={room.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
                                    >
                                        {/* Room Header */}
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                                            <h3 className="text-2xl font-bold">
                                                {room.room_name}
                                            </h3>
                                            {room.group && (
                                                <p className="text-emerald-100 text-sm mt-1">
                                                    {room.group.group_name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Room Details */}
                                        <div className="p-6 text-gray-900 dark:text-gray-100">
                                            <div className="space-y-3 mb-6">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        Room ID:
                                                    </span>
                                                    <span className="font-semibold">
                                                        #{room.id}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        Created:
                                                    </span>
                                                    <span className="text-xs">
                                                        {new Date(
                                                            room.created_at,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {room.updated_at !==
                                                    room.created_at && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Updated:
                                                        </span>
                                                        <span className="text-xs">
                                                            {new Date(
                                                                room.updated_at,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <Link
                                                    href={route(
                                                        "room.edit",
                                                        room.id,
                                                    )}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition-colors text-sm font-medium"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deleteRoom(room)
                                                    }
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition-colors text-sm font-medium"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination links={rooms.meta.links} />
                        </>
                    ) : (
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12">
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                No rooms found.
                            </p>
                            <Link
                                href={route("room.create")}
                                className="mt-4 inline-block bg-emerald-500 py-2 px-6 text-white rounded shadow transition-all hover:bg-emerald-600"
                            >
                                Create your first room
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

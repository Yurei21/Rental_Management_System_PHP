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
    console.log(rooms)
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
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Rooms
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage and organize all your rental rooms
                        </p>
                    </div>
                    <Link
                        href={route("room.create")}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-2.5 px-5 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Rooms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {showSuccess && success && (
                        <div className="mb-6 animate-in fade-in duration-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-6 py-3 rounded-lg flex items-center gap-3 shadow-sm">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                                {success}
                            </p>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <TextInput
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all"
                                placeholder="Search rooms by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    onKeyPress("search", e);
                                    setSearchTerm(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {/* Building Grid Layout */}
                    {rooms.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {rooms.data.map((room) => (
                                    <div
                                        key={room.id}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                                    >
                                        {/* Room Header */}
                                        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 p-6 text-white">
                                            <Link
                                                href={route(
                                                    "room.show",
                                                    room.id,
                                                )}
                                                className="block text-xl font-bold tracking-tight overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
                                            >
                                                {room.room_name}
                                            </Link>
                                            {room.group && (
                                                <p className="text-emerald-100 text-xs font-medium mt-2 opacity-90">
                                                    {room.group.group_name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Room Details */}
                                        <div className="p-6 text-gray-900 dark:text-gray-100">
                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Room ID
                                                    </span>
                                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                        #{room.id}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Created By
                                                    </span>
                                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {room.created_by.name}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Modified By
                                                    </span>
                                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {room.modified_by.name}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Created
                                                    </span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                        {new Date(
                                                            room.created_at,
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                {room.updated_at !==
                                                    room.created_at && (
                                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                            Updated
                                                        </span>
                                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                            {new Date(
                                                                room.updated_at,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <Link
                                                    href={route(
                                                        "room.edit",
                                                        room.id,
                                                    )}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-2.5 px-3 rounded-lg transition-all duration-200 text-sm font-semibold border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        deleteRoom(room)
                                                    }
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 py-2.5 px-3 rounded-lg transition-all duration-200 text-sm font-semibold border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
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
                        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm p-16 border border-gray-100 dark:border-gray-700">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                                <svg
                                    className="w-8 h-8 text-gray-400 dark:text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-6">
                                No rooms found
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
                                Start by creating your first room to get
                                organized
                            </p>
                            <Link
                                href={route("room.create")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 px-6 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create your first room
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

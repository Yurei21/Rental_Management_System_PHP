import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Show({ room, tenants, queryParams = null }) {
    queryParams = queryParams || {};

    const [tenantNameFilter, setTenantNameFilter] = useState(
        queryParams.tenant_name || "",
    );
    const [activeFilter, setActiveFilter] = useState(
        queryParams.is_active || "",
    );
    const [sortField, setSortField] = useState(
        queryParams.sort_field || "created_at",
    );
    const [sortDirection, setSortDirection] = useState(
        queryParams.sort_direction || "desc",
    );

    const handleFilterChange = (name, value) => {
        const newQueryParams = { ...queryParams };

        if (name === "tenant_name") {
            setTenantNameFilter(value);
            if (value) {
                newQueryParams.tenant_name = value;
            } else {
                delete newQueryParams.tenant_name;
            }
        } else if (name === "is_active") {
            setActiveFilter(value);
            if (value) {
                newQueryParams.is_active = value;
            } else {
                delete newQueryParams.is_active;
            }
        }

        router.get(route("room.show", room.id), newQueryParams);
    };

    const handleSort = (field) => {
        let direction = "asc";
        if (sortField === field && sortDirection === "asc") {
            direction = "desc";
        }

        setSortField(field);
        setSortDirection(direction);

        const newQueryParams = {
            ...queryParams,
            sort_field: field,
            sort_direction: direction,
        };

        router.get(route("room.show", room.id), newQueryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        handleFilterChange(name, e.target.value);
    };

    const renderSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? "↑" : "↓";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {room.room_name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage tenants and details for {room.room_name}
                        </p>
                    </div>
                    <Link
                        href={route("room.index")}
                        className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2.5 px-5 text-gray-800 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold whitespace-nowrap"
                    >
                        ← Back to Rooms
                    </Link>
                </div>
            }
        >
            <Head title={`${room.room_name} - Tenants`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Room Details Card */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 p-8 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Room Name
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {room.room_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Created By
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {room.created_by.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-2 opacity-90">
                                        Created Date
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {new Date(
                                            room.created_at,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Room ID
                                    </span>
                                    <span className="font-semibold">
                                        #{room.id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Group
                                    </span>
                                    <span className="font-semibold">
                                        {room.group
                                            ? room.group.group_name
                                            : "Solo Room"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Last Modified
                                    </span>
                                    <span className="font-semibold">
                                        {new Date(
                                            room.updated_at,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tenants Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Tenants
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        {tenants.total} total{" "}
                                        {tenants.total === 1
                                            ? "tenant"
                                            : "tenants"}
                                    </p>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search by Tenant Name */}
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
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all"
                                        placeholder="Search tenant name..."
                                        value={tenantNameFilter}
                                        onChange={(e) =>
                                            setTenantNameFilter(e.target.value)
                                        }
                                        onKeyPress={(e) => {
                                            onKeyPress("tenant_name", e);
                                        }}
                                    />
                                </div>

                                {/* Filter by Active Status */}
                                <select
                                    value={activeFilter}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "is_active",
                                            e.target.value,
                                        )
                                    }
                                    className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 transition-all"
                                >
                                    <option value="">All Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>

                                {/* Clear Filters Button */}
                                {(tenantNameFilter || activeFilter) && (
                                    <button
                                        onClick={() => {
                                            setTenantNameFilter("");
                                            setActiveFilter("");
                                            router.get(
                                                route("room.show", room.id),
                                            );
                                        }}
                                        className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tenants Table */}
                        {tenants.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                                <th className="px-6 py-4 text-left">
                                                    <button
                                                        onClick={() =>
                                                            handleSort(
                                                                "tenant_name",
                                                            )
                                                        }
                                                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                                    >
                                                        Tenant Name
                                                        <ChevronUpDownIcon className="w-4 h-4" />
                                                    </button>
                                                </th>
                                                <th className="px-6 py-4 text-left">
                                                    <button
                                                        onClick={() =>
                                                            handleSort(
                                                                "is_active",
                                                            )
                                                        }
                                                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                                    >
                                                        Status
                                                        <ChevronUpDownIcon className="w-4 h-4" />
                                                    </button>
                                                </th>
                                                <th className="px-6 py-4 text-left">
                                                    <button
                                                        onClick={() =>
                                                            handleSort(
                                                                "created_at",
                                                            )
                                                        }
                                                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                                    >
                                                        Created Date
                                                        <ChevronUpDownIcon className="w-4 h-4" />
                                                    </button>
                                                </th>
                                                <th className="px-6 py-4 text-left">
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        Created By
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tenants.data.map((tenant) => (
                                                <tr
                                                    key={tenant.id}
                                                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {tenant.tenant_name}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                                tenant.is_active
                                                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                        >
                                                            {tenant.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {new Date(
                                                                tenant.created_at,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {tenant.created_by
                                                                .name || "N/A"}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="p-8 border-t border-gray-100 dark:border-gray-700">
                                    <Pagination links={tenants.meta.links} />
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-16">
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
                                            d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 00-6-6 6 6 0 00-6 6z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                                    No tenants found
                                </p>
                                {(tenantNameFilter || activeFilter) && (
                                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                                        Try adjusting your filters
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

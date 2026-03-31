import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { label: "Dashboard", route: "dashboard" },
    { label: "Rooms", route: "room.index" },
    { label: "Tenants", route: "tenant.index" },
    { label: "Invoices", route: "invoice.index" },
    { label: "Payments", route: "payment.index" },
    { label: "Group", route: "group.index" },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [navigating, setNavigating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    const initials = user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    // Mount animation
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(t);
    }, []);

    // Page load progress bar
    useEffect(() => {
        const startProgress = () => {
            setNavigating(true);
            setProgress(15);
        };
        const finishProgress = () => {
            setProgress(100);
            setTimeout(() => {
                setNavigating(false);
                setProgress(0);
            }, 400);
        };

        const removeStart = router.on("start", startProgress);
        const removeFinish = router.on("finish", finishProgress);

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    // Simulate progress ticking while navigating
    useEffect(() => {
        if (!navigating) return;
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 85) return p;
                return p + Math.random() * 8;
            });
        }, 300);
        return () => clearInterval(interval);
    }, [navigating]);

    return (
        <div
            className={[
                "min-h-screen bg-gradient-to-br from-surface-50 via-primary-50 to-accent-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900",
                "transition-opacity duration-500",
                mounted ? "opacity-100" : "opacity-0",
            ].join(" ")}
        >
            {/* ── NAV ─────────────────────────────────────────────────────── */}
            <nav
                className={[
                    "sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-primary-100 dark:border-surface-700",
                    "transition-transform duration-500 ease-out",
                    mounted ? "translate-y-0" : "-translate-y-full",
                ].join(" ")}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4">
                        {/* Logo + desktop links */}
                        <div className="flex items-center gap-6 min-w-0">
                            <Link
                                href="/"
                                className="shrink-0 group flex items-center gap-2.5"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-500/30 transition-all duration-200 group-hover:scale-95 group-hover:shadow-primary-500/50 group-hover:shadow-lg">
                                    <ApplicationLogo className="h-4 w-4 text-white" />
                                </div>
                                <span className="hidden sm:inline text-base font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent tracking-tight transition-opacity duration-200 group-hover:opacity-80">
                                    RentFlow
                                </span>
                            </Link>

                            {/* Desktop nav links */}
                            <div className="hidden md:flex items-center gap-4">
                                {NAV_ITEMS.map(({ label, route: r }, i) => (
                                    <NavLink
                                        key={r}
                                        href={route(r)}
                                        active={route().current(r)}
                                        style={{
                                            transitionDelay: mounted
                                                ? `${i * 40}ms`
                                                : "0ms",
                                        }}
                                        className={[
                                            "px-3 py-1.5 rounded-lg text-[13px] font-medium",
                                            "transition-all duration-200 ease-out",
                                            "hover:-translate-y-px active:translate-y-0 active:scale-95",
                                            mounted
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-1",
                                            route().current(r)
                                                ? "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/40 shadow-sm shadow-blue-100 dark:shadow-blue-900/30"
                                                : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/70 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30",
                                        ].join(" ")}
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Right: user dropdown (desktop) */}
                        <div
                            className={[
                                "hidden md:flex items-center",
                                "transition-all duration-500 delay-300 ease-out",
                                mounted
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-4",
                            ].join(" ")}
                        >
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-800/50 transition-all duration-200 text-sm text-surface-700 dark:text-surface-200 font-medium shadow-sm hover:shadow-md hover:shadow-primary-100 dark:hover:shadow-primary-900/30 active:scale-95"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary-600 to-primary-700 text-white text-[11px] font-bold shadow-sm shadow-primary-500/40">
                                            {initials}
                                        </span>
                                        <span className="hidden sm:inline max-w-[140px] truncate">
                                            {user.name}
                                        </span>
                                        <svg
                                            className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content
                                    align="right"
                                    width="48"
                                    contentClasses="py-2 bg-white dark:bg-surface-800 rounded-xl shadow-lg shadow-primary-200/20 dark:shadow-surface-900/50 border border-primary-100 dark:border-surface-700 overflow-hidden"
                                >
                                    <div className="px-3 py-2.5 border-b border-primary-100 dark:border-surface-700 mb-1">
                                        <p className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                                            Account
                                        </p>
                                        <p className="text-sm font-medium text-surface-700 dark:text-surface-200 truncate mt-0.5">
                                            {user.email}
                                        </p>
                                    </div>
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 rounded-lg mx-1 transition-all duration-150 hover:translate-x-0.5"
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg mx-1 mb-1 transition-all duration-150 hover:translate-x-0.5"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown((p) => !p)
                            }
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 active:scale-90"
                            aria-label="Toggle navigation"
                        >
                            {/* Animated hamburger → X */}
                            <div className="relative w-5 h-5">
                                <span
                                    className={[
                                        "absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out",
                                        showingNavigationDropdown
                                            ? "top-[9px] rotate-45"
                                            : "top-[3px] rotate-0",
                                    ].join(" ")}
                                />
                                <span
                                    className={[
                                        "absolute left-0 top-[9px] w-full h-0.5 bg-current rounded-full transition-all duration-200 ease-in-out",
                                        showingNavigationDropdown
                                            ? "opacity-0 scale-x-0"
                                            : "opacity-100 scale-x-100",
                                    ].join(" ")}
                                />
                                <span
                                    className={[
                                        "absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out",
                                        showingNavigationDropdown
                                            ? "top-[9px] -rotate-45"
                                            : "top-[15px] rotate-0",
                                    ].join(" ")}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── Mobile menu ──────────────────────────────────────────── */}
                <div
                    className={[
                        "md:hidden border-t border-primary-100 dark:border-surface-700 bg-white/95 dark:bg-surface-800/95 backdrop-blur-md",
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        showingNavigationDropdown
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0",
                    ].join(" ")}
                >
                    {/* Mobile user card */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-primary-100 dark:border-surface-700">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white text-sm font-bold shadow-md shadow-primary-500/30">
                            {initials}
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Mobile nav items — stagger via inline delay */}
                    <div className="px-3 py-3 space-y-0.5">
                        {NAV_ITEMS.map(({ label, route: r }, i) => (
                            <ResponsiveNavLink
                                key={r}
                                href={route(r)}
                                active={route().current(r)}
                                style={{
                                    transitionDelay: showingNavigationDropdown
                                        ? `${i * 35}ms`
                                        : "0ms",
                                }}
                                className={[
                                    "block px-3 py-2.5 rounded-lg text-sm font-medium",
                                    "transition-all duration-200 ease-out",
                                    "hover:translate-x-1 active:scale-95",
                                    showingNavigationDropdown
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-2",
                                ].join(" ")}
                            >
                                {label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    {/* Mobile account actions */}
                    <div className="px-3 pb-4 pt-1 border-t border-primary-100 dark:border-surface-700 mt-1 space-y-0.5">
                        <ResponsiveNavLink
                            href={route("profile.edit")}
                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-primary-50/70 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-all duration-200 hover:translate-x-1"
                        >
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 hover:translate-x-1"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* ── Page header ─────────────────────────────────────────────── */}
            {header && (
                <header
                    className={[
                        "bg-white/60 dark:bg-surface-800/40 backdrop-blur-sm border-b border-primary-100 dark:border-surface-700",
                        "transition-all duration-500 delay-200 ease-out",
                        mounted
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-1",
                    ].join(" ")}
                >
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* ── Main content ─────────────────────────────────────────────── */}
            <main
                className={[
                    "transition-all duration-500 delay-300 ease-out",
                    mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2",
                ].join(" ")}
            >
                {children}
            </main>
        </div>
    );
}

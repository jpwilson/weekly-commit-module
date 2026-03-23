"use client";

import React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SideNavProps {
  currentPath: string;
  statusNotification?: {
    label: string;
    message: string;
  };
}

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const CarryForwardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const navItems: NavItem[] = [
  { label: "Lock Commits", path: "/lock-commits", icon: <LockIcon /> },
  {
    label: "Carry Forward",
    path: "/carry-forward",
    icon: <CarryForwardIcon />,
  },
  { label: "Export", path: "/export", icon: <ExportIcon /> },
];

export default function SideNav({
  currentPath,
  statusNotification,
}: SideNavProps) {
  return (
    <aside className="hidden md:flex fixed top-16 right-0 bottom-0 w-64 bg-surface-container-low border-l border-outline-variant flex-col z-40">
      {/* Header */}
      <div className="px-5 py-6 border-b border-outline-variant">
        <h2 className="font-headline text-lg font-bold text-on-surface tracking-tight">
          Weekly Commit Module
        </h2>
        <p className="font-label text-xs text-on-surface-variant mt-1 uppercase tracking-wider">
          Operator Role
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-3 font-label text-sm tracking-wide transition-colors ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Status Notification */}
      {statusNotification && (
        <div className="mx-3 mb-4 px-4 py-3 border border-terminal bg-surface-container-highest">
          <p className="font-label text-xs text-terminal uppercase tracking-widest">
            {statusNotification.label}
          </p>
          <p className="font-body text-xs text-on-surface-variant mt-1">
            {statusNotification.message}
          </p>
        </div>
      )}
    </aside>
  );
}

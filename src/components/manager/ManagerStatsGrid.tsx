"use client";

import React from "react";

interface StatCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  extra?: React.ReactNode;
  errorBorder?: boolean;
}

export default function ManagerStatsGrid() {
  const stats: StatCard[] = [
    {
      label: "Total Team Commits",
      value: "142",
      icon: (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      label: "RCDO Synergy",
      value: "94%",
      icon: (
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      extra: (
        <div className="w-full bg-surface-container-highest h-2 mt-3">
          <div
            className="h-full bg-tertiary transition-all"
            style={{ width: "94%" }}
          />
        </div>
      ),
    },
    {
      label: "Members Locked",
      value: "08/10",
      icon: (
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
      ),
    },
    {
      label: "Drafts Overdue",
      value: "02",
      icon: (
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
      errorBorder: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-surface-container border border-outline-variant p-5 ${
            stat.errorBorder ? "border-l-4 border-l-error" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-on-surface-variant">{stat.icon}</span>
          </div>
          <p className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
            {stat.value}
          </p>
          {stat.extra}
        </div>
      ))}
    </div>
  );
}

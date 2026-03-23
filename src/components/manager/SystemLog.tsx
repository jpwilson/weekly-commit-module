"use client";

import React from "react";

const LOG_ENTRIES = [
  {
    time: "09:42:11",
    type: "FETCH",
    message: "Aggregating team commitment data...",
  },
  {
    time: "09:42:12",
    type: "SYNC",
    message: "4/4 team members synchronized.",
  },
  {
    time: "09:42:13",
    type: "CALC",
    message: "RCDO alignment matrix computed. Synergy: 94%.",
  },
  {
    time: "09:42:14",
    type: "WARN",
    message: "2 drafts overdue — escalation window T-48h.",
  },
  {
    time: "09:42:15",
    type: "FETCH",
    message: "Productivity curve data loaded for W42.",
  },
  {
    time: "09:42:16",
    type: "OK",
    message: "Manager roll-up dashboard ready.",
  },
];

export default function SystemLog() {
  return (
    <div className="bg-surface-container border border-outline-variant p-5 relative overflow-hidden">
      {/* Background terminal icon */}
      <div className="absolute top-4 right-4 opacity-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h3 className="font-headline text-sm font-bold text-on-surface tracking-tight mb-4 uppercase">
        System Log
      </h3>

      <div className="space-y-1.5 relative z-10">
        {LOG_ENTRIES.map((entry, i) => (
          <div key={i} className="flex items-start gap-3 font-mono text-xs">
            <span className="text-on-surface-variant shrink-0">
              [{entry.time}]
            </span>
            <span
              className={`shrink-0 uppercase font-bold ${
                entry.type === "WARN"
                  ? "text-error"
                  : entry.type === "OK"
                    ? "text-terminal"
                    : "text-tertiary/80"
              }`}
            >
              {entry.type}
            </span>
            <span className="text-tertiary/80">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

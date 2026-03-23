"use client";

import React from "react";

export default function ManagerHeader() {
  return (
    <div className="mb-10">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container/20 text-primary border border-primary/30 mb-6">
        <span className="h-2 w-2 bg-primary" />
        <span className="font-label text-xs uppercase tracking-widest">
          Manager Overview
        </span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-none">
            Team Roll-up
            <span className="inline-block w-3 h-3 bg-primary-container ml-3 -translate-y-1" />
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-3 max-w-xl">
            Real-time synchronization of team commitments, alignment metrics,
            and operational throughput across all direct reports.
          </p>
        </div>

        {/* Reporting Period Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-outline-variant bg-surface-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-on-surface-variant"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-label text-sm text-on-surface tracking-wider">
              Week 42
            </span>
            <span className="text-on-surface-variant font-label text-sm">
              / Oct 2023
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

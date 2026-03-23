"use client";

import React from "react";
import { useWeeklyStore } from "@/store/weekly-store";
import { WeekStateMachine } from "@/lib/state-machine";

export default function WeekHeader() {
  const { currentWeek, lastSyncTime } = useWeeklyStore();

  const statusLabel = WeekStateMachine.getStatusLabel(currentWeek.status);
  const statusColor = WeekStateMachine.getStatusColor(currentWeek.status);

  const statusColorMap: Record<string, string> = {
    "primary-container": "bg-primary-container text-on-primary-container",
    primary: "bg-primary text-on-primary",
    tertiary: "bg-tertiary text-on-tertiary",
    terminal: "bg-terminal text-background",
  };

  const pulseColorMap: Record<string, string> = {
    "primary-container": "bg-primary-container",
    primary: "bg-primary",
    tertiary: "bg-tertiary",
    terminal: "bg-terminal",
  };

  const formattedSync = new Date(lastSyncTime).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <header className="mb-10">
      <p className="font-label text-tertiary text-xs tracking-widest uppercase mb-2">
        System Protocol / Planning
      </p>

      <div className="flex items-end gap-6 flex-wrap">
        <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter uppercase text-on-surface leading-none">
          Week {currentWeek.week_number}
        </h1>

        <div className="flex items-center gap-3 pb-2">
          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-label font-bold uppercase tracking-wider ${statusColorMap[statusColor] || "bg-surface-container-high text-on-surface"}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColorMap[statusColor] || "bg-on-surface"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${pulseColorMap[statusColor] || "bg-on-surface"}`}
              />
            </span>
            {statusLabel}
          </span>
        </div>
      </div>

      <p className="font-mono text-[10px] text-on-surface-variant mt-3 tracking-wide">
        LAST SYNC: {formattedSync}
      </p>
    </header>
  );
}

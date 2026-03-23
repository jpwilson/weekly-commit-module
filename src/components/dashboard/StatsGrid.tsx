"use client";

import React from "react";
import { useWeeklyStore } from "@/store/weekly-store";

const TOTAL_SLOTS = 12;

export default function StatsGrid() {
  const { commits } = useWeeklyStore();

  const commitCount = commits.length;
  const density = `${String(commitCount).padStart(2, "0")}/${TOTAL_SLOTS}`;
  const densityPercent = Math.round((commitCount / TOTAL_SLOTS) * 100);

  // Compute dominant chess priority level
  const priorityCounts = [0, 0, 0, 0, 0]; // index 0 unused
  commits.forEach((c) => {
    priorityCounts[c.priority]++;
  });
  const maxPriority = priorityCounts.indexOf(Math.max(...priorityCounts.slice(1)));
  const chessLevel = maxPriority > 0 ? maxPriority : 2;

  // Network velocity — % of commits linked to RCDO
  const linkedCount = commits.filter((c) => c.outcome_id !== null).length;
  const networkVelocity =
    commitCount > 0
      ? ((linkedCount / commitCount) * 100).toFixed(1)
      : "0.0";

  const stats = [
    {
      label: "Commit Density",
      value: density,
      sub: (
        <div className="mt-3 w-full h-1.5 bg-surface-container-highest">
          <div
            className="h-full bg-primary-container transition-all duration-500"
            style={{ width: `${densityPercent}%` }}
          />
        </div>
      ),
    },
    {
      label: "Chess Layer Alpha",
      value: `LVL ${chessLevel}`,
      sub: (
        <p className="text-xs text-on-surface-variant font-label mt-2">
          x{chessLevel}.0 MULTIPLIER
        </p>
      ),
    },
    {
      label: "Network Velocity",
      value: `${networkVelocity}%`,
      sub: null,
    },
    {
      label: "RCDO Reference",
      value: "CORE",
      sub: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-low border border-outline-variant p-6"
        >
          <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
            {stat.label}
          </p>
          <p className="text-2xl md:text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            {stat.value}
          </p>
          {stat.sub}
        </div>
      ))}
    </div>
  );
}

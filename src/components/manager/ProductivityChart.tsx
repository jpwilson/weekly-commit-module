"use client";

import React from "react";
import { PRODUCTIVITY_DATA } from "@/lib/mock-data";

const BAR_COLORS = [
  "bg-primary",
  "bg-tertiary",
  "bg-primary-container",
  "bg-surface-container-highest",
  "bg-tertiary-fixed-dim",
  "bg-primary-fixed-dim",
  "bg-surface-container-highest",
];

export default function ProductivityChart() {
  const maxValue = Math.max(...PRODUCTIVITY_DATA.map((d) => d.value));

  return (
    <div className="bg-surface-container border border-outline-variant p-5">
      <h3 className="font-headline text-sm font-bold text-on-surface tracking-tight mb-4 uppercase">
        Productivity Curve
      </h3>

      <div className="flex items-end justify-between gap-2 h-40">
        {PRODUCTIVITY_DATA.map((data, i) => {
          const heightPct = (data.value / maxValue) * 100;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end gap-2"
            >
              <span className="font-label text-xs text-on-surface-variant">
                {data.value}
              </span>
              <div
                className={`w-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all`}
                style={{ height: `${heightPct}%` }}
              />
              <span className="font-label text-xs text-on-surface-variant uppercase">
                {data.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

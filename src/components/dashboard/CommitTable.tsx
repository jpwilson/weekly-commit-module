"use client";

import React, { useState } from "react";
import { useWeeklyStore } from "@/store/weekly-store";
import {
  CommitCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  ChessPriority,
} from "@/types";

function PriorityBars({ level }: { level: ChessPriority }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-1 ${
            bar <= level
              ? "bg-primary-container"
              : "bg-surface-container-highest"
          }`}
          style={{ height: `${bar * 25}%` }}
        />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category: CommitCategory }) {
  const label = CATEGORY_LABELS[category];
  const colorToken = CATEGORY_COLORS[category];

  const colorMap: Record<string, string> = {
    primary: "border-primary text-primary",
    tertiary: "border-tertiary text-tertiary",
    "on-surface-variant": "border-on-surface-variant text-on-surface-variant",
    secondary: "border-secondary text-secondary",
    "tertiary-fixed-dim": "border-tertiary-fixed-dim text-tertiary-fixed-dim",
    "primary-fixed-dim": "border-primary-fixed-dim text-primary-fixed-dim",
  };

  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-label uppercase tracking-wider ${colorMap[colorToken] || "border-on-surface-variant text-on-surface-variant"}`}
    >
      {label}
    </span>
  );
}

export default function CommitTable() {
  const { commits, currentWeek, addCommit, updateCommit } = useWeeklyStore();
  const [newTitle, setNewTitle] = useState("");
  const isDraft = currentWeek.status === "DRAFT";

  const sortedCommits = [...commits].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const handleAddRow = () => {
    if (!isDraft) return;
    const title = newTitle.trim() || "New Commit";
    addCommit(title);
    setNewTitle("");
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-lg font-bold uppercase tracking-wider text-on-surface">
          Engineering Backlog Commit
        </h2>
        {isDraft && (
          <button
            onClick={handleAddRow}
            className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Row
          </button>
        )}
      </div>

      {/* Table */}
      <div className="border border-outline-variant overflow-x-auto">
        {/* Column headers */}
        <div className="grid grid-cols-[80px_1fr_1fr_80px_120px] bg-surface-container-high border-b border-outline-variant">
          <div className="px-4 py-3 font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            ID
          </div>
          <div className="px-4 py-3 font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            Commit Name
          </div>
          <div className="px-4 py-3 font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            Link to RCDO
          </div>
          <div className="px-4 py-3 font-label text-[10px] text-on-surface-variant uppercase tracking-widest text-center">
            Priority
          </div>
          <div className="px-4 py-3 font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            Category
          </div>
        </div>

        {/* Rows */}
        {sortedCommits.map((commit, index) => (
          <div
            key={commit.id}
            className="grid grid-cols-[80px_1fr_1fr_80px_120px] border-b border-outline-variant last:border-b-0 hover:bg-surface-container transition-colors group"
          >
            {/* ID */}
            <div className="px-4 py-3 font-mono text-xs text-on-surface-variant flex items-center">
              ST6-{String(index + 1).padStart(3, "0")}
            </div>

            {/* Commit Name */}
            <div className="px-4 py-3 flex items-center">
              {isDraft ? (
                <input
                  type="text"
                  value={commit.title}
                  onChange={(e) =>
                    updateCommit(commit.id, { title: e.target.value })
                  }
                  className="w-full bg-transparent text-sm text-on-surface font-body border-b border-transparent focus:border-primary-container outline-none py-0.5 transition-colors"
                />
              ) : (
                <span className="text-sm text-on-surface font-body">
                  {commit.title}
                </span>
              )}
            </div>

            {/* RCDO Link */}
            <div className="px-4 py-3 flex items-center gap-1.5 min-w-0">
              {commit.rcdo_link ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-on-surface-variant flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[11px] text-on-surface-variant font-label truncate">
                    {commit.rcdo_link.rally_cry} / {commit.rcdo_link.defining_objective} / {commit.rcdo_link.outcome}
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-outline font-label italic">
                  No link
                </span>
              )}
            </div>

            {/* Priority */}
            <div className="px-4 py-3 flex items-center justify-center">
              <PriorityBars level={commit.priority} />
            </div>

            {/* Category */}
            <div className="px-4 py-3 flex items-center">
              <CategoryBadge category={commit.category} />
            </div>
          </div>
        ))}

        {/* Empty state */}
        {sortedCommits.length === 0 && (
          <div className="px-4 py-8 text-center text-on-surface-variant text-sm font-label">
            No commits yet. Click &quot;+ Add Row&quot; to begin.
          </div>
        )}
      </div>
    </div>
  );
}

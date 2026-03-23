"use client";

import React from "react";
import { Commit, Reconciliation, ReconciliationOutcome } from "@/types";

interface ReconciliationCardProps {
  commit: Commit;
  reconciliation: Reconciliation;
  index: number;
  onOutcomeChange: (commitId: string, outcome: ReconciliationOutcome) => void;
  onNotesChange: (commitId: string, notes: string) => void;
}

const priorityLabel = (p: number) => {
  switch (p) {
    case 1:
      return "LOW";
    case 2:
      return "MEDIUM";
    case 3:
      return "HIGH";
    case 4:
      return "CRITICAL";
    default:
      return "—";
  }
};

export default function ReconciliationCard({
  commit,
  reconciliation,
  index,
  onOutcomeChange,
  onNotesChange,
}: ReconciliationCardProps) {
  const isDone = reconciliation.outcome === "DONE";
  const isHighPriority = commit.priority >= 3;

  // Border color logic
  const borderColor = isDone
    ? "border-l-tertiary"
    : isHighPriority
      ? "border-l-primary"
      : "border-l-outline-variant";

  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`bg-surface-container border border-outline-variant border-l-4 ${borderColor} mb-4`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant">
        {/* Left: Planned Commit */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
              {indexStr} | Planned Commit
            </span>
          </div>

          <h3 className="font-headline text-lg font-bold text-on-surface mb-2">
            {commit.title}
          </h3>

          {commit.description && (
            <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
              {commit.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-1 font-label text-xs uppercase tracking-wider border ${
                isHighPriority
                  ? "bg-primary-container/20 text-primary border-primary/30"
                  : "bg-surface-container-highest text-on-surface-variant border-outline-variant"
              }`}
            >
              {priorityLabel(commit.priority)}
            </span>

            {/* Category */}
            <span className="inline-flex items-center px-2.5 py-1 bg-surface-container-highest text-on-surface-variant font-label text-xs uppercase tracking-wider border border-outline-variant">
              {commit.category.replace("_", " ")}
            </span>

            {/* Estimated Hours */}
            {commit.estimated_hours && (
              <span className="font-label text-xs text-on-surface-variant">
                {commit.estimated_hours}h estimated
              </span>
            )}
          </div>

          {/* Task ID */}
          <div className="mt-4">
            <span className="font-label text-xs text-tertiary font-mono tracking-wider">
              {commit.id}
            </span>
          </div>
        </div>

        {/* Right: Actual Progress */}
        <div className="p-6 bg-surface-container-low">
          <div className="mb-4">
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
              Actual Progress
            </span>
          </div>

          {/* Done / Carry Forward Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name={`outcome-${commit.id}`}
                checked={isDone}
                onChange={() => onOutcomeChange(commit.id, "DONE")}
                className="sr-only"
              />
              <span
                className={`flex items-center justify-center w-5 h-5 border-2 transition-colors ${
                  isDone
                    ? "border-tertiary bg-tertiary"
                    : "border-outline-variant group-hover:border-on-surface-variant"
                }`}
              >
                {isDone && (
                  <svg
                    className="w-3 h-3 text-on-tertiary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`font-label text-sm uppercase tracking-wider ${
                  isDone ? "text-tertiary font-bold" : "text-on-surface-variant"
                }`}
              >
                Done
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name={`outcome-${commit.id}`}
                checked={!isDone}
                onChange={() => onOutcomeChange(commit.id, "CARRY_FORWARD")}
                className="sr-only"
              />
              <span
                className={`flex items-center justify-center w-5 h-5 border-2 transition-colors ${
                  !isDone
                    ? "border-primary bg-primary"
                    : "border-outline-variant group-hover:border-on-surface-variant"
                }`}
              >
                {!isDone && (
                  <svg
                    className="w-3 h-3 text-on-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`font-label text-sm uppercase tracking-wider ${
                  !isDone
                    ? "text-primary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                Carry Forward
              </span>
            </label>
          </div>

          {/* Notes */}
          <textarea
            value={reconciliation.notes || ""}
            onChange={(e) => onNotesChange(commit.id, e.target.value)}
            placeholder="Add reconciliation notes..."
            rows={3}
            className="w-full bg-surface-container border border-outline-variant px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useWeeklyStore } from "@/store/weekly-store";
import { WeekStateMachine } from "@/lib/state-machine";

export default function ActionBar() {
  const { currentWeek, isAutoSaving, commits, lockCommits, startReconciliation, finalizeReconciliation } =
    useWeeklyStore();

  const status = currentWeek.status;
  const nextAction = WeekStateMachine.getNextAction(status);

  // Generate a simple checksum from commits
  const checksum = commits
    .reduce((acc, c) => {
      let hash = 0;
      const str = c.id + c.title + c.updated_at;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return acc ^ hash;
    }, 0)
    .toString(16)
    .toUpperCase()
    .slice(0, 8)
    .padStart(8, "0");

  const handlePrimaryAction = () => {
    switch (status) {
      case "DRAFT":
        lockCommits();
        break;
      case "LOCKED":
        startReconciliation();
        break;
      case "RECONCILING":
        finalizeReconciliation();
        break;
      default:
        break;
    }
  };

  const primaryButtonLabel: Record<string, string> = {
    DRAFT: "Lock Commits",
    LOCKED: "Start Reconciliation",
    RECONCILING: "Finalize Commits",
  };

  return (
    <div className="flex items-center justify-between border-t border-outline-variant pt-6">
      {/* Left — Auto-saving indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {isAutoSaving && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal" />
            </span>
          )}
          <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
            {isAutoSaving ? "Auto-Saving Active" : "Auto-Save Paused"}
          </span>
        </div>

        <span className="font-mono text-[10px] text-outline tracking-wide">
          CK:{checksum}
        </span>
      </div>

      {/* Right — Action buttons */}
      <div className="flex items-center gap-3">
        {status === "DRAFT" && (
          <button className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors">
            Save Draft
          </button>
        )}

        {nextAction && (
          <button
            onClick={handlePrimaryAction}
            className="px-5 py-2 bg-primary-container text-on-primary-container font-label text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
          >
            {primaryButtonLabel[status]}
          </button>
        )}

        {status === "RECONCILED" && (
          <span className="font-label text-[10px] text-terminal uppercase tracking-widest">
            Week Finalized
          </span>
        )}
      </div>
    </div>
  );
}

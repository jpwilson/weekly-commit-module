"use client";

import React from "react";

interface ReconciliationHeaderProps {
  onSaveDraft: () => void;
  onFinalize: () => void;
}

export default function ReconciliationHeader({
  onSaveDraft,
  onFinalize,
}: ReconciliationHeaderProps) {
  return (
    <div className="mb-10">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-tertiary-container/20 text-tertiary border border-tertiary/30 mb-6">
        <span className="h-2 w-2 bg-tertiary animate-blink" />
        <span className="font-label text-xs uppercase tracking-widest">
          Reconciling
        </span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-none">
            Session Reconciliation
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-3 max-w-xl">
            Finalize sprint cycle outcomes. Mark each commitment as completed or
            carry forward to the next operational period.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSaveDraft}
            className="px-5 py-2.5 border border-outline-variant text-on-surface-variant font-label text-sm uppercase tracking-wider hover:bg-surface-container-highest transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={onFinalize}
            className="px-5 py-2.5 bg-primary-container text-on-primary-container font-label text-sm uppercase tracking-wider font-bold hover:bg-primary-fixed-dim transition-colors"
          >
            Finalize Commits
          </button>
        </div>
      </div>
    </div>
  );
}

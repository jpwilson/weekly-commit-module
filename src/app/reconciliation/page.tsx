"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import ReconciliationHeader from "@/components/reconciliation/ReconciliationHeader";
import ReconciliationCard from "@/components/reconciliation/ReconciliationCard";
import { useWeeklyStore } from "@/store/weekly-store";

export default function ReconciliationPage() {
  const {
    commits,
    reconciliations,
    setReconciliationOutcome,
    setReconciliationNotes,
    finalizeReconciliation,
  } = useWeeklyStore();

  const handleSaveDraft = () => {
    // Draft is auto-saved via store — this is a UI acknowledgment
  };

  const handleFinalize = () => {
    finalizeReconciliation();
  };

  return (
    <AppShell
      sideNavProps={{
        currentPath: "/carry-forward",
      }}
    >
      <ReconciliationHeader
        onSaveDraft={handleSaveDraft}
        onFinalize={handleFinalize}
      />

      <div className="space-y-4">
        {commits.map((commit, index) => {
          const reconciliation = reconciliations.find(
            (r) => r.commit_id === commit.id
          );
          if (!reconciliation) return null;

          return (
            <ReconciliationCard
              key={commit.id}
              commit={commit}
              reconciliation={reconciliation}
              index={index}
              onOutcomeChange={setReconciliationOutcome}
              onNotesChange={setReconciliationNotes}
            />
          );
        })}
      </div>
    </AppShell>
  );
}

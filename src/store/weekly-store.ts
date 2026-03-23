"use client";

import { create } from "zustand";
import {
  Week,
  Commit,
  Reconciliation,
  WeekStatus,
  CommitCategory,
  ChessPriority,
  ReconciliationOutcome,
} from "@/types";
import { WeekStateMachine } from "@/lib/state-machine";
import { COMMITS, WEEKS, RECONCILIATIONS, getRCDOLink } from "@/lib/mock-data";
import { v4 as uuidv4 } from "uuid";

interface WeeklyState {
  // Current week
  currentWeek: Week;
  commits: Commit[];
  reconciliations: Reconciliation[];

  // UI state
  isAutoSaving: boolean;
  lastSyncTime: string;

  // Actions — Commits
  addCommit: (title: string) => void;
  updateCommit: (id: string, updates: Partial<Commit>) => void;
  deleteCommit: (id: string) => void;
  reorderCommit: (id: string, newOrder: number) => void;

  // Actions — Week lifecycle
  transitionWeek: (targetStatus: WeekStatus) => void;
  lockCommits: () => void;
  startReconciliation: () => void;
  finalizeReconciliation: () => void;

  // Actions — Reconciliation
  setReconciliationOutcome: (
    commitId: string,
    outcome: ReconciliationOutcome
  ) => void;
  setReconciliationNotes: (commitId: string, notes: string) => void;

  // Carry forward
  carryForwardToNextWeek: () => Commit[];
}

export const useWeeklyStore = create<WeeklyState>((set, get) => ({
  currentWeek: WEEKS[0],
  commits: COMMITS,
  reconciliations: RECONCILIATIONS,
  isAutoSaving: true,
  lastSyncTime: new Date().toISOString(),

  addCommit: (title: string) => {
    const state = get();
    if (state.currentWeek.status !== "DRAFT") return;

    const newCommit: Commit = {
      id: uuidv4(),
      week_id: state.currentWeek.id,
      user_id: state.currentWeek.user_id,
      title,
      description: null,
      outcome_id: null,
      priority: 2 as ChessPriority,
      category: "FEATURE" as CommitCategory,
      estimated_hours: null,
      sort_order: state.commits.length + 1,
      carried_from_commit_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    set({
      commits: [...state.commits, newCommit],
      lastSyncTime: new Date().toISOString(),
    });
  },

  updateCommit: (id: string, updates: Partial<Commit>) => {
    const state = get();
    if (state.currentWeek.status !== "DRAFT") return;

    set({
      commits: state.commits.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
              updated_at: new Date().toISOString(),
              rcdo_link: updates.outcome_id
                ? getRCDOLink(updates.outcome_id)
                : c.rcdo_link,
            }
          : c
      ),
      lastSyncTime: new Date().toISOString(),
    });
  },

  deleteCommit: (id: string) => {
    const state = get();
    if (state.currentWeek.status !== "DRAFT") return;

    set({
      commits: state.commits
        .filter((c) => c.id !== id)
        .map((c, i) => ({ ...c, sort_order: i + 1 })),
      lastSyncTime: new Date().toISOString(),
    });
  },

  reorderCommit: (id: string, newOrder: number) => {
    const state = get();
    if (state.currentWeek.status !== "DRAFT") return;

    const commits = [...state.commits];
    const idx = commits.findIndex((c) => c.id === id);
    if (idx === -1) return;

    const [moved] = commits.splice(idx, 1);
    commits.splice(newOrder - 1, 0, moved);

    set({
      commits: commits.map((c, i) => ({ ...c, sort_order: i + 1 })),
      lastSyncTime: new Date().toISOString(),
    });
  },

  transitionWeek: (targetStatus: WeekStatus) => {
    const state = get();
    const newStatus = WeekStateMachine.transition(
      state.currentWeek.status,
      targetStatus
    );

    const updates: Partial<Week> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    if (newStatus === "LOCKED") {
      updates.locked_at = new Date().toISOString();
    }
    if (newStatus === "RECONCILED") {
      updates.reconciled_at = new Date().toISOString();
    }

    set({
      currentWeek: { ...state.currentWeek, ...updates },
      lastSyncTime: new Date().toISOString(),
    });
  },

  lockCommits: () => get().transitionWeek("LOCKED"),

  startReconciliation: () => {
    const state = get();
    state.transitionWeek("RECONCILING");

    // Initialize reconciliation records for all commits
    const newReconciliations: Reconciliation[] = state.commits.map((commit) => {
      const existing = state.reconciliations.find(
        (r) => r.commit_id === commit.id
      );
      if (existing) return existing;

      return {
        id: uuidv4(),
        commit_id: commit.id,
        week_id: state.currentWeek.id,
        user_id: state.currentWeek.user_id,
        outcome: "DONE" as ReconciliationOutcome,
        notes: null,
        actual_hours: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        commit,
      };
    });

    set({ reconciliations: newReconciliations });
  },

  finalizeReconciliation: () => get().transitionWeek("RECONCILED"),

  setReconciliationOutcome: (
    commitId: string,
    outcome: ReconciliationOutcome
  ) => {
    set({
      reconciliations: get().reconciliations.map((r) =>
        r.commit_id === commitId
          ? { ...r, outcome, updated_at: new Date().toISOString() }
          : r
      ),
      lastSyncTime: new Date().toISOString(),
    });
  },

  setReconciliationNotes: (commitId: string, notes: string) => {
    set({
      reconciliations: get().reconciliations.map((r) =>
        r.commit_id === commitId
          ? { ...r, notes, updated_at: new Date().toISOString() }
          : r
      ),
      lastSyncTime: new Date().toISOString(),
    });
  },

  carryForwardToNextWeek: () => {
    const state = get();
    const carryForwards = state.reconciliations
      .filter((r) => r.outcome === "CARRY_FORWARD")
      .map((r) => {
        const originalCommit = state.commits.find(
          (c) => c.id === r.commit_id
        );
        if (!originalCommit) return null;

        return {
          ...originalCommit,
          id: uuidv4(),
          week_id: "week-next",
          carried_from_commit_id: originalCommit.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Commit;
      })
      .filter(Boolean) as Commit[];

    return carryForwards;
  },
}));

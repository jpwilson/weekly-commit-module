import { WeekStatus, VALID_TRANSITIONS } from "@/types";

export class WeekStateMachine {
  static canTransition(from: WeekStatus, to: WeekStatus): boolean {
    return VALID_TRANSITIONS[from].includes(to);
  }

  static transition(current: WeekStatus, target: WeekStatus): WeekStatus {
    if (!this.canTransition(current, target)) {
      throw new Error(
        `Invalid state transition: ${current} → ${target}. ` +
          `Valid transitions from ${current}: ${VALID_TRANSITIONS[current].join(", ") || "none"}`
      );
    }
    return target;
  }

  static getAvailableTransitions(current: WeekStatus): WeekStatus[] {
    return VALID_TRANSITIONS[current];
  }

  static getStatusLabel(status: WeekStatus): string {
    const labels: Record<WeekStatus, string> = {
      DRAFT: "Draft",
      LOCKED: "Locked",
      RECONCILING: "Reconciling",
      RECONCILED: "Reconciled",
    };
    return labels[status];
  }

  static getStatusColor(status: WeekStatus): string {
    const colors: Record<WeekStatus, string> = {
      DRAFT: "primary-container",
      LOCKED: "primary",
      RECONCILING: "tertiary",
      RECONCILED: "terminal",
    };
    return colors[status];
  }

  static getNextAction(status: WeekStatus): string | null {
    const actions: Record<WeekStatus, string | null> = {
      DRAFT: "Lock Commits",
      LOCKED: "Start Reconciliation",
      RECONCILING: "Finalize Commits",
      RECONCILED: null,
    };
    return actions[status];
  }
}

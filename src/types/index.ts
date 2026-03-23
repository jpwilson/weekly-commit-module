// ============================================================
// ST6 Weekly Commit Module — Core Types
// ============================================================

// Weekly lifecycle state machine
export type WeekStatus =
  | "DRAFT"
  | "LOCKED"
  | "RECONCILING"
  | "RECONCILED";

// Valid state transitions
export const VALID_TRANSITIONS: Record<WeekStatus, WeekStatus[]> = {
  DRAFT: ["LOCKED"],
  LOCKED: ["RECONCILING"],
  RECONCILING: ["RECONCILED"],
  RECONCILED: [], // Terminal state; carry-forward creates new DRAFT week
};

// Chess layer priority (1-4 scale)
export type ChessPriority = 1 | 2 | 3 | 4;

// Commit categories
export type CommitCategory =
  | "CRITICAL_OPS"
  | "PERFORMANCE"
  | "MAINTENANCE"
  | "FEATURE"
  | "RESEARCH"
  | "COLLABORATION";

export const CATEGORY_LABELS: Record<CommitCategory, string> = {
  CRITICAL_OPS: "Critical Ops",
  PERFORMANCE: "Performance",
  MAINTENANCE: "Maintenance",
  FEATURE: "Feature",
  RESEARCH: "Research",
  COLLABORATION: "Collaboration",
};

export const CATEGORY_COLORS: Record<CommitCategory, string> = {
  CRITICAL_OPS: "primary",
  PERFORMANCE: "tertiary",
  MAINTENANCE: "on-surface-variant",
  FEATURE: "secondary",
  RESEARCH: "tertiary-fixed-dim",
  COLLABORATION: "primary-fixed-dim",
};

// Reconciliation outcome
export type ReconciliationOutcome = "DONE" | "CARRY_FORWARD";

// User roles
export type UserRole = "INDIVIDUAL" | "MANAGER" | "ADMIN";

// ============================================================
// Database models
// ============================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  title: string;
  avatar_initials: string;
  manager_id: string | null;
  created_at: string;
}

export interface RallyCry {
  id: string;
  name: string;
  description: string;
  org_id: string;
  created_at: string;
}

export interface DefiningObjective {
  id: string;
  rally_cry_id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Outcome {
  id: string;
  defining_objective_id: string;
  name: string;
  description: string;
  metric: string | null;
  target_value: string | null;
  created_at: string;
}

// Flattened RCDO for display
export interface RCDOLink {
  rally_cry: string;
  defining_objective: string;
  outcome: string;
  outcome_id: string;
}

export interface Week {
  id: string;
  user_id: string;
  week_number: number;
  year: number;
  status: WeekStatus;
  locked_at: string | null;
  reconciled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Commit {
  id: string;
  week_id: string;
  user_id: string;
  title: string;
  description: string | null;
  outcome_id: string | null;
  priority: ChessPriority;
  category: CommitCategory;
  estimated_hours: number | null;
  sort_order: number;
  carried_from_commit_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  outcome?: Outcome;
  rcdo_link?: RCDOLink;
}

export interface Reconciliation {
  id: string;
  commit_id: string;
  week_id: string;
  user_id: string;
  outcome: ReconciliationOutcome;
  notes: string | null;
  actual_hours: number | null;
  created_at: string;
  updated_at: string;
  // Joined
  commit?: Commit;
}

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  page_path: string | null;
  user_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ============================================================
// API / UI helpers
// ============================================================

export interface WeekWithCommits extends Week {
  commits: Commit[];
  commit_count: number;
  total_slots: number; // max commits per week (configurable, default 12)
}

export interface TeamMemberSummary {
  profile: Profile;
  week: Week | null;
  commit_count: number;
  rcdo_alignment: number; // 0-100
  throughput: number;
}

export interface DashboardStats {
  commit_density: string; // "08/12"
  chess_level: number;
  network_velocity: number;
  rcdo_reference: string;
}

export interface ManagerStats {
  total_commits: number;
  rcdo_alignment: number;
  members_locked: number;
  total_members: number;
  drafts_overdue: number;
}

export interface ProductivityData {
  day: string;
  value: number;
}

// Agent types
export interface AgentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface AgentConversation {
  id: string;
  messages: AgentMessage[];
  created_at: string;
}

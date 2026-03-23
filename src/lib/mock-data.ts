import {
  Profile,
  RallyCry,
  DefiningObjective,
  Outcome,
  Week,
  Commit,
  Reconciliation,
  RCDOLink,
  TeamMemberSummary,
  ProductivityData,
  AnalyticsEvent,
} from "@/types";

// ============================================================
// RCDO Hierarchy — Rally Cries → Defining Objectives → Outcomes
// ============================================================

export const RALLY_CRIES: RallyCry[] = [
  {
    id: "rc-1",
    name: "Operational Excellence",
    description: "Achieve best-in-class operational performance across all engineering teams",
    org_id: "org-1",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "rc-2",
    name: "Customer-Centric Innovation",
    description: "Deliver features that directly address top customer pain points",
    org_id: "org-1",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "rc-3",
    name: "Platform Scalability",
    description: "Ensure platform can handle 10x growth without degradation",
    org_id: "org-1",
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const DEFINING_OBJECTIVES: DefiningObjective[] = [
  {
    id: "do-1",
    rally_cry_id: "rc-1",
    name: "Reduce Incident Response Time",
    description: "Cut MTTR from 45min to under 15min",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "do-2",
    rally_cry_id: "rc-1",
    name: "Automate Deployment Pipeline",
    description: "Zero-touch deployments for all services",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "do-3",
    rally_cry_id: "rc-2",
    name: "Improve Onboarding Experience",
    description: "Reduce time-to-value for new users by 50%",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "do-4",
    rally_cry_id: "rc-2",
    name: "Launch Self-Service Analytics",
    description: "Users can build their own dashboards without engineering support",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "do-5",
    rally_cry_id: "rc-3",
    name: "Database Performance Overhaul",
    description: "Sub-100ms p99 for all critical queries",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "do-6",
    rally_cry_id: "rc-3",
    name: "Horizontal Scaling Architecture",
    description: "All services stateless and horizontally scalable",
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const OUTCOMES: Outcome[] = [
  {
    id: "out-1",
    defining_objective_id: "do-1",
    name: "Automated Alerting Pipeline",
    description: "PagerDuty integration with auto-escalation",
    metric: "MTTR",
    target_value: "< 15 min",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-2",
    defining_objective_id: "do-1",
    name: "Runbook Automation",
    description: "Top 10 incidents have automated runbooks",
    metric: "Automated runbooks",
    target_value: "10",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-3",
    defining_objective_id: "do-2",
    name: "CI/CD Pipeline Reliability",
    description: "99.5% pipeline success rate",
    metric: "Success rate",
    target_value: "99.5%",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-4",
    defining_objective_id: "do-3",
    name: "Interactive Onboarding Flow",
    description: "Step-by-step guided setup wizard",
    metric: "Completion rate",
    target_value: "> 80%",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-5",
    defining_objective_id: "do-4",
    name: "Dashboard Builder MVP",
    description: "Drag-and-drop dashboard creation tool",
    metric: "Dashboards created",
    target_value: "100 / month",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-6",
    defining_objective_id: "do-5",
    name: "Query Optimization Sprint",
    description: "Optimize top 20 slowest queries",
    metric: "p99 latency",
    target_value: "< 100ms",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-7",
    defining_objective_id: "do-5",
    name: "Connection Pool Tuning",
    description: "Implement PgBouncer with optimal pool sizing",
    metric: "Connection errors",
    target_value: "0",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "out-8",
    defining_objective_id: "do-6",
    name: "Stateless Auth Service",
    description: "Migrate auth to JWT-based stateless architecture",
    metric: "Instances",
    target_value: "Auto-scale 2-20",
    created_at: "2026-01-01T00:00:00Z",
  },
];

// ============================================================
// Helper to build RCDO link from outcome_id
// ============================================================

export function getRCDOLink(outcomeId: string): RCDOLink | undefined {
  const outcome = OUTCOMES.find((o) => o.id === outcomeId);
  if (!outcome) return undefined;
  const defObj = DEFINING_OBJECTIVES.find(
    (d) => d.id === outcome.defining_objective_id
  );
  if (!defObj) return undefined;
  const rallyCry = RALLY_CRIES.find((r) => r.id === defObj.rally_cry_id);
  if (!rallyCry) return undefined;
  return {
    rally_cry: rallyCry.name,
    defining_objective: defObj.name,
    outcome: outcome.name,
    outcome_id: outcome.id,
  };
}

// ============================================================
// Users / Profiles
// ============================================================

export const PROFILES: Profile[] = [
  {
    id: "user-1",
    email: "jane.doe@st6.io",
    full_name: "Jane Doe",
    role: "INDIVIDUAL",
    title: "Senior Engineer",
    avatar_initials: "JD",
    manager_id: "user-4",
    created_at: "2025-09-01T00:00:00Z",
  },
  {
    id: "user-2",
    email: "marcus.kaine@st6.io",
    full_name: "Marcus Kaine",
    role: "INDIVIDUAL",
    title: "Fullstack Dev",
    avatar_initials: "MK",
    manager_id: "user-4",
    created_at: "2025-09-01T00:00:00Z",
  },
  {
    id: "user-3",
    email: "sarah.lopez@st6.io",
    full_name: "Sarah Lopez",
    role: "INDIVIDUAL",
    title: "Product Lead",
    avatar_initials: "SL",
    manager_id: "user-4",
    created_at: "2025-09-01T00:00:00Z",
  },
  {
    id: "user-4",
    email: "alex.chen@st6.io",
    full_name: "Alex Chen",
    role: "MANAGER",
    title: "Engineering Manager",
    avatar_initials: "AC",
    manager_id: null,
    created_at: "2025-08-01T00:00:00Z",
  },
  {
    id: "user-5",
    email: "riley.park@st6.io",
    full_name: "Riley Park",
    role: "INDIVIDUAL",
    title: "Backend Engineer",
    avatar_initials: "RP",
    manager_id: "user-4",
    created_at: "2025-10-01T00:00:00Z",
  },
];

export const CURRENT_USER = PROFILES[0]; // Jane Doe for individual view

// ============================================================
// Weeks
// ============================================================

export const WEEKS: Week[] = [
  {
    id: "week-current",
    user_id: "user-1",
    week_number: 12,
    year: 2026,
    status: "DRAFT",
    locked_at: null,
    reconciled_at: null,
    created_at: "2026-03-16T00:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
  },
  {
    id: "week-prev",
    user_id: "user-1",
    week_number: 11,
    year: 2026,
    status: "RECONCILED",
    locked_at: "2026-03-10T17:00:00Z",
    reconciled_at: "2026-03-14T16:30:00Z",
    created_at: "2026-03-09T00:00:00Z",
    updated_at: "2026-03-14T16:30:00Z",
  },
];

// ============================================================
// Commits for current week (Week 12)
// ============================================================

export const COMMITS: Commit[] = [
  {
    id: "commit-1",
    week_id: "week-current",
    user_id: "user-1",
    title: "Refactor Auth Middleware",
    description:
      "Implement OAuth2.0 standard and integrate hardware security key support for administrative shells.",
    outcome_id: "out-8",
    priority: 3,
    category: "CRITICAL_OPS",
    estimated_hours: 12,
    sort_order: 1,
    carried_from_commit_id: null,
    created_at: "2026-03-16T09:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-8"),
  },
  {
    id: "commit-2",
    week_id: "week-current",
    user_id: "user-1",
    title: "Optimize DB Query Layer",
    description:
      "Reduce latency on /api/v1/metrics endpoint by 15% through strategic indexing and query caching.",
    outcome_id: "out-6",
    priority: 2,
    category: "PERFORMANCE",
    estimated_hours: 8,
    sort_order: 2,
    carried_from_commit_id: "commit-prev-3",
    created_at: "2026-03-16T09:15:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-6"),
  },
  {
    id: "commit-3",
    week_id: "week-current",
    user_id: "user-1",
    title: "Implement Data Grid Virtualization",
    description:
      "Implement virtualized scrolling for the Reconciliation view to support high-density technical datasets.",
    outcome_id: "out-5",
    priority: 3,
    category: "FEATURE",
    estimated_hours: 16,
    sort_order: 3,
    carried_from_commit_id: null,
    created_at: "2026-03-16T09:30:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-5"),
  },
  {
    id: "commit-4",
    week_id: "week-current",
    user_id: "user-1",
    title: "CI/CD Pipeline Hardening",
    description:
      "Add retry logic for flaky integration tests, implement artifact caching for faster builds.",
    outcome_id: "out-3",
    priority: 2,
    category: "MAINTENANCE",
    estimated_hours: 6,
    sort_order: 4,
    carried_from_commit_id: null,
    created_at: "2026-03-17T10:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-3"),
  },
  {
    id: "commit-5",
    week_id: "week-current",
    user_id: "user-1",
    title: "Onboarding Flow Prototype",
    description:
      "Build interactive step-by-step wizard for new user setup, including role selection and team assignment.",
    outcome_id: "out-4",
    priority: 2,
    category: "FEATURE",
    estimated_hours: 10,
    sort_order: 5,
    carried_from_commit_id: null,
    created_at: "2026-03-17T11:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-4"),
  },
  {
    id: "commit-6",
    week_id: "week-current",
    user_id: "user-1",
    title: "PagerDuty Integration",
    description:
      "Connect alerting pipeline to PagerDuty API with auto-escalation rules based on severity.",
    outcome_id: "out-1",
    priority: 3,
    category: "CRITICAL_OPS",
    estimated_hours: 8,
    sort_order: 6,
    carried_from_commit_id: null,
    created_at: "2026-03-18T09:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-1"),
  },
  {
    id: "commit-7",
    week_id: "week-current",
    user_id: "user-1",
    title: "Connection Pool Configuration",
    description:
      "Deploy and configure PgBouncer with transaction-level pooling, tune pool sizes per service.",
    outcome_id: "out-7",
    priority: 1,
    category: "PERFORMANCE",
    estimated_hours: 4,
    sort_order: 7,
    carried_from_commit_id: null,
    created_at: "2026-03-19T14:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-7"),
  },
  {
    id: "commit-8",
    week_id: "week-current",
    user_id: "user-1",
    title: "Automated Runbook: DB Failover",
    description:
      "Create automated runbook for database failover scenario, including health checks and rollback procedures.",
    outcome_id: "out-2",
    priority: 2,
    category: "RESEARCH",
    estimated_hours: 6,
    sort_order: 8,
    carried_from_commit_id: null,
    created_at: "2026-03-20T10:00:00Z",
    updated_at: "2026-03-23T09:42:11Z",
    rcdo_link: getRCDOLink("out-2"),
  },
];

// ============================================================
// Reconciliation data (for week 11 — already reconciled)
// ============================================================

export const RECONCILIATIONS: Reconciliation[] = [
  {
    id: "recon-1",
    commit_id: "commit-1",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes: null,
    actual_hours: null,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[0],
  },
  {
    id: "recon-2",
    commit_id: "commit-2",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "CARRY_FORWARD",
    notes:
      "Dependency block: Engine team delayed the v3 schema rollout. Moving 8h to next sprint cycle.",
    actual_hours: 3,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[1],
  },
  {
    id: "recon-3",
    commit_id: "commit-3",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes:
      "Implemented using intersection observer. Performance metrics show 60fps during rapid scroll. Verified on mobile.",
    actual_hours: 14,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[2],
  },
  {
    id: "recon-4",
    commit_id: "commit-4",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes: "Added retry logic and build cache. Pipeline runs reduced from 12min to 7min average.",
    actual_hours: 5,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[3],
  },
  {
    id: "recon-5",
    commit_id: "commit-5",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes: "Prototype complete. User testing scheduled for next week.",
    actual_hours: 9,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[4],
  },
  {
    id: "recon-6",
    commit_id: "commit-6",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "CARRY_FORWARD",
    notes: "PagerDuty API access delayed — waiting on security review approval.",
    actual_hours: 2,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[5],
  },
  {
    id: "recon-7",
    commit_id: "commit-7",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes: "PgBouncer deployed. Connection errors dropped to 0. Pool sizing documented.",
    actual_hours: 4,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[6],
  },
  {
    id: "recon-8",
    commit_id: "commit-8",
    week_id: "week-current",
    user_id: "user-1",
    outcome: "DONE",
    notes: "Runbook created and tested in staging. Added to incident response wiki.",
    actual_hours: 5,
    created_at: "2026-03-23T09:42:11Z",
    updated_at: "2026-03-23T09:42:11Z",
    commit: COMMITS[7],
  },
];

// ============================================================
// Team data for manager dashboard
// ============================================================

export const TEAM_MEMBERS: TeamMemberSummary[] = [
  {
    profile: PROFILES[0],
    week: {
      ...WEEKS[0],
      status: "LOCKED",
    },
    commit_count: 8,
    rcdo_alignment: 98,
    throughput: 12.4,
  },
  {
    profile: PROFILES[1],
    week: {
      ...WEEKS[0],
      user_id: "user-2",
      status: "DRAFT",
    },
    commit_count: 5,
    rcdo_alignment: 72,
    throughput: 8.1,
  },
  {
    profile: PROFILES[2],
    week: {
      ...WEEKS[0],
      user_id: "user-3",
      status: "LOCKED",
    },
    commit_count: 7,
    rcdo_alignment: 89,
    throughput: 10.0,
  },
  {
    profile: PROFILES[4],
    week: {
      ...WEEKS[0],
      user_id: "user-5",
      status: "LOCKED",
    },
    commit_count: 6,
    rcdo_alignment: 91,
    throughput: 9.2,
  },
];

// ============================================================
// Productivity curve data (manager dashboard)
// ============================================================

export const PRODUCTIVITY_DATA: ProductivityData[] = [
  { day: "M", value: 40 },
  { day: "T", value: 65 },
  { day: "W", value: 85 },
  { day: "T", value: 55 },
  { day: "F", value: 90 },
  { day: "S", value: 75 },
  { day: "S", value: 60 },
];

// ============================================================
// Analytics mock data
// ============================================================

export const ANALYTICS_EVENTS: AnalyticsEvent[] = [
  {
    id: "ae-1",
    event_name: "commit_created",
    page_path: "/dashboard",
    user_id: "user-1",
    referrer: null,
    user_agent: null,
    country: "US",
    metadata: { category: "CRITICAL_OPS", priority: 3 },
    created_at: "2026-03-18T10:00:00Z",
  },
  {
    id: "ae-2",
    event_name: "week_locked",
    page_path: "/dashboard",
    user_id: "user-1",
    referrer: null,
    user_agent: null,
    country: "US",
    metadata: { week_number: 11, commit_count: 6 },
    created_at: "2026-03-10T17:00:00Z",
  },
  {
    id: "ae-3",
    event_name: "reconciliation_completed",
    page_path: "/reconciliation",
    user_id: "user-1",
    referrer: null,
    user_agent: null,
    country: "US",
    metadata: { done: 5, carry_forward: 1 },
    created_at: "2026-03-14T16:30:00Z",
  },
];

// ============================================================
// Analytics summary helpers
// ============================================================

export interface AnalyticsSummary {
  totalCommitsThisMonth: number;
  avgCommitsPerWeek: number;
  carryForwardRate: number;
  rcdoAlignmentTrend: number[];
  commitsByCategory: { category: string; count: number }[];
  weeklyVelocity: { week: string; planned: number; completed: number }[];
  topOutcomes: { outcome: string; commits: number }[];
  teamActivity: { user: string; commits: number; alignment: number }[];
}

export const ANALYTICS_SUMMARY: AnalyticsSummary = {
  totalCommitsThisMonth: 142,
  avgCommitsPerWeek: 7.4,
  carryForwardRate: 18.5,
  rcdoAlignmentTrend: [82, 85, 88, 91, 94, 89, 92, 94],
  commitsByCategory: [
    { category: "Critical Ops", count: 38 },
    { category: "Feature", count: 42 },
    { category: "Performance", count: 28 },
    { category: "Maintenance", count: 18 },
    { category: "Research", count: 10 },
    { category: "Collaboration", count: 6 },
  ],
  weeklyVelocity: [
    { week: "W5", planned: 8, completed: 6 },
    { week: "W6", planned: 7, completed: 7 },
    { week: "W7", planned: 9, completed: 7 },
    { week: "W8", planned: 8, completed: 8 },
    { week: "W9", planned: 10, completed: 8 },
    { week: "W10", planned: 7, completed: 6 },
    { week: "W11", planned: 8, completed: 6 },
    { week: "W12", planned: 8, completed: 0 },
  ],
  topOutcomes: [
    { outcome: "Query Optimization Sprint", commits: 12 },
    { outcome: "CI/CD Pipeline Reliability", commits: 10 },
    { outcome: "Interactive Onboarding Flow", commits: 9 },
    { outcome: "Automated Alerting Pipeline", commits: 8 },
    { outcome: "Dashboard Builder MVP", commits: 7 },
  ],
  teamActivity: [
    { user: "Jane Doe", commits: 42, alignment: 98 },
    { user: "Marcus Kaine", commits: 28, alignment: 72 },
    { user: "Sarah Lopez", commits: 38, alignment: 89 },
    { user: "Riley Park", commits: 34, alignment: 91 },
  ],
};

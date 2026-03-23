"use client";

import { useState } from "react";
import { ANALYTICS_SUMMARY } from "@/lib/mock-data";

function StatCard({
  label,
  value,
  subtitle,
  color = "primary",
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="bg-surface-container-low p-6 space-y-2">
      <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
        {label}
      </span>
      <div className={`text-3xl font-headline font-bold text-${color}`}>
        {value}
      </div>
      {subtitle && (
        <p className="font-body text-xs text-on-surface-variant/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BarChart({
  data,
  labelKey,
  valueKey,
  maxValue,
  color = "bg-primary",
}: {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  maxValue?: number;
  color?: string;
}) {
  const max =
    maxValue ||
    Math.max(...data.map((d) => Number(d[valueKey])));
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-28 text-xs font-label text-on-surface-variant truncate">
            {String(item[labelKey])}
          </span>
          <div className="flex-1 bg-surface-container-highest h-4">
            <div
              className={`${color} h-full transition-all duration-500`}
              style={{
                width: `${(Number(item[valueKey]) / max) * 100}%`,
              }}
            />
          </div>
          <span className="w-8 text-xs font-label text-on-surface text-right">
            {String(item[valueKey])}
          </span>
        </div>
      ))}
    </div>
  );
}

function VelocityChart({
  data,
}: {
  data: { week: string; planned: number; completed: number }[];
}) {
  const max = Math.max(...data.map((d) => Math.max(d.planned, d.completed)));
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 items-end h-32">
            <div
              className="flex-1 bg-primary/30"
              style={{ height: `${(d.planned / max) * 100}%` }}
            />
            <div
              className="flex-1 bg-primary"
              style={{ height: `${(d.completed / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-label text-on-surface-variant">
            {d.week}
          </span>
        </div>
      ))}
    </div>
  );
}

function TrendLine({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="#ffb300"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((v - min) / range) * 80 - 10;
        return (
          <circle key={i} cx={x} cy={y} r="2" fill="#ffd79b" />
        );
      })}
    </svg>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("month");
  const data = ANALYTICS_SUMMARY;

  return (
    <div className="min-h-screen bg-background">
      {/* TopNav */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-background z-50">
        <a href="/dashboard" className="text-2xl font-black text-primary tracking-tighter font-headline">
          ST6
        </a>
        <div className="hidden md:flex gap-8 items-center">
          <a href="/dashboard" className="font-headline tracking-tighter uppercase font-bold text-on-surface opacity-80 hover:text-primary-container transition-colors">
            Dashboard
          </a>
          <a href="/reconciliation" className="font-headline tracking-tighter uppercase font-bold text-on-surface opacity-80 hover:text-primary-container transition-colors">
            Reconciliation
          </a>
          <a href="/manager" className="font-headline tracking-tighter uppercase font-bold text-on-surface opacity-80 hover:text-primary-container transition-colors">
            Manager
          </a>
          <a href="/analytics" className="font-headline tracking-tighter uppercase font-bold text-primary-container transition-colors">
            Analytics
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-tertiary text-xs tracking-widest uppercase">
              System Intelligence / Metrics
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter uppercase leading-none">
              Analytics
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-xl">
              Commit patterns, RCDO alignment trends, team velocity, and carry-forward analysis.
            </p>
          </div>
          <div className="flex gap-2">
            {(["week", "month", "quarter"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 font-label text-xs uppercase tracking-widest transition-colors ${
                  period === p
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-outline-variant/15 border border-outline-variant/20">
          <StatCard
            label="Total Commits"
            value={data.totalCommitsThisMonth}
            subtitle="This month across all teams"
          />
          <StatCard
            label="Avg / Week"
            value={data.avgCommitsPerWeek}
            subtitle="Per team member"
            color="tertiary"
          />
          <StatCard
            label="Carry Forward Rate"
            value={`${data.carryForwardRate}%`}
            subtitle="Lower is better"
            color="secondary"
          />
          <StatCard
            label="RCDO Alignment"
            value={`${data.rcdoAlignmentTrend[data.rcdoAlignmentTrend.length - 1]}%`}
            subtitle="Current period"
            color="primary"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekly Velocity */}
          <div className="bg-surface-container-low p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary" />
                Weekly Velocity
              </h3>
              <div className="flex gap-4 text-[10px] font-label uppercase text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-2 bg-primary/30" /> Planned
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-2 bg-primary" /> Completed
                </span>
              </div>
            </div>
            <VelocityChart data={data.weeklyVelocity} />
          </div>

          {/* RCDO Alignment Trend */}
          <div className="bg-surface-container-low p-6 space-y-4">
            <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary" />
              RCDO Alignment Trend
            </h3>
            <TrendLine data={data.rcdoAlignmentTrend} />
            <div className="flex justify-between text-[10px] font-label text-on-surface-variant">
              {data.rcdoAlignmentTrend.map((v, i) => (
                <span key={i}>{v}%</span>
              ))}
            </div>
          </div>

          {/* Commits by Category */}
          <div className="bg-surface-container-low p-6 space-y-4">
            <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary" />
              Commits by Category
            </h3>
            <BarChart
              data={data.commitsByCategory}
              labelKey="category"
              valueKey="count"
              color="bg-primary"
            />
          </div>

          {/* Top Outcomes */}
          <div className="bg-surface-container-low p-6 space-y-4">
            <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-container" />
              Top Linked Outcomes
            </h3>
            <BarChart
              data={data.topOutcomes}
              labelKey="outcome"
              valueKey="commits"
              color="bg-tertiary"
            />
          </div>

          {/* Team Activity */}
          <div className="bg-surface-container-low p-6 space-y-4 md:col-span-2">
            <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-primary" />
              Team Member Activity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 font-label text-[10px] text-on-surface-variant tracking-widest uppercase">
                    <th className="px-6 py-3 font-normal">Member</th>
                    <th className="px-6 py-3 font-normal text-right">Commits</th>
                    <th className="px-6 py-3 font-normal">Alignment</th>
                    <th className="px-6 py-3 font-normal text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data.teamActivity.map((member, i) => (
                    <tr
                      key={i}
                      className="hover:bg-surface-container-high transition-colors"
                    >
                      <td className="px-6 py-4 font-headline font-bold text-sm">
                        {member.user}
                      </td>
                      <td className="px-6 py-4 text-right font-label text-sm">
                        {member.commits}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-surface-container-highest h-1.5">
                            <div
                              className="bg-primary h-full"
                              style={{ width: `${member.alignment}%` }}
                            />
                          </div>
                          <span className="text-xs font-label">
                            {member.alignment}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-xs font-label ${
                            member.alignment >= 90
                              ? "text-terminal"
                              : member.alignment >= 80
                              ? "text-primary"
                              : "text-error"
                          }`}
                        >
                          {member.alignment >= 90
                            ? "Excellent"
                            : member.alignment >= 80
                            ? "Good"
                            : "Needs Focus"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full px-4 py-2 flex justify-between items-center z-[100] bg-surface-container-lowest border-t border-dashed border-surface-container-highest">
        <div className="flex items-center gap-4">
          <span className="text-terminal animate-pulse font-mono text-xs tracking-widest uppercase">
            λ
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-terminal/70">
            ST6 ANALYTICS ENGINE v1.0
          </span>
        </div>
      </footer>
    </div>
  );
}

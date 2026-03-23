"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import WeekHeader from "@/components/dashboard/WeekHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import CommitTable from "@/components/dashboard/CommitTable";
import ActionBar from "@/components/dashboard/ActionBar";

export default function DashboardPage() {
  return (
    <AppShell
      sideNavProps={{
        currentPath: "/dashboard",
        statusNotification: {
          label: "Week 12",
          message: "Draft in progress",
        },
      }}
    >
      <div className="max-w-6xl mx-auto">
        <WeekHeader />
        <StatsGrid />
        <CommitTable />
        <ActionBar />
      </div>
    </AppShell>
  );
}

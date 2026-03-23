"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import ManagerHeader from "@/components/manager/ManagerHeader";
import ManagerStatsGrid from "@/components/manager/ManagerStatsGrid";
import TeamMatrix from "@/components/manager/TeamMatrix";
import SystemLog from "@/components/manager/SystemLog";
import ProductivityChart from "@/components/manager/ProductivityChart";

export default function ManagerPage() {
  return (
    <AppShell
      sideNavProps={{
        currentPath: "/lock-commits",
        statusNotification: {
          label: "Team Status",
          message:
            "All team members have submitted their initial DRAFTS.",
        },
      }}
    >
      <ManagerHeader />
      <ManagerStatsGrid />
      <TeamMatrix />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductivityChart />
        <SystemLog />
      </div>
    </AppShell>
  );
}

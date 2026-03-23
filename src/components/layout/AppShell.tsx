"use client";

import React from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Footer from "./Footer";
import AgentChat from "@/components/agent/AgentChat";

interface SideNavProps {
  currentPath: string;
  statusNotification?: {
    label: string;
    message: string;
  };
}

interface AppShellProps {
  children: React.ReactNode;
  sideNavProps: SideNavProps;
}

export default function AppShell({ children, sideNavProps }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopNav />
      <SideNav
        currentPath={sideNavProps.currentPath}
        statusNotification={sideNavProps.statusNotification}
      />
      <main className="pt-24 pb-20 px-6 md:mr-64 min-h-screen">
        {children}
      </main>
      <AgentChat />
      <Footer />
    </div>
  );
}

"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low border-t border-outline-variant px-6 py-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Left: Lambda + System Label */}
        <div className="flex items-center gap-3">
          <span className="text-terminal text-lg font-mono animate-pulse">
            &lambda;
          </span>
          <span className="font-mono text-xs text-terminal uppercase tracking-widest">
            ST6 TERMINAL SYSTEM v1.0
          </span>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="font-mono text-xs text-terminal uppercase tracking-widest border border-terminal px-4 py-1.5 hover:bg-terminal hover:text-background transition-colors">
            ACCEPT
          </button>
          <button className="font-mono text-xs text-terminal uppercase tracking-widest border border-terminal px-4 py-1.5 hover:bg-terminal hover:text-background transition-colors">
            DECLINE
          </button>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4">
          <a
            href="#gdpr"
            className="font-mono text-xs text-terminal uppercase tracking-widest hover:underline"
          >
            GDPR POLICY
          </a>
          <a
            href="#logs"
            className="font-mono text-xs text-terminal uppercase tracking-widest hover:underline"
          >
            SYSTEM LOGS
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";

export default function Footer() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("st6-gdpr-accepted");
    if (stored) setDismissed(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("st6-gdpr-accepted", "true");
    setDismissed(true);
  };

  const handleDecline = () => {
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[100] bg-surface-container-lowest border-t border-dashed border-surface-container-highest px-4 py-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Left: Lambda + System Label */}
        <div className="flex items-center gap-3">
          <span className="text-terminal text-sm font-mono animate-pulse">
            &lambda;
          </span>
          <span className="font-mono text-xs text-terminal uppercase tracking-widest">
            ST6 TERMINAL SYSTEM v1.0 |
          </span>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="font-mono text-xs text-terminal hover:bg-terminal hover:text-background transition-colors px-1"
          >
            [ ACCEPT ]
          </button>
          <button
            onClick={handleDecline}
            className="font-mono text-xs text-terminal hover:bg-terminal hover:text-background transition-colors px-1"
          >
            [ DECLINE ]
          </button>
          <span className="w-1.5 h-3 bg-terminal animate-blink ml-1" />
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#gdpr"
            className="font-mono text-[10px] text-terminal/70 uppercase tracking-widest hover:text-terminal hover:underline"
          >
            GDPR POLICY
          </a>
          <a
            href="#logs"
            className="font-mono text-[10px] text-terminal/70 uppercase tracking-widest hover:text-terminal hover:underline"
          >
            SYSTEM LOGS
          </a>
        </div>
      </div>
    </footer>
  );
}

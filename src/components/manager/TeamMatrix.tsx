"use client";

import React from "react";
import { TEAM_MEMBERS } from "@/lib/mock-data";

export default function TeamMatrix() {
  return (
    <div className="bg-surface-container border border-outline-variant mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
        <h2 className="font-headline text-lg font-bold text-on-surface tracking-tight">
          Team Commitment Matrix
        </h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="text-left px-6 py-3 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                Team Member
              </th>
              <th className="text-left px-6 py-3 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                Commitment Status
              </th>
              <th className="text-left px-6 py-3 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                RCDO Alignment
              </th>
              <th className="text-left px-6 py-3 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                Throughput
              </th>
              <th className="text-left px-6 py-3 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {TEAM_MEMBERS.map((member) => {
              const status = member.week?.status || "DRAFT";
              const isLocked = status === "LOCKED";

              return (
                <tr
                  key={member.profile.id}
                  className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors"
                >
                  {/* Team Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 bg-surface-container-highest border border-outline-variant text-on-surface font-label text-xs font-bold">
                        {member.profile.avatar_initials}
                      </div>
                      <div>
                        <p className="font-headline text-sm font-bold text-on-surface">
                          {member.profile.full_name}
                        </p>
                        <p className="font-label text-xs text-on-surface-variant">
                          {member.profile.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 font-label text-xs uppercase tracking-wider font-bold ${
                        isLocked
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-surface-container-highest text-on-surface-variant border border-outline-variant"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* RCDO Alignment */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[120px] bg-surface-container-highest h-2">
                        <div
                          className="h-full bg-tertiary transition-all"
                          style={{ width: `${member.rcdo_alignment}%` }}
                        />
                      </div>
                      <span className="font-label text-xs text-on-surface-variant min-w-[36px]">
                        {member.rcdo_alignment}%
                      </span>
                    </div>
                  </td>

                  {/* Throughput */}
                  <td className="px-6 py-4">
                    <span className="font-label text-sm text-on-surface font-bold">
                      {member.throughput.toFixed(1)}x
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-label text-xs text-tertiary uppercase tracking-wider hover:text-tertiary-fixed-dim transition-colors"
                    >
                      Drill Down &rarr;
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

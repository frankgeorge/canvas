"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, Search, GitBranch, Play, Pause, MoreHorizontal,
  Clock, Zap, Filter
} from "lucide-react";
import { WORKFLOWS } from "@/lib/data";
import { formatNumber, timeAgo, statusColor } from "@/lib/utils";
import DashboardLayout from "@/app/dashboard/layout";

const STATUS_FILTERS = ["all", "active", "paused", "draft", "error"] as const;

export default function WorkflowsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_FILTERS[number]>("all");

  const filtered = WORKFLOWS.filter(wf => {
    const matchSearch = wf.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || wf.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8 max-w-[1100px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#0D0D0B] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
              My Workflows
            </h1>
            <p className="text-sm text-[#4A4A45]">{WORKFLOWS.length} workflows in your workspace</p>
          </div>
          <Link href="/studio"
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <Plus size={14} /> New workflow
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A93]" />
            <input type="text" placeholder="Search workflows..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-[#EAE7DF] rounded-xl outline-none focus:border-[#D97706] transition placeholder:text-[#9A9A93]" />
          </div>
          <div className="flex items-center bg-[#F4F2EC] rounded-xl p-1 gap-1">
            {STATUS_FILTERS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === s ? "bg-white text-[#0D0D0B] shadow-sm" : "text-[#9A9A93]"
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Workflow cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <GitBranch size={36} className="text-[#D0CEC6] mx-auto mb-4" />
            <h3 className="font-semibold text-[#0D0D0B] mb-2">No workflows found</h3>
            <p className="text-sm text-[#9A9A93]">Try a different search or filter</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(wf => {
              const sc = statusColor[wf.status];
              return (
                <div key={wf.id}
                  className="bg-white border border-[#EAE7DF] rounded-2xl p-5 flex items-center gap-5 hover:shadow-card-hover transition-shadow group">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-[#F4F2EC] rounded-xl flex items-center justify-center flex-shrink-0">
                    <GitBranch size={16} className="text-[#4A4A45]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="font-semibold text-[#0D0D0B] text-sm">{wf.title}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                        style={{ color: sc.text, background: sc.bg }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
                        {wf.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#9A9A93] truncate">{wf.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-xs text-[#9A9A93] flex-shrink-0">
                    <div className="text-center">
                      <div className="font-semibold text-[#0D0D0B] text-sm">{formatNumber(wf.runCount || 0)}</div>
                      <div>runs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#0D0D0B] text-sm">
                        {wf.lastRunAt ? timeAgo(wf.lastRunAt) : "—"}
                      </div>
                      <div>last run</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/studio"
                      className="w-8 h-8 rounded-lg bg-[#F4F2EC] hover:bg-[#EAE7DF] flex items-center justify-center transition-colors">
                      <Zap size={13} className="text-[#4A4A45]" />
                    </Link>
                    <button className="w-8 h-8 rounded-lg bg-[#F4F2EC] hover:bg-[#EAE7DF] flex items-center justify-center transition-colors">
                      {wf.status === "active"
                        ? <Pause size={13} className="text-[#4A4A45]" />
                        : <Play size={13} className="text-[#4A4A45]" />
                      }
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#F4F2EC] hover:bg-[#EAE7DF] flex items-center justify-center transition-colors">
                      <MoreHorizontal size={13} className="text-[#4A4A45]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

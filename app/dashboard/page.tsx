"use client";

import Link from "next/link";
import {
  Zap, GitBranch, Play, Clock, TrendingUp,
  ArrowRight, ChevronRight, Plus, MoreHorizontal,
  CheckCircle2, AlertCircle, PauseCircle, FileEdit,
  Layers, Package, BarChart3
} from "lucide-react";
import { WORKFLOWS, PLAYBOOKS, CATEGORY_META } from "@/lib/data";
import { formatNumber, timeAgo, statusColor } from "@/lib/utils";

const METRICS = [
  { label: "Active workflows", value: "12", delta: "+3 this month", up: true, icon: GitBranch, color: "#2563EB" },
  { label: "Runs today", value: "847", delta: "+12% vs yesterday", up: true, icon: Play, color: "#D97706" },
  { label: "Avg run time", value: "3.2m", delta: "−0.4m optimised", up: true, icon: Clock, color: "#059669" },
  { label: "Time saved / week", value: "64h", delta: "across all agents", up: true, icon: TrendingUp, color: "#7C3AED" },
];

const RECENT_RUNS = [
  { id: "run_1", workflow: "Lead Enrichment Bot", status: "success", runtime: "3m 41s", at: "2 min ago" },
  { id: "run_2", workflow: "Blog Publisher v2", status: "success", runtime: "7m 12s", at: "38 min ago" },
  { id: "run_3", workflow: "CV Screener — Senior Eng", status: "error", runtime: "0m 12s", at: "1h ago" },
  { id: "run_4", workflow: "Lead Enrichment Bot", status: "success", runtime: "3m 54s", at: "2h ago" },
  { id: "run_5", workflow: "Blog Publisher v2", status: "success", runtime: "8m 01s", at: "4h ago" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "active") return <CheckCircle2 size={14} className="text-[#10B981]" />;
  if (status === "paused") return <PauseCircle size={14} className="text-[#F59E0B]" />;
  if (status === "draft") return <FileEdit size={14} className="text-[#9CA3AF]" />;
  if (status === "error") return <AlertCircle size={14} className="text-[#EF4444]" />;
  return null;
}

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D0D0B] mb-1"
          style={{ fontFamily: "'Fraunces', serif" }}>
          Good morning, Jane ☀️
        </h1>
        <p className="text-sm text-[#4A4A45]">
          Your agents ran <strong className="text-[#0D0D0B]">847 times</strong> today and saved an estimated <strong className="text-[#D97706]">9.4 hours</strong>.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-white border border-[#EAE7DF] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[#9A9A93]">{m.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: m.color + "15" }}>
                <m.icon size={14} style={{ color: m.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#0D0D0B] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}>{m.value}</div>
            <div className="text-xs text-[#059669] font-medium">{m.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Workflows */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#EAE7DF] rounded-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE7DF]">
              <h2 className="font-semibold text-[#0D0D0B] text-sm">My Workflows</h2>
              <div className="flex items-center gap-2">
                <Link href="/studio"
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#D97706] px-3 py-1.5 rounded-lg hover:bg-[#B45309] transition-colors">
                  <Plus size={11} /> New
                </Link>
                <Link href="/dashboard/workflows"
                  className="text-xs text-[#9A9A93] hover:text-[#0D0D0B] transition-colors flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-[#F4F2EC]">
              {WORKFLOWS.map((wf) => {
                const sc = statusColor[wf.status];
                return (
                  <div key={wf.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAF8] transition-colors group">
                    <div className="w-8 h-8 bg-[#F4F2EC] rounded-xl flex items-center justify-center flex-shrink-0">
                      <GitBranch size={14} className="text-[#4A4A45]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-[#0D0D0B] truncate">{wf.title}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ color: sc.text, background: sc.bg }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
                          {wf.status}
                        </span>
                      </div>
                      <span className="text-xs text-[#9A9A93]">{wf.description}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-medium text-[#0D0D0B]">{formatNumber(wf.runCount || 0)} runs</div>
                      <div className="text-[10px] text-[#9A9A93]">
                        {wf.lastRunAt ? timeAgo(wf.lastRunAt) : "Never run"}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg hover:bg-[#F4F2EC] flex items-center justify-center">
                      <MoreHorizontal size={14} className="text-[#9A9A93]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent runs */}
          <div className="bg-white border border-[#EAE7DF] rounded-2xl mt-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE7DF]">
              <h2 className="font-semibold text-[#0D0D0B] text-sm">Recent Runs</h2>
              <Link href="/dashboard/runs"
                className="text-xs text-[#9A9A93] hover:text-[#0D0D0B] transition-colors flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-[#F4F2EC]">
              {RECENT_RUNS.map((run) => (
                <div key={run.id} className="flex items-center gap-4 px-6 py-3.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${run.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
                  <span className="text-sm text-[#0D0D0B] flex-1">{run.workflow}</span>
                  <span className="text-xs text-[#9A9A93] font-mono">{run.runtime}</span>
                  <span className="text-xs text-[#9A9A93]">{run.at}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white border border-[#EAE7DF] rounded-2xl p-5">
            <h2 className="font-semibold text-[#0D0D0B] text-sm mb-4">Quick actions</h2>
            <div className="space-y-2">
              {[
                { label: "Build from scratch", sub: "Open blank Studio canvas", href: "/studio", icon: Layers, color: "#2563EB" },
                { label: "Browse Marketplace", sub: "340+ expert playbooks", href: "/marketplace", icon: Package, color: "#D97706" },
                { label: "View analytics", sub: "Runs, latency & costs", href: "/dashboard/analytics", icon: BarChart3, color: "#7C3AED" },
              ].map((a) => (
                <Link key={a.label} href={a.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4F2EC] transition-colors group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: a.color + "15" }}>
                    <a.icon size={14} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#0D0D0B]">{a.label}</div>
                    <div className="text-[10px] text-[#9A9A93]">{a.sub}</div>
                  </div>
                  <ArrowRight size={12} className="text-[#D0CEC6] group-hover:text-[#D97706] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended playbooks */}
          <div className="bg-white border border-[#EAE7DF] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#0D0D0B] text-sm">Recommended</h2>
              <Link href="/marketplace" className="text-[10px] text-[#D97706] font-semibold hover:underline">
                Browse all
              </Link>
            </div>
            <div className="space-y-3">
              {PLAYBOOKS.slice(0, 3).map((pb) => {
                const cat = CATEGORY_META[pb.category];
                return (
                  <Link key={pb.id} href={`/playbook/${pb.slug}`}
                    className="block p-3 rounded-xl border border-[#F4F2EC] hover:border-[#D97706]/30 hover:bg-[#FEFDF9] transition-all group">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ color: cat.color, background: cat.bg }}>
                        {cat.label}
                      </span>
                      {pb.isPremium && (
                        <span className="text-[10px] font-bold text-[#7C3AED]">PRO</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-[#0D0D0B] mb-1 group-hover:text-[#D97706] transition-colors">
                      {pb.title}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#9A9A93]">
                      <span>{pb.agentCount} agents</span>
                      <span className="text-[#059669] font-medium">{pb.timeSaved}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Usage meter */}
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#D97706]" />
              <span className="text-xs font-semibold text-[#92400E]">Agent runs this month</span>
            </div>
            <div className="text-2xl font-bold text-[#92400E] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}>4,821</div>
            <div className="text-[10px] text-[#B45309] mb-3">of 10,000 included</div>
            <div className="bg-[#FDE68A] rounded-full h-1.5">
              <div className="bg-[#D97706] h-1.5 rounded-full" style={{ width: "48%" }} />
            </div>
            <p className="text-[10px] text-[#B45309] mt-2">48% used — resets Mar 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

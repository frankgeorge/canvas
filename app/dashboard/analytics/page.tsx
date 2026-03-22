"use client";

import { useState } from "react";
import {
  BarChart3, TrendingUp, Clock, Zap, DollarSign,
  AlertCircle, CheckCircle2, Activity
} from "lucide-react";
import DashboardLayout from "@/app/dashboard/layout";

const PERIODS = ["7d", "30d", "90d"] as const;

// Fake chart data
const DAILY_RUNS = [
  { day: "Mon", runs: 312, success: 298, error: 14 },
  { day: "Tue", runs: 445, success: 430, error: 15 },
  { day: "Wed", runs: 389, success: 375, error: 14 },
  { day: "Thu", runs: 512, success: 499, error: 13 },
  { day: "Fri", runs: 621, success: 608, error: 13 },
  { day: "Sat", runs: 203, success: 197, error: 6 },
  { day: "Sun", runs: 178, success: 175, error: 3 },
];
const maxRuns = Math.max(...DAILY_RUNS.map(d => d.runs));

const TOP_WORKFLOWS = [
  { name: "Lead Enrichment Bot", runs: 1204, successRate: 98.2, avgMs: 221000, cost: 12.40 },
  { name: "Blog Publisher v2", runs: 847, successRate: 96.8, avgMs: 480000, cost: 31.20 },
  { name: "CV Screener", runs: 531, successRate: 99.1, avgMs: 62000, cost: 4.80 },
  { name: "Customer Health Monitor", runs: 290, successRate: 97.6, avgMs: 340000, cost: 9.10 },
];

function msToTime(ms: number): string {
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return m > 0 ? `${m}m ${rem}s` : `${rem}s`;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<typeof PERIODS[number]>("7d");

  return (
    <DashboardLayout>
      <div className="p-8 max-w-[1200px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#0D0D0B] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Analytics
            </h1>
            <p className="text-sm text-[#4A4A45]">Workflow performance, run health and cost tracking.</p>
          </div>
          <div className="flex items-center bg-[#F4F2EC] rounded-xl p-1 gap-1">
            {PERIODS.map(p => (
              <button key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === p ? "bg-white text-[#0D0D0B] shadow-sm" : "text-[#9A9A93] hover:text-[#4A4A45]"
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total runs", value: "2,660", sub: "+18% vs prev period", icon: Activity, color: "#2563EB", up: true },
            { label: "Success rate", value: "98.1%", sub: "+0.3% improvement", icon: CheckCircle2, color: "#059669", up: true },
            { label: "Avg runtime", value: "3m 14s", sub: "−22s vs prev period", icon: Clock, color: "#D97706", up: true },
            { label: "Est. cost", value: "$57.50", sub: "$0.022 per run avg", icon: DollarSign, color: "#7C3AED", up: false },
          ].map(m => (
            <div key={m.label} className="bg-white border border-[#EAE7DF] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#9A9A93]">{m.label}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: m.color + "15" }}>
                  <m.icon size={14} style={{ color: m.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#0D0D0B] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                {m.value}
              </div>
              <div className={`text-xs font-medium ${m.up ? "text-[#059669]" : "text-[#9A9A93]"}`}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Run volume chart */}
        <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#0D0D0B]">Daily run volume</h2>
            <div className="flex items-center gap-4 text-xs text-[#9A9A93]">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#D97706]" /> Successful
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#FEE2E2]" /> Failed
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {DAILY_RUNS.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: "120px" }}>
                  <div className="w-full rounded-t-sm bg-[#D97706]"
                    style={{ height: `${(d.success / maxRuns) * 100}%` }} />
                  <div className="w-full rounded-t-sm bg-[#FEE2E2]"
                    style={{ height: `${(d.error / maxRuns) * 100}%` }} />
                </div>
                <span className="text-[10px] text-[#9A9A93] font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top workflows table */}
        <div className="bg-white border border-[#EAE7DF] rounded-2xl">
          <div className="px-6 py-4 border-b border-[#EAE7DF]">
            <h2 className="font-semibold text-[#0D0D0B]">Top workflows</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F4F2EC]">
                  {["Workflow", "Runs", "Success rate", "Avg runtime", "Est. cost"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#9A9A93]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F2EC]">
                {TOP_WORKFLOWS.map(wf => (
                  <tr key={wf.name} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#0D0D0B]">{wf.name}</td>
                    <td className="px-6 py-4 text-sm text-[#4A4A45]">{wf.runs.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#F4F2EC] rounded-full h-1.5 max-w-20">
                          <div className="h-1.5 rounded-full bg-[#059669]"
                            style={{ width: `${wf.successRate}%` }} />
                        </div>
                        <span className="text-xs font-medium text-[#059669]">{wf.successRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4A4A45] font-mono">{msToTime(wf.avgMs)}</td>
                    <td className="px-6 py-4 text-sm text-[#4A4A45] font-mono">${wf.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

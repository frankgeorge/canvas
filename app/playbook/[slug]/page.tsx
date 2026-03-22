"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Star, Users, Layers, Clock, CheckCircle2,
  Play, GitBranch, Zap, Globe, Shield, ChevronRight
} from "lucide-react";
import { PLAYBOOKS, CATEGORY_META } from "@/lib/data";
import { formatNumber, formatDate } from "@/lib/utils";
import AppSidebar from "@/components/layout/AppSidebar";

const complexityBadge = {
  starter: { text: "#059669", bg: "#ECFDF5" },
  standard: { text: "#D97706", bg: "#FEF3C7" },
  advanced: { text: "#DC2626", bg: "#FEF2F2" },
};

export default function PlaybookPage({ params }: { params: { slug: string } }) {
  const pb = PLAYBOOKS.find(p => p.slug === params.slug);
  if (!pb) notFound();

  const cat = CATEGORY_META[pb.category];
  const cx = complexityBadge[pb.complexity];

  // Fake workflow preview nodes
  const previewNodes = [
    { id: "trigger", type: "trigger", label: "Trigger", sub: "Event starts workflow", color: "#2563EB" },
    ...(pb.nodes || []).slice(0, 3).map((n, i) => ({
      id: n.id, type: n.type, label: n.label, sub: n.description || "", color: "#D97706"
    })),
    ...Array.from({ length: Math.max(0, Math.min(pb.agentCount, 4) - (pb.nodes || []).length) }, (_, i) => ({
      id: `agent_${i}`, type: "agent", label: `Agent ${i + 2}`, sub: "AI processing step", color: "#D97706"
    })),
    { id: "output", type: "output", label: "Output", sub: "Result delivered", color: "#059669" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AppSidebar />
      <main className="flex-1 ml-60">
        {/* Breadcrumb */}
        <div className="border-b border-[#EAE7DF] px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-[#9A9A93]">
            <Link href="/marketplace" className="hover:text-[#0D0D0B] flex items-center gap-1 transition-colors">
              <ArrowLeft size={12} /> Marketplace
            </Link>
            <ChevronRight size={12} />
            <span style={{ color: cat.color }}>{cat.label}</span>
            <ChevronRight size={12} />
            <span className="text-[#0D0D0B] font-medium truncate max-w-64">{pb.title}</span>
          </nav>
        </div>

        <div className="px-8 py-8 max-w-5xl">
          {/* Hero section */}
          <div className="bg-white border border-[#EAE7DF] rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide"
                    style={{ color: cat.color, background: cat.bg }}>
                    {cat.label}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ color: cx.text, background: cx.bg }}>
                    {pb.complexity}
                  </span>
                  {pb.isPremium && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#7C3AED] bg-[#F5F3FF]">
                      Premium
                    </span>
                  )}
                  {pb.featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#D97706] bg-[#FEF3C7]">
                      <Zap size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-semibold text-[#0D0D0B] mb-3 leading-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}>
                  {pb.title}
                </h1>
                <p className="text-[#4A4A45] leading-relaxed mb-5">{pb.description}</p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Layers, label: `${pb.agentCount} agents` },
                    { icon: Clock, label: pb.avgRuntime },
                    { icon: CheckCircle2, label: pb.timeSaved, green: true },
                    { icon: Play, label: `${formatNumber(pb.runCount)} runs` },
                    { icon: Star, label: `${formatNumber(pb.starCount)} stars` },
                    { icon: Users, label: `${formatNumber(pb.cloneCount)} clones` },
                  ].map(({ icon: Icon, label, green }) => (
                    <div key={label}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-[#F4F2EC] rounded-lg"
                      style={green ? { color: "#059669", background: "#ECFDF5" } : {}}>
                      <Icon size={12} className={green ? "text-[#059669]" : "text-[#9A9A93]"} />
                      <span className={`font-medium ${green ? "text-[#059669]" : "text-[#4A4A45]"}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action panel */}
              <div className="flex-shrink-0 w-64 bg-[#FAFAF8] border border-[#EAE7DF] rounded-xl p-5">
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#9A9A93] mb-1">By</div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D97706] to-[#92400E] flex items-center justify-center text-white text-xs font-bold">
                      {pb.author.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0D0D0B] flex items-center gap-1">
                        {pb.author.name}
                        {pb.author.verified && <CheckCircle2 size={10} className="text-[#2563EB]" fill="#2563EB" />}
                      </div>
                      {pb.author.org && <div className="text-[10px] text-[#9A9A93]">{pb.author.org}</div>}
                    </div>
                  </div>
                </div>

                <Link href="/studio"
                  className="w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-sm py-3 rounded-xl transition-colors mb-2">
                  <Play size={14} /> Deploy now
                </Link>
                <Link href="/studio"
                  className="w-full flex items-center justify-center gap-2 bg-white border border-[#EAE7DF] hover:bg-[#F4F2EC] text-[#0D0D0B] font-semibold text-sm py-3 rounded-xl transition-colors mb-4">
                  <GitBranch size={14} /> Clone to Studio
                </Link>

                <div className="text-[10px] text-[#9A9A93] space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Globe size={10} />
                    Updated {formatDate(pb.updatedAt)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield size={10} />
                    Reviewed by safyr team
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow preview */}
          <div className="bg-white border border-[#EAE7DF] rounded-2xl p-8 mb-6">
            <h2 className="font-semibold text-[#0D0D0B] mb-6">Workflow preview</h2>
            <div className="bg-[#F4F2EC] rounded-xl p-6 overflow-x-auto">
              <div className="flex items-center gap-4 min-w-max">
                {previewNodes.map((node, i) => (
                  <div key={node.id} className="flex items-center gap-4">
                    <div className="bg-white border-2 rounded-xl p-4 w-40 shadow-sm"
                      style={{ borderColor: node.color + "40" }}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: node.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-wide"
                          style={{ color: node.color }}>
                          {node.type}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#0D0D0B]">{node.label}</div>
                      <div className="text-[10px] text-[#9A9A93] mt-0.5 leading-tight">{node.sub}</div>
                    </div>
                    {i < previewNodes.length - 1 && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-6 h-px bg-[#D0CEC6]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <div className="w-6 h-px bg-[#D0CEC6]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-[#9A9A93] mt-3">
              {pb.agentCount} agents · {pb.stepCount} steps · Avg runtime {pb.avgRuntime}
            </p>
          </div>

          {/* Two-col detail */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Outcomes */}
            {pb.outcomes && (
              <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6">
                <h2 className="font-semibold text-[#0D0D0B] mb-4">What you get</h2>
                <ul className="space-y-3">
                  {pb.outcomes.map(o => (
                    <li key={o} className="flex items-start gap-2.5 text-sm text-[#4A4A45]">
                      <CheckCircle2 size={14} className="text-[#059669] flex-shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Integrations + Tags */}
            <div className="space-y-5">
              {pb.requiredIntegrations && (
                <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6">
                  <h2 className="font-semibold text-[#0D0D0B] mb-4">Required integrations</h2>
                  <div className="flex flex-wrap gap-2">
                    {pb.requiredIntegrations.map(ri => (
                      <span key={ri} className="flex items-center gap-1.5 bg-[#F4F2EC] text-[#4A4A45] text-xs font-medium px-3 py-1.5 rounded-lg">
                        <Globe size={10} /> {ri}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6">
                <h2 className="font-semibold text-[#0D0D0B] mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {pb.tags.map(tag => (
                    <span key={tag} className="bg-[#F4F2EC] text-[#4A4A45] text-xs px-3 py-1.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0D0D0B] rounded-2xl p-8 mt-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                Ready to deploy {pb.title}?
              </h3>
              <p className="text-sm text-white/60">Connect your integrations and you're live in minutes.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/studio"
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
                <GitBranch size={14} /> Clone
              </Link>
              <Link href="/studio"
                className="bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
                <Play size={14} /> Deploy now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Star, Users, Layers, Clock, CheckCircle2,
  Filter, ArrowUpDown, Package, Zap
} from "lucide-react";
import { PLAYBOOKS, CATEGORY_META } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import type { PlaybookCategory, PlaybookComplexity } from "@/types";
import AppSidebar from "@/components/layout/AppSidebar";

const CATEGORIES: { value: PlaybookCategory | "all"; label: string }[] = [
  { value: "all", label: "All categories" },
  { value: "revenue-ops", label: "Revenue Ops" },
  { value: "legal", label: "Legal" },
  { value: "hr-ops", label: "HR Ops" },
  { value: "customer-success", label: "Customer Success" },
  { value: "finance", label: "Finance" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "data-ops", label: "Data Ops" },
];

const COMPLEXITY: { value: PlaybookComplexity | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "starter", label: "Starter" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "recent", label: "Most recent" },
  { value: "runs", label: "Most runs" },
  { value: "stars", label: "Most starred" },
];

const complexityBadge = {
  starter: { text: "#059669", bg: "#ECFDF5" },
  standard: { text: "#D97706", bg: "#FEF3C7" },
  advanced: { text: "#DC2626", bg: "#FEF2F2" },
};

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlaybookCategory | "all">("all");
  const [complexity, setComplexity] = useState<PlaybookComplexity | "all">("all");
  const [sort, setSort] = useState("popular");
  const [onlyFree, setOnlyFree] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PLAYBOOKS];
    if (search) list = list.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (category !== "all") list = list.filter(p => p.category === category);
    if (complexity !== "all") list = list.filter(p => p.complexity === complexity);
    if (onlyFree) list = list.filter(p => !p.isPremium);

    list.sort((a, b) => {
      if (sort === "stars") return b.starCount - a.starCount;
      if (sort === "runs") return b.runCount - a.runCount;
      if (sort === "recent") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return b.cloneCount - a.cloneCount;
    });
    return list;
  }, [search, category, complexity, sort, onlyFree]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AppSidebar />
      <main className="flex-1 ml-60 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#EAE7DF]">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-2xl font-semibold text-[#0D0D0B]"
                  style={{ fontFamily: "'Fraunces', serif" }}>
                  Playbook Marketplace
                </h1>
                <p className="text-sm text-[#4A4A45] mt-0.5">
                  {PLAYBOOKS.length} expert-built workflows. Deploy instantly, configure freely.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2.5">
                <Zap size={13} className="text-[#D97706]" />
                <span className="text-xs font-semibold text-[#92400E]">+12 new this week</span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-64 max-w-sm">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9A93]" />
                <input
                  type="text"
                  placeholder="Search playbooks..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white border border-[#EAE7DF] rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10 transition placeholder:text-[#9A9A93]"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A93]" />
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as PlaybookCategory | "all")}
                  className="bg-white border border-[#EAE7DF] rounded-xl pl-8 pr-8 py-2.5 text-sm outline-none focus:border-[#D97706] appearance-none cursor-pointer text-[#4A4A45]"
                >
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* Complexity */}
              <select
                value={complexity}
                onChange={e => setComplexity(e.target.value as PlaybookComplexity | "all")}
                className="bg-white border border-[#EAE7DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D97706] appearance-none cursor-pointer text-[#4A4A45]"
              >
                {COMPLEXITY.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>

              {/* Sort */}
              <div className="relative">
                <ArrowUpDown size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A93]" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-white border border-[#EAE7DF] rounded-xl pl-8 pr-8 py-2.5 text-sm outline-none focus:border-[#D97706] appearance-none cursor-pointer text-[#4A4A45]"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Free only toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setOnlyFree(!onlyFree)}
                  className={`w-8 h-4.5 rounded-full relative transition-colors cursor-pointer ${onlyFree ? "bg-[#D97706]" : "bg-[#EAE7DF]"}`}
                  style={{ height: "18px", width: "32px" }}
                >
                  <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${onlyFree ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs font-medium text-[#4A4A45]">Free only</span>
              </label>

              <div className="ml-auto text-xs text-[#9A9A93]">
                {filtered.length} playbooks
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="px-8 py-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package size={40} className="text-[#D0CEC6] mb-4" />
              <h3 className="text-lg font-semibold text-[#0D0D0B] mb-2">No playbooks found</h3>
              <p className="text-sm text-[#9A9A93]">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((pb, i) => {
                const cat = CATEGORY_META[pb.category];
                const cx = complexityBadge[pb.complexity];
                return (
                  <Link
                    key={pb.id}
                    href={`/playbook/${pb.slug}`}
                    className="group bg-white border border-[#EAE7DF] rounded-2xl p-6 hover:shadow-[0_4px_20px_rgba(13,13,11,0.08)] hover:border-[#D97706]/30 transition-all"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
                          style={{ color: cat.color, background: cat.bg }}>
                          {cat.label}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold"
                          style={{ color: cx.text, background: cx.bg }}>
                          {pb.complexity}
                        </span>
                      </div>
                      {pb.isPremium && (
                        <span className="text-[10px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded-md">
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Title + desc */}
                    <h3 className="font-semibold text-[#0D0D0B] mb-2 group-hover:text-[#D97706] transition-colors leading-snug">
                      {pb.title}
                    </h3>
                    <p className="text-xs text-[#4A4A45] leading-relaxed mb-4 line-clamp-3">
                      {pb.description}
                    </p>

                    {/* Key metrics */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#9A9A93]">
                      <span className="flex items-center gap-1">
                        <Layers size={11} />
                        {pb.agentCount} agents
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {pb.avgRuntime}
                      </span>
                      <span className="flex items-center gap-1 text-[#059669] font-semibold">
                        <CheckCircle2 size={11} />
                        {pb.timeSaved}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pb.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-[#F4F2EC] text-[#9A9A93] px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                      {pb.tags.length > 3 && (
                        <span className="text-[10px] text-[#9A9A93]">+{pb.tags.length - 3}</span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC]">
                      <div className="flex items-center gap-3 text-xs text-[#9A9A93]">
                        <span className="flex items-center gap-1">
                          <Star size={10} fill="currentColor" />
                          {formatNumber(pb.starCount)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={10} />
                          {formatNumber(pb.cloneCount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {pb.author.verified && (
                          <CheckCircle2 size={10} className="text-[#2563EB]" fill="#2563EB" />
                        )}
                        <span className="text-[10px] font-medium text-[#4A4A45]">{pb.author.name}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

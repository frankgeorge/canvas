"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, Zap, GitBranch, Package, Star, Users,
  ChevronRight, CheckCircle2, Play, Layers, Cpu,
  BarChart3, Globe, Shield, Clock
} from "lucide-react";
import { FEATURED_PLAYBOOKS, CATEGORY_META } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const STATS = [
  { value: "12,400+", label: "Workflows deployed" },
  { value: "340+", label: "Expert playbooks" },
  { value: "4.2M+", label: "Agent runs / month" },
  { value: "94%", label: "Avg time saved" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the Marketplace",
    desc: "Discover expert-built, battle-tested playbooks for your exact use case. Filter by industry, complexity, or outcome.",
    icon: Package,
  },
  {
    step: "02",
    title: "Deploy or Clone",
    desc: "Run a playbook instantly with your own integrations, or clone it into Studio to customise every node and prompt.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Ship to Production",
    desc: "One click deploys your workflow. Monitor runs, inspect logs, and iterate — no infrastructure to manage.",
    icon: Zap,
  },
];

const FEATURES = [
  {
    icon: Cpu,
    title: "Visual Agent Studio",
    desc: "Drag-and-drop canvas to compose multi-agent workflows. Connect models, tools, memory, and logic without boilerplate.",
    tag: "Studio",
    tagColor: "#2563EB",
  },
  {
    icon: Package,
    title: "Playbook Marketplace",
    desc: "340+ curated, end-to-end workflows from Anthropic partners and community experts. Deploy in seconds.",
    tag: "Marketplace",
    tagColor: "#059669",
  },
  {
    icon: BarChart3,
    title: "Run Analytics",
    desc: "Inspect every agent call, token usage, latency and output. Debug fast, optimise continuously.",
    tag: "Observability",
    tagColor: "#D97706",
  },
  {
    icon: Globe,
    title: "Any Integration",
    desc: "300+ pre-built connectors — CRMs, ticketing, databases, APIs. If it has an API, safyr can talk to it.",
    tag: "Integrations",
    tagColor: "#7C3AED",
  },
  {
    icon: Shield,
    title: "Enterprise Grade",
    desc: "SOC 2 Type II, GDPR compliant. SSO, audit logs, role-based permissions, and private deployment options.",
    tag: "Security",
    tagColor: "#DC2626",
  },
  {
    icon: Clock,
    title: "Instant Deployment",
    desc: "From canvas to production in one click. Versioned, rollback-capable, with zero downtime deployments.",
    tag: "DevOps",
    tagColor: "#0891B2",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "For individuals exploring AI automation",
    features: [
      "5 active workflows",
      "100 agent runs / month",
      "Access to free playbooks",
      "Community support",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$79",
    period: "per month",
    desc: "For teams moving fast",
    features: [
      "Unlimited workflows",
      "10,000 agent runs / month",
      "Full Marketplace access",
      "Priority support",
      "Team collaboration",
      "Run analytics",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organisations with scale and compliance needs",
    features: [
      "Unlimited runs",
      "Private deployment",
      "SSO + audit logs",
      "SLA guarantee",
      "Dedicated success manager",
      "Custom playbook development",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function LandingPage() {
  const [emailInput, setEmailInput] = useState("");

  return (
    <div className="min-h-screen bg-[#FAFAF8]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#EAE7DF]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0D0D0B] rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L7 2L12 12M4.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[#0D0D0B] text-lg tracking-tight">safyr</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href}
                className="text-sm text-[#4A4A45] hover:text-[#0D0D0B] transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard"
              className="text-sm font-medium text-[#4A4A45] hover:text-[#0D0D0B] transition-colors">
              Sign in
            </Link>
            <Link href="/dashboard"
              className="bg-[#0D0D0B] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#2A2A28] transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-40 pb-28 px-6 max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border border-[#FDE68A] rounded-full px-4 py-1.5">
            <Zap size={12} className="text-[#D97706]" fill="#D97706" />
            <span className="text-xs font-semibold text-[#92400E] tracking-wide uppercase">Now in public beta — 340 playbooks live</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center max-w-4xl mx-auto leading-[1.08] tracking-tight mb-8"
          style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 400 }}>
          The{" "}
          <em style={{ fontStyle: "italic", color: "#D97706" }}>operating system</em>
          <br />
          for AI workflows.
        </h1>

        <p className="text-center text-[#4A4A45] max-w-2xl mx-auto text-xl leading-relaxed mb-12">
          Build, deploy, and discover multi-agent workflows that create real outcomes.
          Visual Studio + expert Marketplace + instant deployment — no boilerplate required.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <div className="flex items-center bg-white border border-[#EAE7DF] rounded-xl shadow-sm overflow-hidden w-full max-w-md">
            <input
              type="email"
              placeholder="your@company.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-5 py-3.5 text-sm bg-transparent outline-none placeholder:text-[#9A9A93]"
            />
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold px-5 py-3.5 transition-colors whitespace-nowrap flex items-center gap-2">
              Start free <ArrowRight size={14} />
            </button>
          </div>
          <Link href="/marketplace"
            className="flex items-center gap-2 text-sm font-medium text-[#4A4A45] hover:text-[#0D0D0B] transition-colors whitespace-nowrap">
            <Play size={14} className="text-[#D97706]" fill="#D97706" />
            Browse playbooks
          </Link>
        </div>

        {/* Hero graphic */}
        <div className="relative mx-auto max-w-5xl">
          <div className="bg-white border border-[#EAE7DF] rounded-2xl shadow-[0_8px_48px_rgba(13,13,11,0.08)] overflow-hidden">
            {/* Fake chrome bar */}
            <div className="bg-[#F4F2EC] border-b border-[#EAE7DF] px-5 py-3.5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EAE7DF]" />
              <div className="w-3 h-3 rounded-full bg-[#EAE7DF]" />
              <div className="w-3 h-3 rounded-full bg-[#EAE7DF]" />
              <div className="flex-1 bg-[#EAE7DF] rounded-md h-6 ml-4 max-w-xs flex items-center px-3">
                <span className="text-xs text-[#9A9A93]">safyr.ai/studio</span>
              </div>
            </div>
            {/* Studio preview */}
            <div className="h-96 bg-[#F4F2EC] relative overflow-hidden flex items-center justify-center">
              {/* Background grid */}
              <div className="absolute inset-0 opacity-40"
                style={{ backgroundImage: "radial-gradient(circle, #D0CEC6 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

              {/* Flow nodes */}
              <div className="relative flex items-center gap-6 px-8">
                {[
                  { label: "Trigger", sub: "New Salesforce Lead", color: "#2563EB", icon: "⚡" },
                  { label: "Enrichment Agent", sub: "LinkedIn + Web", color: "#D97706", icon: "🤖" },
                  { label: "ICP Scorer", sub: "GPT-4o scorer", color: "#D97706", icon: "🤖" },
                  { label: "Email Drafter", sub: "Personalised copy", color: "#D97706", icon: "🤖" },
                  { label: "CRM Update", sub: "Write to Salesforce", color: "#059669", icon: "✓" },
                ].map((node, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="bg-white border-2 rounded-xl p-4 w-44 shadow-card" style={{ borderColor: node.color + "30" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{node.icon}</span>
                        <span className="text-xs font-semibold text-[#0D0D0B]">{node.label}</span>
                      </div>
                      <span className="text-[11px] text-[#9A9A93]">{node.sub}</span>
                      <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: node.color + "20" }}>
                        <div className="h-1 rounded-full w-2/3" style={{ backgroundColor: node.color }} />
                      </div>
                    </div>
                    {i < 4 && (
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-px bg-[#D97706]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Running indicator */}
              <div className="absolute bottom-6 right-6 bg-white border border-[#EAE7DF] rounded-lg px-3 py-2 flex items-center gap-2 shadow-card">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-medium text-[#0D0D0B]">Running · 3 active agents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-[#EAE7DF] bg-[#F4F2EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-[#0D0D0B] mb-1"
                  style={{ fontFamily: "'Fraunces', serif" }}>{s.value}</div>
                <div className="text-sm text-[#4A4A45]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="product" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">How it works</p>
          <h2 className="text-4xl font-normal text-[#0D0D0B] leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}>
            From idea to<br />
            <em style={{ fontStyle: "italic" }}>production workflow</em><br />
            in under 10 minutes.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="bg-white border border-[#EAE7DF] rounded-2xl p-8 hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="text-5xl font-light text-[#EAE7DF]" style={{ fontFamily: "'Fraunces', serif" }}>
                  {item.step}
                </span>
                <div className="w-11 h-11 bg-[#FEF3C7] rounded-xl flex items-center justify-center">
                  <item.icon size={20} className="text-[#D97706]" />
                </div>
              </div>
              <h3 className="font-semibold text-[#0D0D0B] text-lg mb-3">{item.title}</h3>
              <p className="text-[#4A4A45] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Playbooks ── */}
      <section className="py-28 px-6 bg-[#F4F2EC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">Marketplace</p>
              <h2 className="text-4xl font-normal text-[#0D0D0B]" style={{ fontFamily: "'Fraunces', serif" }}>
                Featured playbooks
              </h2>
            </div>
            <Link href="/marketplace"
              className="flex items-center gap-2 text-sm font-semibold text-[#0D0D0B] hover:text-[#D97706] transition-colors">
              View all 340+ <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PLAYBOOKS.slice(0, 6).map((pb) => {
              const cat = CATEGORY_META[pb.category];
              return (
                <Link key={pb.id} href={`/playbook/${pb.slug}`}
                  className="group bg-white border border-[#EAE7DF] rounded-2xl p-6 hover:shadow-card-hover hover:border-[#D97706]/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
                      style={{ color: cat.color, background: cat.bg }}>
                      {cat.label}
                    </span>
                    {pb.isPremium && (
                      <span className="text-xs font-semibold text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#0D0D0B] mb-2 group-hover:text-[#D97706] transition-colors">
                    {pb.title}
                  </h3>
                  <p className="text-sm text-[#4A4A45] leading-relaxed mb-4 line-clamp-2">{pb.description}</p>

                  <div className="flex items-center gap-4 text-xs text-[#9A9A93] mb-4">
                    <span className="flex items-center gap-1"><Layers size={11} /> {pb.agentCount} agents</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {pb.avgRuntime}</span>
                    <span className="flex items-center gap-1 text-[#059669] font-medium">
                      <CheckCircle2 size={11} /> {pb.timeSaved}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#EAE7DF]">
                    <div className="flex items-center gap-3 text-xs text-[#9A9A93]">
                      <span className="flex items-center gap-1"><Star size={11} /> {formatNumber(pb.starCount)}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {formatNumber(pb.cloneCount)} clones</span>
                    </div>
                    <span className="text-xs font-medium text-[#D97706]">{pb.author.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">Platform</p>
          <h2 className="text-4xl font-normal text-[#0D0D0B]" style={{ fontFamily: "'Fraunces', serif" }}>
            Everything you need to<br />
            <em style={{ fontStyle: "italic" }}>ship AI that works</em>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 border border-[#EAE7DF] rounded-2xl hover:shadow-card-hover bg-white transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#F4F2EC] rounded-xl flex items-center justify-center">
                  <f.icon size={18} className="text-[#0D0D0B]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ color: f.tagColor, background: f.tagColor + "15" }}>
                  {f.tag}
                </span>
              </div>
              <h3 className="font-semibold text-[#0D0D0B] mb-2">{f.title}</h3>
              <p className="text-sm text-[#4A4A45] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-28 px-6 bg-[#F4F2EC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">Pricing</p>
            <h2 className="text-4xl font-normal text-[#0D0D0B]" style={{ fontFamily: "'Fraunces', serif" }}>
              Start free. Scale when<br />
              <em style={{ fontStyle: "italic" }}>the value is obvious</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <div key={plan.name}
                className={`rounded-2xl p-8 ${plan.highlight
                  ? "bg-[#0D0D0B] text-white border-2 border-[#D97706] shadow-[0_8px_32px_rgba(13,13,11,0.2)]"
                  : "bg-white border border-[#EAE7DF]"}`}>
                <div className="mb-6">
                  <h3 className={`font-semibold mb-1 ${plan.highlight ? "text-white" : "text-[#0D0D0B]"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                      {plan.price}
                    </span>
                    {plan.period && <span className={`text-sm ${plan.highlight ? "text-white/60" : "text-[#9A9A93]"}`}>
                      /{plan.period}
                    </span>}
                  </div>
                  <p className={`text-sm ${plan.highlight ? "text-white/70" : "text-[#4A4A45]"}`}>{plan.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className={plan.highlight ? "text-[#D97706]" : "text-[#059669]"} />
                      <span className={plan.highlight ? "text-white/85" : "text-[#4A4A45]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight
                    ? "bg-[#D97706] text-white hover:bg-[#B45309]"
                    : "border border-[#EAE7DF] text-[#0D0D0B] hover:bg-[#F4F2EC]"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-normal text-[#0D0D0B] mb-6 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}>
            Your team ships faster<br />
            <em style={{ fontStyle: "italic", color: "#D97706" }}>when agents do the rest.</em>
          </h2>
          <p className="text-[#4A4A45] text-lg mb-10 max-w-xl mx-auto">
            Join 2,400+ teams already running safyr workflows in production.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard"
              className="bg-[#0D0D0B] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#2A2A28] transition-colors flex items-center gap-2">
              Start building for free <ArrowRight size={16} />
            </Link>
            <Link href="/marketplace"
              className="border border-[#EAE7DF] text-[#0D0D0B] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#F4F2EC] transition-colors">
              Browse the marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#EAE7DF] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#0D0D0B] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L7 2L12 12M4.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[#0D0D0B] text-sm">safyr</span>
          </div>
          <p className="text-xs text-[#9A9A93]">
            © {new Date().getFullYear()} Safyr Technologies Inc. · Built with care in Berlin & San Francisco.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#9A9A93]">
            <Link href="#" className="hover:text-[#0D0D0B] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#0D0D0B] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#0D0D0B] transition-colors">Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

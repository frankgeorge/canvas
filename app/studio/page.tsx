"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Plus, Play, Save, Settings2, ChevronDown,
  Zap, Cpu, Wrench, GitBranch, Database, Webhook,
  MessageSquare, MoreHorizontal, X, Search
} from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";

// Since ReactFlow requires client-side only rendering, we'll build a
// functional static canvas preview that demonstrates the Studio UI
// In production, replace with: import ReactFlow, { ... } from 'reactflow'

interface StudioNode {
  id: string;
  type: "trigger" | "agent" | "tool" | "router" | "output";
  x: number;
  y: number;
  label: string;
  sub: string;
  color: string;
  isSelected?: boolean;
}

const NODE_PALETTE = [
  { type: "trigger", label: "Trigger", sub: "Start your workflow", icon: Zap, color: "#2563EB", desc: "Schedule, webhook, or manual" },
  { type: "agent", label: "AI Agent", sub: "LLM-powered step", icon: Cpu, color: "#D97706", desc: "Claude, GPT-4o, Gemini" },
  { type: "tool", label: "Tool Call", sub: "External API action", icon: Wrench, color: "#7C3AED", desc: "Any API integration" },
  { type: "router", label: "Router", sub: "Conditional branch", icon: GitBranch, color: "#0891B2", desc: "If/else, switch logic" },
  { type: "output", label: "Output", sub: "Deliver the result", icon: MessageSquare, color: "#059669", desc: "Email, Slack, webhook" },
  { type: "memory", label: "Memory", sub: "Persist & retrieve", icon: Database, color: "#BE185D", desc: "Vector store, SQL" },
  { type: "webhook", label: "Webhook", sub: "HTTP event", icon: Webhook, color: "#DC2626", desc: "Send or receive" },
];

const INITIAL_NODES: StudioNode[] = [
  { id: "n1", type: "trigger", x: 40, y: 160, label: "New Salesforce Lead", sub: "Trigger · Salesforce", color: "#2563EB" },
  { id: "n2", type: "agent", x: 280, y: 80, label: "Enrichment Agent", sub: "Claude Sonnet 4", color: "#D97706" },
  { id: "n3", type: "agent", x: 280, y: 240, label: "ICP Scorer", sub: "Claude Haiku 3.5", color: "#D97706" },
  { id: "n4", type: "agent", x: 520, y: 160, label: "Email Drafter", sub: "Claude Sonnet 4", color: "#D97706" },
  { id: "n5", type: "tool", x: 760, y: 100, label: "Update CRM", sub: "Tool · Salesforce API", color: "#7C3AED" },
  { id: "n6", type: "output", x: 760, y: 220, label: "Slack Notification", sub: "Output · Slack", color: "#059669" },
];

const CONNECTIONS = [
  { from: "n1", to: "n2" },
  { from: "n1", to: "n3" },
  { from: "n2", to: "n4" },
  { from: "n3", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n4", to: "n6" },
];

const NODE_COLORS: Record<string, { bg: string; border: string; dot: string }> = {
  trigger: { bg: "#EFF6FF", border: "#BFDBFE", dot: "#2563EB" },
  agent: { bg: "#FEF3C7", border: "#FDE68A", dot: "#D97706" },
  tool: { bg: "#F5F3FF", border: "#DDD6FE", dot: "#7C3AED" },
  router: { bg: "#ECFEFF", border: "#A5F3FC", dot: "#0891B2" },
  output: { bg: "#ECFDF5", border: "#A7F3D0", dot: "#059669" },
  memory: { bg: "#FDF2F8", border: "#FBCFE8", dot: "#BE185D" },
  webhook: { bg: "#FEF2F2", border: "#FECACA", dot: "#DC2626" },
};

export default function StudioPage() {
  const [selectedNode, setSelectedNode] = useState<StudioNode | null>(null);
  const [workflowName, setWorkflowName] = useState("Lead Intelligence Pipeline");
  const [isRunning, setIsRunning] = useState(false);
  const [showPalette, setShowPalette] = useState(true);
  const [paletteSearch, setPaletteSearch] = useState("");

  const filteredPalette = NODE_PALETTE.filter(n =>
    n.label.toLowerCase().includes(paletteSearch.toLowerCase()) ||
    n.desc.toLowerCase().includes(paletteSearch.toLowerCase())
  );

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="h-screen bg-[#FAFAF8] flex overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AppSidebar />

      <div className="flex-1 ml-60 flex flex-col overflow-hidden">
        {/* Studio toolbar */}
        <div className="h-14 bg-white border-b border-[#EAE7DF] flex items-center gap-4 px-5 flex-shrink-0">
          <Link href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-medium text-[#9A9A93] hover:text-[#0D0D0B] transition-colors">
            <ArrowLeft size={13} /> Dashboard
          </Link>
          <div className="w-px h-5 bg-[#EAE7DF]" />

          {/* Workflow name */}
          <input
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            className="text-sm font-semibold text-[#0D0D0B] bg-transparent outline-none border-none min-w-0 w-64 hover:bg-[#F4F2EC] focus:bg-[#F4F2EC] px-2 py-1 rounded transition-colors"
          />

          <div className="flex items-center gap-1 text-xs text-[#9A9A93] bg-[#F4F2EC] px-2.5 py-1 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Draft
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-[#4A4A45] hover:text-[#0D0D0B] border border-[#EAE7DF] bg-white px-3 py-1.5 rounded-lg transition-colors">
              <Save size={12} /> Save
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${
                isRunning
                  ? "bg-[#059669] text-white"
                  : "bg-[#0D0D0B] hover:bg-[#2A2A28] text-white"
              }`}>
              {isRunning ? (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Running…
                </>
              ) : (
                <><Play size={12} /> Run workflow</>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Node palette sidebar */}
          {showPalette && (
            <div className="w-56 bg-white border-r border-[#EAE7DF] flex flex-col flex-shrink-0 overflow-y-auto">
              <div className="p-3 border-b border-[#EAE7DF]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0D0D0B] uppercase tracking-wide">Nodes</span>
                  <button onClick={() => setShowPalette(false)}
                    className="w-5 h-5 rounded hover:bg-[#F4F2EC] flex items-center justify-center">
                    <X size={10} className="text-[#9A9A93]" />
                  </button>
                </div>
                <div className="relative">
                  <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9A9A93]" />
                  <input
                    placeholder="Search nodes..."
                    value={paletteSearch}
                    onChange={e => setPaletteSearch(e.target.value)}
                    className="w-full text-xs pl-7 pr-3 py-2 bg-[#F4F2EC] rounded-lg outline-none placeholder:text-[#9A9A93]"
                  />
                </div>
              </div>
              <div className="p-2 space-y-1">
                {filteredPalette.map((n) => (
                  <div key={n.type}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#F4F2EC] cursor-grab transition-colors group"
                    draggable>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: n.color + "20" }}>
                      <n.icon size={13} style={{ color: n.color }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0D0D0B]">{n.label}</div>
                      <div className="text-[9px] text-[#9A9A93] leading-tight">{n.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden bg-[#F4F2EC]"
            style={{ backgroundImage: "radial-gradient(circle, #D0CEC6 1px, transparent 1px)", backgroundSize: "24px 24px" }}>

            {/* Canvas toolbar */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              {!showPalette && (
                <button onClick={() => setShowPalette(true)}
                  className="bg-white border border-[#EAE7DF] rounded-lg px-3 py-1.5 text-xs font-medium text-[#4A4A45] hover:bg-[#F4F2EC] flex items-center gap-1.5 shadow-sm transition-colors">
                  <Plus size={12} /> Add node
                </button>
              )}
            </div>

            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#D97706" opacity="0.6" />
                </marker>
              </defs>
              {CONNECTIONS.map((conn, i) => {
                const from = INITIAL_NODES.find(n => n.id === conn.from);
                const to = INITIAL_NODES.find(n => n.id === conn.to);
                if (!from || !to) return null;
                // Add panel offsets (palette: 224px, sidebar: 240px)
                const ox = showPalette ? 224 : 0;
                const fx = from.x + 176, fy = from.y + 44;
                const tx = to.x + ox, ty = to.y + 44;
                const mx = (fx + tx) / 2;
                return (
                  <path key={i}
                    d={`M ${fx} ${fy} C ${mx} ${fy}, ${mx} ${ty}, ${tx} ${ty}`}
                    fill="none" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.5"
                    strokeDasharray="none" markerEnd="url(#arrowhead)" />
                );
              })}
            </svg>

            {/* Nodes */}
            {INITIAL_NODES.map((node) => {
              const nc = NODE_COLORS[node.type];
              const isSelected = selectedNode?.id === node.id;
              const offset = showPalette ? 224 : 0;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  className="absolute cursor-pointer transition-all"
                  style={{
                    left: node.x + offset,
                    top: node.y,
                    zIndex: 2,
                  }}>
                  <div className={`w-44 bg-white rounded-xl p-3.5 border-2 shadow-sm transition-all ${
                    isSelected ? "shadow-[0_0_0_3px_rgba(217,119,6,0.2)]" : "hover:shadow-md"
                  }`}
                    style={{ borderColor: isSelected ? "#D97706" : nc.border }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: nc.dot }} />
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: nc.dot }}>
                          {node.type}
                        </span>
                      </div>
                      {isRunning && <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />}
                    </div>
                    <div className="text-xs font-semibold text-[#0D0D0B] leading-tight mb-0.5">{node.label}</div>
                    <div className="text-[10px] text-[#9A9A93]">{node.sub}</div>
                  </div>
                </div>
              );
            })}

            {/* Run indicator */}
            {isRunning && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#0D0D0B] text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Workflow running · 3 active agents · ~3 min remaining
              </div>
            )}
          </div>

          {/* Node config panel */}
          {selectedNode && (
            <div className="w-72 bg-white border-l border-[#EAE7DF] flex flex-col flex-shrink-0 overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE7DF]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: NODE_COLORS[selectedNode.type].dot }} />
                  <span className="text-xs font-bold uppercase tracking-wide text-[#0D0D0B]">
                    {selectedNode.type} Config
                  </span>
                </div>
                <button onClick={() => setSelectedNode(null)}
                  className="w-6 h-6 rounded hover:bg-[#F4F2EC] flex items-center justify-center">
                  <X size={12} className="text-[#9A9A93]" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Name */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                    Node name
                  </label>
                  <input
                    defaultValue={selectedNode.label}
                    className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white"
                  />
                </div>

                {/* Model (if agent) */}
                {selectedNode.type === "agent" && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Model
                      </label>
                      <select className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white appearance-none">
                        <option>claude-sonnet-4-20250514</option>
                        <option>claude-opus-4-20250514</option>
                        <option>claude-haiku-4-5-20251001</option>
                        <option>gpt-4o</option>
                        <option>gemini-1.5-pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        System prompt
                      </label>
                      <textarea
                        rows={5}
                        defaultValue="You are an expert sales researcher. Given a lead record, enrich it with additional context from the web and LinkedIn profile data provided."
                        className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D97706] bg-white resize-none font-mono leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Temperature
                      </label>
                      <input type="range" min="0" max="1" step="0.1" defaultValue="0.3"
                        className="w-full accent-amber-500" />
                      <div className="flex justify-between text-[10px] text-[#9A9A93] mt-0.5">
                        <span>Precise</span><span>Creative</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Trigger config */}
                {selectedNode.type === "trigger" && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Trigger type
                      </label>
                      <select className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white appearance-none">
                        <option>Salesforce new lead</option>
                        <option>Webhook (HTTP POST)</option>
                        <option>Schedule (cron)</option>
                        <option>Manual</option>
                        <option>Gmail new email</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Filter condition
                      </label>
                      <input type="text" defaultValue="lead.score > 60"
                        className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white font-mono" />
                    </div>
                  </>
                )}

                {/* Tool config */}
                {selectedNode.type === "tool" && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Integration
                      </label>
                      <select className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white appearance-none">
                        <option>Salesforce</option>
                        <option>Slack</option>
                        <option>Gmail</option>
                        <option>HubSpot</option>
                        <option>Custom API</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                        Action
                      </label>
                      <select className="w-full border border-[#EAE7DF] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D97706] bg-white appearance-none">
                        <option>Update record</option>
                        <option>Create record</option>
                        <option>Send email</option>
                        <option>Search records</option>
                      </select>
                    </div>
                  </>
                )}

                <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <Settings2 size={12} /> Apply changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

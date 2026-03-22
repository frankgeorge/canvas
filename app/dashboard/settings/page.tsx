"use client";

import { useState } from "react";
import {
  Key, Globe, Bell, Shield, Copy, Eye, EyeOff,
  Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw
} from "lucide-react";
import DashboardLayout from "@/app/dashboard/layout";

const INTEGRATIONS = [
  { name: "Salesforce", icon: "☁️", status: "connected", lastSync: "2 min ago" },
  { name: "Slack", icon: "💬", status: "connected", lastSync: "just now" },
  { name: "Gmail", icon: "📧", status: "connected", lastSync: "5 min ago" },
  { name: "GitHub", icon: "🐙", status: "connected", lastSync: "12 min ago" },
  { name: "HubSpot", icon: "🟠", status: "disconnected", lastSync: "—" },
  { name: "Notion", icon: "📝", status: "disconnected", lastSync: "—" },
  { name: "Linear", icon: "🔷", status: "disconnected", lastSync: "—" },
  { name: "Stripe", icon: "💳", status: "disconnected", lastSync: "—" },
];

const TABS = ["General", "API Keys", "Integrations", "Notifications", "Security"] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("API Keys");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const fakeKey = "sfr_live_sk_a8f2c4e6b9d1f3g5h7j9k2m4n6p8q0r2s4t6u8v0";
  const maskedKey = fakeKey.substring(0, 20) + "••••••••••••••••••••••••";

  const copyKey = () => {
    navigator.clipboard.writeText(fakeKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-[900px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#0D0D0B] mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}>
            Settings
          </h1>
          <p className="text-sm text-[#4A4A45]">Manage your workspace, integrations and API access.</p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 bg-[#F4F2EC] rounded-xl p-1 mb-8 w-fit">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-[#0D0D0B] shadow-sm"
                  : "text-[#9A9A93] hover:text-[#4A4A45]"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* API Keys tab */}
        {activeTab === "API Keys" && (
          <div className="space-y-6">
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[#92400E]">
                Keep your API keys secure. Never commit them to source control or share them publicly. Keys can be regenerated at any time.
              </p>
            </div>

            {/* Existing key */}
            <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#0D0D0B] text-sm">Production API Key</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-xs text-[#059669] font-medium">Active</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-[#F4F2EC] rounded-lg px-4 py-3 font-mono text-xs text-[#4A4A45] select-all">
                  {showKey ? fakeKey : maskedKey}
                </div>
                <button onClick={() => setShowKey(!showKey)}
                  className="w-9 h-9 bg-white border border-[#EAE7DF] rounded-lg flex items-center justify-center hover:bg-[#F4F2EC] transition-colors">
                  {showKey ? <EyeOff size={14} className="text-[#9A9A93]" /> : <Eye size={14} className="text-[#9A9A93]" />}
                </button>
                <button onClick={copyKey}
                  className="w-9 h-9 bg-white border border-[#EAE7DF] rounded-lg flex items-center justify-center hover:bg-[#F4F2EC] transition-colors">
                  {copied
                    ? <CheckCircle2 size={14} className="text-[#059669]" />
                    : <Copy size={14} className="text-[#9A9A93]" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#9A9A93]">
                <span>Created Jan 15, 2025 · Last used 2 min ago</span>
                <button className="flex items-center gap-1.5 text-[#DC2626] hover:text-[#B91C1C] transition-colors">
                  <Trash2 size={11} /> Revoke
                </button>
              </div>
            </div>

            {/* Generate new key */}
            <div className="bg-white border border-dashed border-[#EAE7DF] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#0D0D0B] text-sm mb-1">Generate new key</h3>
                <p className="text-xs text-[#9A9A93]">Create an additional key for staging or team access</p>
              </div>
              <button className="flex items-center gap-2 bg-[#0D0D0B] hover:bg-[#2A2A28] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <Plus size={13} /> New key
              </button>
            </div>

            {/* Usage example */}
            <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6">
              <h3 className="font-semibold text-[#0D0D0B] text-sm mb-3">Quick start</h3>
              <pre className="bg-[#0D0D0B] text-[#E0E0DC] text-xs rounded-xl p-4 overflow-x-auto leading-relaxed font-mono">
{`# Trigger a workflow run via API
curl -X POST https://api.safyr.ai/v1/workflows/wf_001/run \\
  -H "Authorization: Bearer sfr_live_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "input": { "leadId": "lead_123" } }'`}
              </pre>
            </div>
          </div>
        )}

        {/* Integrations tab */}
        {activeTab === "Integrations" && (
          <div className="space-y-4">
            <p className="text-sm text-[#4A4A45]">Connect external tools your agents can use as actions.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {INTEGRATIONS.map(int => (
                <div key={int.name}
                  className="bg-white border border-[#EAE7DF] rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{int.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-[#0D0D0B]">{int.name}</div>
                      {int.status === "connected"
                        ? <div className="text-[10px] text-[#059669]">Synced {int.lastSync}</div>
                        : <div className="text-[10px] text-[#9A9A93]">Not connected</div>
                      }
                    </div>
                  </div>
                  {int.status === "connected" ? (
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg hover:bg-[#F4F2EC] flex items-center justify-center transition-colors">
                        <RefreshCw size={12} className="text-[#9A9A93]" />
                      </button>
                      <button className="text-xs font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors">
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button className="bg-[#F4F2EC] hover:bg-[#EAE7DF] text-[#0D0D0B] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General tab */}
        {activeTab === "General" && (
          <div className="space-y-6">
            <div className="bg-white border border-[#EAE7DF] rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-[#0D0D0B]">Workspace</h3>
              {[
                { label: "Organisation name", value: "Acme Corp", type: "text" },
                { label: "Workspace slug", value: "acme-corp", type: "text" },
                { label: "Timezone", value: "Europe/Berlin", type: "select" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9A9A93] block mb-1.5">
                    {f.label}
                  </label>
                  <input type={f.type} defaultValue={f.value}
                    className="w-full border border-[#EAE7DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/10 transition bg-white" />
                </div>
              ))}
              <button className="bg-[#0D0D0B] hover:bg-[#2A2A28] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors">
                Save changes
              </button>
            </div>
          </div>
        )}

        {/* Placeholder tabs */}
        {(activeTab === "Notifications" || activeTab === "Security") && (
          <div className="bg-white border border-[#EAE7DF] rounded-2xl p-12 text-center">
            <div className="w-12 h-12 bg-[#F4F2EC] rounded-2xl flex items-center justify-center mx-auto mb-4">
              {activeTab === "Notifications" ? <Bell size={20} className="text-[#9A9A93]" /> : <Shield size={20} className="text-[#9A9A93]" />}
            </div>
            <h3 className="font-semibold text-[#0D0D0B] mb-2">{activeTab}</h3>
            <p className="text-sm text-[#9A9A93]">This section is coming in the next release.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

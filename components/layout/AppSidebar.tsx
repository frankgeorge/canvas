"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, GitBranch, Cpu,
  Settings, Zap, Bell, ChevronDown, Play,
  Plus, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    group: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Workflows", href: "/dashboard/workflows", icon: GitBranch },
      { label: "Studio", href: "/studio", icon: Cpu },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Discover",
    items: [
      { label: "Marketplace", href: "/marketplace", icon: Package },
      { label: "Runs", href: "/dashboard/runs", icon: Play },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-[#EAE7DF] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-[#EAE7DF]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#0D0D0B] rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L7 2L12 12M4.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-semibold text-[#0D0D0B] text-lg tracking-tight">safyr</span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <button className="w-7 h-7 rounded-lg hover:bg-[#F4F2EC] flex items-center justify-center transition-colors">
            <Bell size={14} className="text-[#9A9A93]" />
          </button>
        </div>
      </div>

      {/* Workspace picker */}
      <div className="px-3 py-3 border-b border-[#EAE7DF]">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F4F2EC] transition-colors">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#D97706] to-[#92400E] flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-semibold text-[#0D0D0B]">Acme Corp</div>
            <div className="text-[10px] text-[#9A9A93]">Growth plan</div>
          </div>
          <ChevronDown size={12} className="text-[#9A9A93]" />
        </button>
      </div>

      {/* New workflow button */}
      <div className="px-3 py-3 border-b border-[#EAE7DF]">
        <Link href="/studio"
          className="w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
          <Plus size={13} />
          New workflow
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
        {NAV.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C0BEB6] px-2.5 mb-1.5">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-[#FEF3C7] text-[#D97706]"
                          : "text-[#4A4A45] hover:bg-[#F4F2EC] hover:text-[#0D0D0B]"
                      )}>
                      <item.icon size={15} className={active ? "text-[#D97706]" : "text-[#9A9A93]"} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#EAE7DF] p-3">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#F4F2EC] transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-semibold text-[#0D0D0B]">Jane Doe</div>
            <div className="text-[10px] text-[#9A9A93]">jane@acme.com</div>
          </div>
          <Zap size={12} className="text-[#D97706]" />
        </button>
      </div>
    </aside>
  );
}

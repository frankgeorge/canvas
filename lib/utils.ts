import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(d: string): string {
  const seconds = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(d);
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const complexityLabel = {
  starter: "Starter",
  standard: "Standard",
  advanced: "Advanced",
};

export const complexityColor = {
  starter: { text: "#059669", bg: "#ECFDF5" },
  standard: { text: "#D97706", bg: "#FEF3C7" },
  advanced: { text: "#DC2626", bg: "#FEF2F2" },
};

export const statusColor = {
  active: { text: "#059669", bg: "#ECFDF5", dot: "#10B981" },
  paused: { text: "#D97706", bg: "#FEF3C7", dot: "#F59E0B" },
  draft: { text: "#6B7280", bg: "#F9FAFB", dot: "#9CA3AF" },
  error: { text: "#DC2626", bg: "#FEF2F2", dot: "#EF4444" },
};

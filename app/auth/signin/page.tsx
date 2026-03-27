"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Github, Chrome, ArrowRight, Zap } from "lucide-react";

export default function SignInPage() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[45%] bg-[#0D0D0B] p-12 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Decorative nodes */}
        <div className="absolute top-32 right-16 w-32 h-32 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
        </div>
        <div className="absolute top-48 right-48 w-20 h-20 rounded-2xl border border-white/10 bg-white/5" />
        <div className="absolute bottom-48 right-24 w-24 h-24 rounded-2xl border border-white/10 bg-white/5" />
        <div className="absolute bottom-32 right-56 w-16 h-16 rounded-full border border-[#D97706]/20 bg-[#D97706]/10" />

        {/* Lines connecting nodes */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <line x1="75%" y1="35%" x2="60%" y2="55%" stroke="#D97706" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="60%" y1="55%" x2="75%" y2="72%" stroke="#D97706" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L7 2L12 12M4.5 8.5H9.5" stroke="#0D0D0B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-semibold text-white text-xl tracking-tight">safyr</span>
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 mt-auto">
          <h2 className="text-4xl font-normal text-white leading-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}>
            Build AI workflows
            <br />
            <em className="italic text-[#D97706]">that actually ship.</em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
            Join 2,400+ teams building multi-agent workflows with safyr's visual Studio and expert Playbook Marketplace.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["JD", "MK", "AT", "RS"].map((initials, i) => (
                <div key={initials}
                  className="w-8 h-8 rounded-full border-2 border-[#0D0D0B] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: ["#2563EB", "#D97706", "#059669", "#7C3AED"][i] }}>
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="text-white text-xs font-semibold">2,400+ teams onboard</div>
              <div className="text-white/40 text-[10px]">across 60 countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 bg-[#0D0D0B] rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L7 2L12 12M4.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-semibold text-[#0D0D0B] text-lg tracking-tight">safyr</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#0D0D0B] mb-2"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Welcome back
            </h1>
            <p className="text-sm text-[#4A4A45]">
              Sign in to your safyr workspace
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSignIn("google")}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 bg-white border border-[#EAE7DF] hover:bg-[#F4F2EC] text-[#0D0D0B] font-medium text-sm py-3.5 px-5 rounded-xl transition-all disabled:opacity-60 shadow-sm">
              {loading === "google" ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#EAE7DF] border-t-[#0D0D0B] animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            <button
              onClick={() => handleSignIn("github")}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 bg-[#0D0D0B] hover:bg-[#2A2A28] text-white font-medium text-sm py-3.5 px-5 rounded-xl transition-all disabled:opacity-60">
              {loading === "github" ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Github size={16} />
              )}
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#EAE7DF]" />
            <span className="text-xs text-[#9A9A93]">or</span>
            <div className="flex-1 h-px bg-[#EAE7DF]" />
          </div>

          {/* Magic link placeholder */}
          <div className="bg-[#F4F2EC] rounded-xl p-4 text-center">
            <p className="text-xs text-[#4A4A45] mb-2">Magic link sign-in coming soon</p>
            <input
              type="email"
              placeholder="your@company.com"
              disabled
              className="w-full bg-white border border-[#EAE7DF] rounded-lg px-3 py-2.5 text-sm outline-none placeholder:text-[#C0BEB6] cursor-not-allowed opacity-60"
            />
          </div>

          {/* Terms */}
          <p className="text-[10px] text-[#9A9A93] text-center mt-6 leading-relaxed">
            By signing in you agree to our{" "}
            <Link href="#" className="underline hover:text-[#0D0D0B]">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-[#0D0D0B]">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

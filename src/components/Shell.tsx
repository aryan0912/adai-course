"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudit } from "@/store/AuditContext";
import {
  FileText,
  Search,
  Inbox,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Activity,
  History,
  Lock,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logs } = useAudit();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const navItems = [
    {
      name: "Practitioner",
      subname: "eOffice Summarizer",
      href: "/practitioner",
      badge: "L1",
      icon: FileText,
      color: "text-emerald-400",
    },
    {
      name: "Power User",
      subname: "RTI & Scheme RAG",
      href: "/power-user",
      badge: "L2",
      icon: Search,
      color: "text-amber-400",
    },
    {
      name: "Builder",
      subname: "Dak & TL Docket",
      href: "/builder",
      badge: "L3",
      icon: Inbox,
      color: "text-purple-400",
    },
    {
      name: "Governance",
      subname: "LBSNAA Architecture",
      href: "/workshops",
      badge: "GOV",
      icon: GraduationCap,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Agility AI
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  LBSNAA
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                Admin Simulator
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Competency Levels
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`w-4 h-4 ${isActive ? item.color : "text-slate-500"}`}
                  />
                  <div>
                    <div className={`font-semibold ${isActive ? "text-white" : ""}`}>
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      {item.subname}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    isActive
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                      : "bg-slate-800/80 text-slate-500 border-slate-700/50"
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 space-y-1 bg-slate-950/40">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Air-Gapped Synthetic Mode</span>
          </div>
          <div>Audited for IAS Trainees</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DPDP Act 2023 Compliant
            </span>
            <span className="hidden sm:inline-flex items-center rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/30 font-mono">
              Synthetic Data Active (Offline Proof)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-purple-400" />
              <span>Audit Trail</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                {logs.length}
              </span>
            </button>
          </div>
        </header>

        {/* Main Stage */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950 text-slate-100">
          {children}
        </main>
      </div>

      {/* Right Drawer (Officer in the Loop Audit Log) */}
      <aside
        className={`bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl transition-all duration-300 shrink-0 ${
          drawerOpen ? "w-80" : "w-0 border-l-0 overflow-hidden"
        }`}
      >
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Audit Trail
              </h2>
              <p className="text-[10px] text-slate-500 font-mono">
                Officer in the Loop
              </p>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {logs.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-500 space-y-2">
              <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-medium text-slate-400">Audit Log Ready</p>
              <p className="text-[11px] leading-relaxed">
                Execute any simulator action or sign off as an officer to stream
                cryptographic verification records here.
              </p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="relative pl-4 border-l-2 border-purple-500 text-xs space-y-1 animate-in slide-in-from-top-2 fade-in duration-300"
              >
                <div className="absolute w-2 h-2 bg-purple-500 rounded-full -left-[5px] top-1 ring-4 ring-slate-900 shadow-[0_0_8px_#a855f7]" />
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{log.timestamp}</span>
                  <span className="text-purple-400 font-bold">VERIFIED</span>
                </div>
                <p className="text-slate-200 leading-snug font-sans">{log.action}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Hash Chain: SHA-256</span>
          <span className="text-emerald-400">Immutable</span>
        </div>
      </aside>
    </div>
  );
}

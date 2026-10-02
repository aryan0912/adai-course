"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Search,
  Inbox,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Building2,
  GraduationCap,
} from "lucide-react";
import { TelemetryHud } from "@/components/TelemetryHud";

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 3-Second Rule Telemetry HUD */}
      <TelemetryHud
        model="LBSNAA Executive Workshop Architecture"
        latency="0.84s End-to-End"
        groundingScore="5 to 7 Hours/Week Reclaimed"
        statusText="Officer-in-the-Loop Pedagogy"
        isVerified={true}
      />

      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/80 border border-slate-800 p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            LBSNAA Mussoorie • 7 October 2026 Walkthrough
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            LBSNAA AI Productivity Simulator
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            A practical companion to the Agility AI pitch for LBSNAA faculty and IAS
            officer trainees. Demonstrating real-time AI transformations of messy,
            redundant administrative workflows into clean decision points under the
            strict <strong>&ldquo;Officer in the Loop&rdquo;</strong> paradigm.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/practitioner"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-950/50 border border-blue-400/30 transition-all"
            >
              Start Simulator (Level 1)
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-lg text-xs font-bold border border-slate-700 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              View Workload & Capability Architecture
            </Link>

            <span className="text-xs text-slate-500 font-mono">
              Synthetic Data • Offline Proof
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: VISUAL DIAGRAM - 3-TIER CAPABILITY LADDER (pic2.png)          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                From Practitioner to Builder: 3-Tier Capability Ladder (Slide 8)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Curriculum tuned across Officer Trainees, Mid-Career Officers (MCTP), and Faculty.
            </p>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/50 font-bold self-start sm:self-auto">
            3 Competency Tiers
          </span>
        </div>

        {/* Embedded Capability Pyramid Diagram */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white max-w-4xl mx-auto">
          <Image
            src="/pic2.png"
            alt="3-Tier Capability Pyramid Infographic for Senior Government Officers"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Interactive 3 Level Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Level 1: Practitioner */}
          <Link
            href="/practitioner"
            className="group flex flex-col justify-between bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TIER 1
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Practitioner: eOffice Noting
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Transform a 15-page historical PWD road dispute into a 4-point noting sheet and draft Office Memorandum with digital token signature.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Launch eOffice Sim</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Level 2: Power User */}
          <Link
            href="/power-user"
            className="group flex flex-col justify-between bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  TIER 2
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  Power User: RTI Assistant
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Zero-hallucination RAG querying dense PMAY-G manuals. Interactive citation hover tethers and statutory truth check with Hindi translation.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Launch RTI Assistant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Level 3: Builder */}
          <Link
            href="/builder"
            className="group flex flex-col justify-between bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Inbox className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  TIER 3
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  Builder: Dak & District TL
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Multi-model morning Dak triage routing citizen petitions across Jal Nigam, Revenue, and UPCL, compiling the DM Monday Time-Limit docket.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-400">
              <span>Launch District Docket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: VISUAL DIAGRAM - WORKLOAD TRANSFORMATION (pic1.png)            */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Weekly Workload Transformation: Indian Civil Servant (Slides 7 & 19)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reclaiming 5 to 7 hours every week from routine clerical burdens into ground-level governance.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50 font-bold self-start sm:self-auto">
            NDDB Verified Impact
          </span>
        </div>

        {/* Embedded Workload Infographic */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white">
          <Image
            src="/pic1.png"
            alt="Weekly Workload Transformation: Indian Civil Servant (IAS Officer)"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-300">
            Explore the exact mapping of how each of the 6 administrative workloads is targeted:
          </span>
          <Link
            href="/workshops"
            className="text-emerald-400 hover:underline font-bold flex items-center gap-1 shrink-0"
          >
            Open Workload Architecture Breakdown &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

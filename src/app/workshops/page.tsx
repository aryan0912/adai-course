"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Search,
  Inbox,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Users,
  Building2,
  FileCheck2,
} from "lucide-react";
import { TelemetryHud } from "@/components/TelemetryHud";

export default function WorkshopsPage() {
  const [activeWorkload, setActiveWorkload] = useState<number>(0);

  const sixWorkloads = [
    {
      id: 0,
      title: "1. Notes & Official Briefs",
      traditional: "Extensive hours drafting D.O. letters, VIP speeches, and Vidhan Sabha assembly replies from scratch.",
      aiAugmented: "Drafts generated in 45 seconds using RCTFC structured prompts, matching official bureaucratic tone.",
      reclaimed: "3 to 4 hrs saved weekly",
      simulatorLink: "/practitioner",
      simulatorLabel: "Test in Level 1 (eOffice)",
    },
    {
      id: 1,
      title: "2. Document & Circular Summaries",
      traditional: "Wading through 15 to 200-page historical enquiry reports, court decisions, and dense circulars.",
      aiAugmented: "Key milestones, financial outlays, and contentious clauses extracted into a 1-page executive note.",
      reclaimed: "2.5 hrs saved weekly",
      simulatorLink: "/practitioner",
      simulatorLabel: "Test in Level 1 (eOffice)",
    },
    {
      id: 2,
      title: "3. District Scheme MIS Analysis",
      traditional: "Struggling with 50,000-row Excel spreadsheets (PMAY, Jal Jeevan, MGNREGA) without a data team.",
      aiAugmented: "Automated anomaly detection immediately highlights lagging blocks, fund utilization gaps, and timeline slippages.",
      reclaimed: "2 hrs saved weekly",
      simulatorLink: "/builder",
      simulatorLabel: "Test in Level 3 (District TL)",
    },
    {
      id: 3,
      title: "4. Multilingual Citizen Work",
      traditional: "Manual translation back-and-forth into formal administrative Hindi; risking legal nuance loss.",
      aiAugmented: "Accurate bilingual replies citing statutory clauses; preserves official terms (अनुदान, खतौनी, सक्षम प्राधिकारी).",
      reclaimed: "1.5 hrs saved weekly",
      simulatorLink: "/power-user",
      simulatorLabel: "Test in Level 2 (RTI)",
    },
    {
      id: 4,
      title: "5. Meetings & Time-Limit (TL) Follow-up",
      traditional: "Manually tracking 40 line department action items and recording Collectorate review minutes.",
      aiAugmented: "Directives compiled automatically from grievance trends into a structured Time-Limit (TL) action docket.",
      reclaimed: "2 hrs saved weekly",
      simulatorLink: "/builder",
      simulatorLabel: "Test in Level 3 (District TL)",
    },
    {
      id: 5,
      title: "6. Case Material & Best Practices",
      traditional: "Valuable district administrative experiences and innovations lost due to lack of documentation time.",
      aiAugmented: "Converts raw field reports and inspection notes into structured LBSNAA teaching case studies.",
      reclaimed: "1 hr saved weekly",
      simulatorLink: "/practitioner",
      simulatorLabel: "View Case Synthesizer",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Executive Telemetry */}
      <TelemetryHud
        model="LBSNAA Executive Course Architecture"
        latency="2-Day Flagship Program"
        groundingScore="5 to 7 Hours/Week Reclaimed"
        statusText="Officer-in-the-Loop Pedagogy"
        isVerified={true}
      />

      {/* Hero Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            LBSNAA AI Productivity Workshops (7 October 2026)
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            How This Workshop Transforms an Officer&apos;s Daily Work
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Moving beyond theoretical prompts into the six core workloads every Indian
            administrative officer handles. Reclaiming <strong>5 to 7 hours every week</strong> for
            field inspections, citizen hearings, and strategic policy decisions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/practitioner"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950/40"
          >
            Start Simulator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: VISUAL DIAGRAM - WEEKLY WORKLOAD TRANSFORMATION (pic1.png)     */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Weekly Workload Transformation: Indian Civil Servant (IAS Officer)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Slide 7 & 19 Context: Reclaiming 5 to 7 hours/week from routine clerical burdens into ground-level governance.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50 font-bold self-start sm:self-auto">
            5 to 7 Hours/Week Reclaimed
          </span>
        </div>

        {/* Embedded High-Fidelity Infographic */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white">
          <Image
            src="/pic1.png"
            alt="Weekly Workload Transformation: Indian Civil Servant"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Interactive 6 Workload Cards directly mapped to the diagram */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Interactive Breakdown: The Six Workloads Targeted (Slide 7)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sixWorkloads.map((w) => {
              const isSelected = activeWorkload === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => setActiveWorkload(w.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-800 border-emerald-400 ring-1 ring-emerald-400 shadow-lg"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100">
                        {w.title}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {w.reclaimed}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">
                      {w.aiAugmented}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Workshop Output</span>
                    <Link
                      href={w.simulatorLink}
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {w.simulatorLabel} &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: VISUAL DIAGRAM - 3-TIER CAPABILITY PYRAMID (pic2.png)          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                From Practitioner to Builder: 3-Tier Capability Ladder
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Slide 8 Context: Tailored progression across Officer Trainees, Mid-Career Officers (MCTP), and Faculty.
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

        {/* Action Cards Linking Directly to the 3 Simulators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Tier 1 Card */}
          <Link
            href="/practitioner"
            className="group p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  Tier 1: Practitioner
                </span>
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                eOffice File Noting & Summaries
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured RCTFC prompting to digest 15-page historical road files, extract milestones, and draft formal Office Memorandums.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span>Launch Level 1 Sim</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tier 2 Card */}
          <Link
            href="/power-user"
            className="group p-5 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-blue-400 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50">
                  Tier 2: Power User
                </span>
                <Search className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                Grounded Knowledge & Scheme RAG
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Answering complex RTI inquiries over PMAY-G scheme manuals with 100% verified citations, zero hallucination, and bilingual Hindi translation.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span>Launch Level 2 Sim</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tier 3 Card */}
          <Link
            href="/builder"
            className="group p-5 rounded-xl bg-slate-950/80 border border-purple-500/30 hover:border-purple-400 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                  Tier 3: Builder
                </span>
                <Inbox className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                Autonomous Agents & District Review
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Triage incoming morning Dak across Jal Nigam, Revenue, and UPCL, stamping priorities and compiling the District Collector&apos;s Monday agenda.
              </p>
            </div>
            <div className="text-xs font-bold text-purple-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span>Launch Level 3 Sim</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: 2-DAY FLAGSHIP PROGRAMME MODULE MATRIX                         */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Flagship Two-Day Programme Structure (Slides 10 & 11)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Build, Do Not Brief • DPDP Act 2023 Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Day 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Day 1: The Writing Desk & Individual Productivity</span>
              <span className="font-mono text-slate-500">Modules 1–4</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong>Module 1:</strong> The core loop & structured prompting (RCTFC framework)</li>
              <li><strong>Module 2:</strong> The writing desk (Notes, briefs, speeches, official letters)</li>
              <li><strong>Module 3:</strong> Reading, summarizing & eOffice file synthesis</li>
              <li><strong>Module 4:</strong> District data analysis, deep research & decisions (without data teams)</li>
            </ul>
          </div>

          {/* Day 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-blue-400 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Day 2: The Institution, Internal Tools & Agents</span>
              <span className="font-mono text-slate-500">Modules 5–8</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong>Module 5:</strong> Knowledge management, departmental circulars & meetings</li>
              <li><strong>Module 6:</strong> Visual, presentation & multimodal board-ready decks</li>
              <li><strong>Module 7:</strong> AI-native no-code building (Every officer ships 1 internal tool)</li>
              <li><strong>Module 8:</strong> Agentic workflows with human checkpoints, governance & AI SOP</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

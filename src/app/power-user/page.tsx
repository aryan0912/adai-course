"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Cpu,
  ShieldCheck,
  Send,
  Languages,
  CheckSquare,
  Square,
  ExternalLink,
  RotateCcw,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { WorkflowNodes, WorkflowNode } from "@/components/WorkflowNodes";
import { TelemetryHud } from "@/components/TelemetryHud";
import { useAudit } from "@/store/AuditContext";
import rtiData from "@/data/rti.json";

export default function PowerUserPage() {
  const { addLog } = useAudit();

  const [activeStage, setActiveStage] = useState<number>(0);
  // 0: Idle, waiting to search
  // 1: Semantic Vector Search active (Orange)
  // 2: Grounded Reasoning active (Blue)
  // 3: Response Generated, Awaiting Officer Fact-Verification (Purple)
  // 4: Dispatched (Complete)

  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [hoveredCitation, setHoveredCitation] = useState<string | null>(null);
  const [verifiedFacts, setVerifiedFacts] = useState<Record<string, boolean>>({
    "Section 4.1": false,
    "Section 5.3": false,
    "Section 8.2": false,
  });

  const allFactsVerified = Object.values(verifiedFacts).every(Boolean);

  const workflowNodes: WorkflowNode[] = [
    {
      id: "input",
      label: "RTI Query & PDF",
      sublabel: "Citizen Petition Ingest",
      type: "trigger",
      icon: BookOpen,
      status: activeStage >= 1 ? "completed" : activeStage === 0 ? "active" : "idle",
    },
    {
      id: "vector",
      label: "Vector Semantic Search",
      sublabel: "Hybrid Cosine Match",
      type: "retrieval",
      icon: Search,
      status: activeStage > 1 ? "completed" : activeStage === 1 ? "active" : "idle",
    },
    {
      id: "reasoning",
      label: "Grounded Reasoning",
      sublabel: "Zero-Hallucination RAG",
      type: "ai",
      icon: Cpu,
      status: activeStage > 2 ? "completed" : activeStage === 2 ? "active" : "idle",
    },
    {
      id: "verification",
      label: "Officer Fact-Check",
      sublabel: "Source Grounding Audit",
      type: "officer",
      icon: ShieldCheck,
      status: activeStage === 4 ? "completed" : activeStage === 3 ? "active" : "idle",
    },
    {
      id: "dispatch",
      label: "Bilingual Dispatch",
      sublabel: "EN/HI Multilingual Push",
      type: "trigger",
      icon: Send,
      status: activeStage === 4 ? "completed" : "idle",
    },
  ];

  const handleRunRAG = () => {
    setActiveStage(1);

    setTimeout(() => {
      setActiveStage(2);
    }, 1400);

    setTimeout(() => {
      setActiveStage(3);
      addLog(
        "Level 2: RAG matched 3 statutory clauses from PMAY-G manual (Sec 4.1, 5.3, 8.2). Awaiting Officer Grounding Verification."
      );
    }, 2800);
  };

  const handleToggleVerification = (section: string) => {
    setVerifiedFacts((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDispatch = () => {
    setActiveStage(4);
    addLog(
      `Level 2: Officer verified all 3 citations. Dispatched bilingual RTI reply (${language.toUpperCase()}) to applicant Ramesh Kumar.`
    );
  };

  const handleReset = () => {
    setActiveStage(0);
    setLanguage("en");
    setHoveredCitation(null);
    setVerifiedFacts({
      "Section 4.1": false,
      "Section 5.3": false,
      "Section 8.2": false,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Telemetry HUD */}
      <TelemetryHud
        model="Claude 3.5 Sonnet + pgvector RAG"
        latency={activeStage >= 3 ? "0.72s" : "0.00s"}
        groundingScore="100% Citing PMAY-G Guidelines"
        statusText={
          activeStage === 4
            ? "Dispatched & Logged"
            : activeStage === 3
            ? allFactsVerified
              ? "All Facts Verified"
              : "Verifying Citations (Officer)"
            : "Standby"
        }
        isVerified={activeStage === 4}
      />

      {/* Node Workflow Pipeline */}
      <WorkflowNodes
        nodes={workflowNodes}
        activeNodeId={
          activeStage === 1
            ? "vector"
            : activeStage === 2
            ? "reasoning"
            : activeStage === 3
            ? "verification"
            : activeStage === 4
            ? "dispatch"
            : undefined
        }
      />

      {/* Citizen Query Context Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
              Citizen Grievance & RTI Query #2026-HRT-890
            </span>
            <span className="text-xs text-slate-400">• Applicant: Ramesh Kumar</span>
          </div>
          <p className="text-xs text-slate-200 italic max-w-3xl">
            &ldquo;{rtiData.rti_query}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {activeStage === 0 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunRAG}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-amber-950/40 border border-amber-400/30 transition-all"
            >
              <Search className="w-4 h-4" />
              Retrieve Grounded Answer
            </motion.button>
          )}

          {activeStage >= 1 && activeStage < 3 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Vector Matching Sections...
            </div>
          )}

          {activeStage >= 3 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Spatial Split: Source Document vs Grounded AI Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[560px]">
        {/* LEFT SIDE: Source Document PDF Viewer (PMAY-G Guidelines) */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Ground Truth Document: PMAY-G Policy Guidelines
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-400/80 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-900/50">
              Ministry of Rural Development
            </span>
          </div>

          <div className="flex-1 p-6 font-serif text-slate-300 text-sm leading-relaxed overflow-y-auto bg-slate-950/60 space-y-6">
            <div className="border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              DOCUMENT: Pradhan Mantri Awas Yojana - Gramin (Framework for Implementation)
            </div>

            {/* Section 4.1 */}
            <div
              className={`p-3 rounded-lg border transition-all duration-300 ${
                hoveredCitation === "Section 4.1" || (activeStage >= 1 && activeStage < 3)
                  ? "bg-amber-500/20 border-amber-400 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-slate-900/50 border-slate-800 text-slate-300"
              }`}
            >
              <div className="text-xs font-bold font-mono text-amber-400 mb-1 flex items-center justify-between">
                <span>SECTION 4.1: BENEFICIARY ELIGIBILITY CRITERIA</span>
                {hoveredCitation === "Section 4.1" && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-sans font-bold">
                    CITED IN ANSWER
                  </span>
                )}
              </div>
              <p className="text-xs">
                The beneficiary must be a rural household without a pucca house or
                living in a kutcha house with up to two rooms. The household must be
                duly identified in the SECC 2011 deprivation database or the
                finalized Awaas+ list.
              </p>
            </div>

            {/* Section 5.3 */}
            <div
              className={`p-3 rounded-lg border transition-all duration-300 ${
                hoveredCitation === "Section 5.3" || (activeStage >= 1 && activeStage < 3)
                  ? "bg-amber-500/20 border-amber-400 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-slate-900/50 border-slate-800 text-slate-300"
              }`}
            >
              <div className="text-xs font-bold font-mono text-amber-400 mb-1 flex items-center justify-between">
                <span>SECTION 5.3: UNIT FINANCIAL ASSISTANCE</span>
                {hoveredCitation === "Section 5.3" && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-sans font-bold">
                    CITED IN ANSWER
                  </span>
                )}
              </div>
              <p className="text-xs">
                The unit assistance provided to the beneficiary is ₹1.20 lakh in plain
                areas and ₹1.30 lakh in hilly states, difficult areas, and Integrated
                Action Plan (IAP) tribal districts, directly transferred via DBT.
              </p>
            </div>

            {/* Section 8.2 */}
            <div
              className={`p-3 rounded-lg border transition-all duration-300 ${
                hoveredCitation === "Section 8.2" || (activeStage >= 1 && activeStage < 3)
                  ? "bg-amber-500/20 border-amber-400 text-slate-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-slate-900/50 border-slate-800 text-slate-300"
              }`}
            >
              <div className="text-xs font-bold font-mono text-amber-400 mb-1 flex items-center justify-between">
                <span>SECTION 8.2: GRIEVANCE REDRESSAL MECHANISM</span>
                {hoveredCitation === "Section 8.2" && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-sans font-bold">
                    CITED IN ANSWER
                  </span>
                )}
              </div>
              <p className="text-xs">
                Beneficiaries facing delays in fund disbursement or technical
                verification may lodge a grievance at the Block Development Office
                (BDO) or through the Centralized Public Grievance Redress and
                Monitoring System (CPGRAMS).
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Grounded Response + Interactive Verification */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Grounded RTI Response
              </span>
            </div>

            {/* Multilingual Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-blue-400" />
                Lang:
              </span>
              <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === "en"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    language === "hi"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/40">
            {activeStage === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                <div className="p-4 rounded-full bg-slate-800/80 border border-slate-700">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300">
                  Awaiting RAG Retrieval
                </h3>
                <p className="text-xs max-w-sm">
                  Click &apos;Retrieve Grounded Answer&apos; to trigger semantic search
                  across the official PMAY-G manual and match legal clauses.
                </p>
              </div>
            )}

            {activeStage >= 1 && activeStage < 3 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-amber-300 font-mono">
                    Searching Vector Embedding Space...
                  </div>
                  <p className="text-xs text-slate-400">
                    Locating top-3 semantic cosine matches in PMAY-G guidelines.
                  </p>
                </div>
              </div>
            )}

            {activeStage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Generated Answer with interactive hover-tethers */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      Drafted Reply to Citizen
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                      Hover clauses to illuminate PDF
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap"
                    >
                      {language === "en" ? (
                        <>
                          Dear Applicant,
                          {"\n\n"}
                          Regarding your RTI inquiry w.r.t PMAY-G eligibility and disbursement:
                          {"\n"}
                          1.{" "}
                          <span
                            onMouseEnter={() => setHoveredCitation("Section 4.1")}
                            onMouseLeave={() => setHoveredCitation(null)}
                            className="bg-amber-500/20 text-amber-300 border-b border-amber-400 cursor-pointer font-bold px-1"
                          >
                            Eligibility: As you reside in a 1-room kutcha house, you qualify under Section 4.1
                          </span>
                          {"\n"}
                          2.{" "}
                          <span
                            onMouseEnter={() => setHoveredCitation("Section 5.3")}
                            onMouseLeave={() => setHoveredCitation(null)}
                            className="bg-amber-500/20 text-amber-300 border-b border-amber-400 cursor-pointer font-bold px-1"
                          >
                            Subsidy Amount: Haritpur being a hilly district entitles you to ₹1.30 lakh (Section 5.3)
                          </span>
                          {"\n"}
                          3.{" "}
                          <span
                            onMouseEnter={() => setHoveredCitation("Section 8.2")}
                            onMouseLeave={() => setHoveredCitation(null)}
                            className="bg-amber-500/20 text-amber-300 border-b border-amber-400 cursor-pointer font-bold px-1"
                          >
                            Grievance Redressal: You can file a formal inquiry at the Block Development Office (BDO) under Section 8.2
                          </span>
                        </>
                      ) : (
                        rtiData.ai_generated.hindi_response
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Officer in the Loop: Citation Truth-Check Checkboxes */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                        Officer Grounding Verification
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Audit Trail Mandatory
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Verify that the AI&apos;s answer is 100% grounded against the official
                    manual clauses before enabling dispatch:
                  </p>

                  <div className="space-y-2">
                    {rtiData.ai_generated.citations.map((cite) => {
                      const isChecked = verifiedFacts[cite.section];
                      return (
                        <div
                          key={cite.section}
                          onClick={() =>
                            activeStage < 4 && handleToggleVerification(cite.section)
                          }
                          className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                            isChecked
                              ? "bg-purple-950/40 border-purple-500/60 text-purple-200"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-purple-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                            <span className="font-mono font-bold text-amber-400">
                              {cite.section}
                            </span>
                            <span>— {cite.fact}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            {isChecked ? "VERIFIED" : "PENDING"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dispatch Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      {allFactsVerified
                        ? "✓ All statutory clauses verified against manual"
                        : "Check all 3 clauses to enable dispatch"}
                    </div>

                    {activeStage < 4 ? (
                      <motion.button
                        disabled={!allFactsVerified}
                        whileHover={allFactsVerified ? { scale: 1.02 } : {}}
                        whileTap={allFactsVerified ? { scale: 0.98 } : {}}
                        onClick={handleDispatch}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          allFactsVerified
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-950/40 border border-purple-400/30 cursor-pointer"
                            : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-4 h-4" />
                        Approve Dispatch
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-3 py-1.5 rounded border border-emerald-500/40">
                        <FileCheck className="w-4 h-4" />
                        Dispatched & Recorded in Audit Trail
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

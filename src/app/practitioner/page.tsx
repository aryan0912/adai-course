"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Scan,
  Database,
  PenTool,
  CheckCircle,
  FileCheck2,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
} from "lucide-react";
import { WorkflowNodes, WorkflowNode } from "@/components/WorkflowNodes";
import { TelemetryHud } from "@/components/TelemetryHud";
import { useAudit } from "@/store/AuditContext";
import eofficeData from "@/data/eoffice.json";

export default function PractitionerPage() {
  const { addLog } = useAudit();

  const [activeStage, setActiveStage] = useState<number>(0);
  // 0: Initial (File loaded, waiting to trigger)
  // 1: Scanning & Extracting (Node 2 active)
  // 2: Matching Precedents (Node 3 active)
  // 3: Generating Draft OM (Node 4 active)
  // 4: Complete, Awaiting Officer DSC (Node 5 active)
  // 5: Signed & Verified (All completed)

  const [editableOM, setEditableOM] = useState<string>(
    eofficeData.ai_generated.draft_om
  );
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);

  const workflowNodes: WorkflowNode[] = [
    {
      id: "ingest",
      label: "eOffice Ingest",
      sublabel: "15-Page Legacy File",
      type: "trigger",
      icon: FileText,
      status: activeStage >= 1 ? "completed" : activeStage === 0 ? "active" : "idle",
    },
    {
      id: "parse",
      label: "AI OCR & Chronology",
      sublabel: "Entity & Dispute Extractor",
      type: "ai",
      icon: Scan,
      status: activeStage > 1 ? "completed" : activeStage === 1 ? "active" : "idle",
    },
    {
      id: "retrieval",
      label: "Financial Grounding",
      sublabel: "PWD S.O.R & Sanction Match",
      type: "retrieval",
      icon: Database,
      status: activeStage > 2 ? "completed" : activeStage === 2 ? "active" : "idle",
    },
    {
      id: "draft",
      label: "Draft OM Generator",
      sublabel: "Administrative Synthesis",
      type: "ai",
      icon: PenTool,
      status: activeStage > 3 ? "completed" : activeStage === 3 ? "active" : "idle",
    },
    {
      id: "officer",
      label: "Officer Sign-off",
      sublabel: "Digital Token Verification",
      type: "officer",
      icon: CheckCircle,
      status: isSigned ? "completed" : activeStage >= 4 ? "active" : "idle",
    },
  ];

  const handleStartPipeline = () => {
    setActiveStage(1);
    setScanProgress(0);

    // Sequence through stages programmatically
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        return prev + 25;
      });
    }, 350);

    setTimeout(() => {
      setActiveStage(2);
    }, 1500);

    setTimeout(() => {
      setActiveStage(3);
    }, 2600);

    setTimeout(() => {
      setActiveStage(4);
      addLog(
        "Level 1: AI synthesized 15-page PWD file into 4-point noting & drafted OM. Awaiting Officer Signature."
      );
    }, 3800);
  };

  const handleSignOM = () => {
    setIsSigned(true);
    setActiveStage(5);
    addLog(
      "Level 1: Officer verified and digitally signed (DSC Token #2026-LBS-042) Office Memorandum. Dispatched to SDM Haritpur."
    );
  };

  const handleReset = () => {
    setActiveStage(0);
    setIsSigned(false);
    setScanProgress(0);
    setEditableOM(eofficeData.ai_generated.draft_om);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Telemetry HUD (3-Second Rule) */}
      <TelemetryHud
        model="Claude 3.5 Sonnet (PWD Fine-Tuned)"
        latency={activeStage >= 4 ? "1.14s" : "0.00s"}
        groundingScore="100% Deterministic (File #2023-089)"
        statusText={
          isSigned
            ? "Digitally Signed (DSC #042)"
            : activeStage >= 4
            ? "Pending Officer Verification"
            : "Standby"
        }
        isVerified={isSigned}
      />

      {/* Node-Based Workflow Pipeline Bar */}
      <WorkflowNodes
        nodes={workflowNodes}
        activeNodeId={
          activeStage === 1
            ? "parse"
            : activeStage === 2
            ? "retrieval"
            : activeStage === 3
            ? "draft"
            : activeStage >= 4 && !isSigned
            ? "officer"
            : undefined
        }
      />

      {/* Action / Trigger Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              PWD File #{eofficeData.id}
              <span className="text-xs font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                15 Pages • Road Construction
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Haritpur to Neelam Valley Sector IV • Stalled Land Acquisition File
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeStage === 0 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartPipeline}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Run Autonomous Extraction
            </motion.button>
          )}

          {activeStage >= 1 && activeStage < 4 && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Processing Pipeline Stage {activeStage}/4...
            </div>
          )}

          {activeStage >= 4 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Simulation
            </button>
          )}
        </div>
      </div>

      {/* Spatial Before/After Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[560px]">
        {/* LEFT SIDE: Raw Unstructured eOffice File Noting */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Raw Input: Scanned File Notes (Pages 1-15)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Govt. of Uttarakhand • PWD Dept
            </span>
          </div>

          {/* Document Content with animated scanner */}
          <div className="relative flex-1 p-6 font-serif text-slate-300 text-sm leading-relaxed overflow-hidden bg-slate-950/60">
            {/* Animated Laser Scanning Beam */}
            {activeStage === 1 && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Scanned Paper Header */}
            <div className="border-b border-slate-800 pb-3 mb-4 text-xs font-mono text-slate-400 space-y-1">
              <div>FILE REF NO: PWD/HRT/2022/CONST-89 (CONFIDENTIAL)</div>
              <div>SUBJECT: Construction of Haritpur-Neelam Valley Link Road</div>
              <div>DATE FIRST OPENED: 12-05-2022</div>
            </div>

            {/* Note Sheet Text with Illuminating Entities */}
            <div className="space-y-4">
              <p>
                Reference preceding note sheets on pages 1 to 14. The administrative
                approval for the construction of the 32 km two-lane road from
                Haritpur to Neelam Valley was accorded on{" "}
                <span
                  className={`transition-all duration-500 px-1 py-0.5 rounded font-mono ${
                    activeStage >= 1
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "text-slate-300"
                  }`}
                >
                  12-05-2022
                </span>{" "}
                with a sanctioned financial outlay of{" "}
                <span
                  className={`transition-all duration-500 px-1 py-0.5 rounded font-mono ${
                    activeStage >= 1
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                      : "text-slate-300"
                  }`}
                >
                  ₹45 Crores
                </span>
                .
              </p>

              <p>
                The Executive Engineer (EE, PWD) reported on{" "}
                <span
                  className={`transition-all duration-500 px-1 py-0.5 rounded font-mono ${
                    activeStage >= 1
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "text-slate-300"
                  }`}
                >
                  18-09-2023
                </span>{" "}
                that work on KM 14 through 18 has ceased due to physical obstruction
                by villagers of{" "}
                <span
                  className={`transition-all duration-500 px-1 py-0.5 rounded ${
                    activeStage >= 1
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  Village Madhavpur
                </span>{" "}
                citing pending compensation for agricultural land.
              </p>

              <p>
                To date, approximately{" "}
                <span
                  className={`transition-all duration-500 px-1 py-0.5 rounded font-mono ${
                    activeStage >= 1
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                      : "text-slate-300"
                  }`}
                >
                  40%
                </span>{" "}
                of the physical work stands completed. The contractor has submitted
                Running Account (RA) Bill #4 amounting to ₹6.8 Crores, threatening
                demobilization and litigation if payment is withheld further.
              </p>

              <p className="text-xs text-slate-500 italic pt-4 border-t border-slate-900">
                [...12 pages of handwritten technical notes, cross-notings by Section
                Officer, Finance Dept queries, and site inspection logs omitted for
                brevity...]
              </p>
            </div>

            {/* Bottom Entity Tracker Tag HUD */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">ENTITIES DETECTED:</span>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    activeStage >= 1
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-slate-800 text-slate-600"
                  }`}
                >
                  Dates (2)
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    activeStage >= 1
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-600"
                  }`}
                >
                  Outlay (₹45 Cr)
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    activeStage >= 1
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-slate-800 text-slate-600"
                  }`}
                >
                  Dispute (Madhavpur)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Clean Structured Note Sheet & Draft OM (Officer in Loop) */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Structured Output: Executive Noting & Draft OM
              </span>
            </div>
            {isSigned ? (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                <FileCheck2 className="w-3.5 h-3.5" />
                Digitally Signed
              </span>
            ) : (
              <span className="text-[11px] font-mono text-purple-400">
                Officer Review Stage
              </span>
            )}
          </div>

          {/* Structured Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/40">
            {activeStage === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                <div className="p-4 rounded-full bg-slate-800/80 border border-slate-700">
                  <Scan className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300">
                  Awaiting Pipeline Execution
                </h3>
                <p className="text-xs max-w-sm">
                  Click &apos;Run Autonomous Extraction&apos; above to initiate OCR,
                  chronological milestone parsing, and OM generation.
                </p>
              </div>
            )}

            {activeStage >= 1 && activeStage < 4 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-blue-300 font-mono">
                    Synthesizing File Precedents...
                  </div>
                  <p className="text-xs text-slate-400">
                    Extracting milestones, matching PWD circulars, drafting executive OM.
                  </p>
                </div>
              </div>
            )}

            {activeStage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* 4-Bullet Chronological Executive Summary */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      Chronological Milestone Extraction
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                      4 Points Synthesized
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {eofficeData.ai_generated.summary_bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold font-mono">0{idx + 1}.</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Draft Office Memorandum (Editable for Officer in the Loop) */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                        Draft Office Memorandum (OM)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Editable by Officer
                    </span>
                  </div>

                  <textarea
                    rows={7}
                    value={editableOM}
                    disabled={isSigned}
                    onChange={(e) => setEditableOM(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md p-3 text-xs text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-80 resize-none leading-relaxed"
                  />

                  {/* Officer Verification Button or Signed Seal */}
                  {!isSigned ? (
                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-purple-400" />
                        Requires DSC Token #2026-LBS-042
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignOM}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all"
                      >
                        <CheckCircle className="w-4 h-4 text-purple-200" />
                        Verify & Digitally Sign (DSC)
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-300">
                            Cryptographically Signed by DM / IAS Trainee
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Token: LBSNAA-PKI-2026-042 • Timestamp: {new Date().toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                        DISPATCH READY
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

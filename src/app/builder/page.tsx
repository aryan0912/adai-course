"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  Cpu,
  Layers,
  BarChart3,
  ShieldCheck,
  Send,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Building2,
  CheckCircle2,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  Filter,
} from "lucide-react";
import { WorkflowNodes, WorkflowNode } from "@/components/WorkflowNodes";
import { TelemetryHud } from "@/components/TelemetryHud";
import { useAudit } from "@/store/AuditContext";
import dakDataRaw from "@/data/dak.json";

interface DakItem {
  id: string;
  subject: string;
  content: string;
  block: string;
  source: string;
  ai_suggested_department: string;
  ai_suggested_priority: string;
  assigned_department: string;
  assigned_priority: string;
}

interface BlockMetric {
  id: string;
  name: string;
  type: "Urban" | "Rural" | "Hilly" | "Tribal";
  grievancesCount: number;
  criticalFlag: boolean;
  budgetUtilization: string;
  leadIssue: string;
  responsibleOfficer: string;
}

export default function BuilderPage() {
  const { addLog } = useAudit();

  const [activeStage, setActiveStage] = useState<number>(0);
  const [selectedBlock, setSelectedBlock] = useState<string>("ALL");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("ALL");

  const [letters, setLetters] = useState<DakItem[]>([
    {
      id: "DAK-2026-001",
      subject: "Severe Potable Water Contamination - Pipeline Breach",
      content:
        "Sewage ingress reported in primary drinking water main supplying Ward 4. Three cases of pediatric gastroenteritis admitted at District Civil Hospital. Immediate water testing and alternate tanker supply requested.",
      block: "Ward 4 (Civil Lines)",
      source: "CM Helpline (CM-CMIS #8892)",
      ai_suggested_department: "Jal Nigam",
      ai_suggested_priority: "Urgent",
      assigned_department: "Jal Nigam",
      assigned_priority: "Urgent",
    },
    {
      id: "DAK-2026-002",
      subject: "Encroachment on Govt Primary School Playground",
      content:
        "Unauthorized boundary masonry constructed over Khasra No. 142/2 belonging to Govt Primary School. Sub-Divisional Magistrate requested to initiate eviction proceedings under Public Premises (Eviction) Act.",
      block: "Madhavpur Block",
      source: "Citizen Physical Dak",
      ai_suggested_department: "Revenue",
      ai_suggested_priority: "Medium",
      assigned_department: "Revenue",
      assigned_priority: "Medium",
    },
    {
      id: "DAK-2026-003",
      subject: "Distribution Transformer Burnout - Market Grid",
      content:
        "Frequent 11kV line voltage fluctuations causing terminal burnout at 250kVA transformer. Evening power outages affecting cold chain storage at primary health sub-centre.",
      block: "Haritpur Sadar",
      source: "Vyapar Mandal Petition",
      ai_suggested_department: "UPCL",
      ai_suggested_priority: "Low",
      assigned_department: "UPCL",
      assigned_priority: "Low",
    },
    {
      id: "DAK-2026-004",
      subject: "Sanction for Deep Bore Tube-well prior to Rabi Sowing",
      content:
        "Groundwater depletion in canal tail-end command area. Village Panchayat requests urgent administrative sanction under PM Krishi Sinchayee Yojana for exploratory drilling.",
      block: "Sitapur Block",
      source: "Gram Panchayat Resolution",
      ai_suggested_department: "Jal Nigam",
      ai_suggested_priority: "Medium",
      assigned_department: "Jal Nigam",
      assigned_priority: "Medium",
    },
    {
      id: "DAK-2026-005",
      subject: "Undue Pendency in Mutation of Inherited Agri Land",
      content:
        "Uncontested succession entry (Varisan) pending before Revenue Inspector for over 180 days in violation of State Right to Public Services Act (RTSA statutory limit: 45 days).",
      block: "Neelam Valley",
      source: "CPGRAMS Portal #GOV-901",
      ai_suggested_department: "Revenue",
      ai_suggested_priority: "Low",
      assigned_department: "Revenue",
      assigned_priority: "Low",
    },
  ]);

  const districtBlocks: BlockMetric[] = [
    {
      id: "Ward 4 (Civil Lines)",
      name: "Ward 4 (Civil Lines)",
      type: "Urban",
      grievancesCount: 1,
      criticalFlag: true,
      budgetUtilization: "84%",
      leadIssue: "Sewage Ingress in Water Main",
      responsibleOfficer: "EE Jal Nigam / CMO",
    },
    {
      id: "Madhavpur Block",
      name: "Madhavpur Tehsil",
      type: "Rural",
      grievancesCount: 1,
      criticalFlag: false,
      budgetUtilization: "40% (PWD Road Stalled)",
      leadIssue: "Govt School Land Encroachment",
      responsibleOfficer: "SDM / Tehsildar",
    },
    {
      id: "Sitapur Block",
      name: "Sitapur Block",
      type: "Rural",
      grievancesCount: 1,
      criticalFlag: false,
      budgetUtilization: "62%",
      leadIssue: "Rabi Pre-Sowing Irrigation Deficit",
      responsibleOfficer: "Chief Agriculture Officer",
    },
    {
      id: "Neelam Valley",
      name: "Neelam Valley Sub-Div",
      type: "Hilly",
      grievancesCount: 1,
      criticalFlag: false,
      budgetUtilization: "91%",
      leadIssue: "Statutory Mutation Pendency (>180d)",
      responsibleOfficer: "Naib Tehsildar",
    },
    {
      id: "Haritpur Sadar",
      name: "Haritpur Sadar Tehsil",
      type: "Urban",
      grievancesCount: 1,
      criticalFlag: false,
      budgetUtilization: "78%",
      leadIssue: "11kV Grid Cold Chain Interruption",
      responsibleOfficer: "EE Electricity (UPCL)",
    },
  ];

  const workflowNodes: WorkflowNode[] = [
    {
      id: "ingest",
      label: "Morning Dak Ingest",
      sublabel: "CPGRAMS • CM-CMIS • Mail",
      type: "trigger",
      icon: Inbox,
      status: activeStage >= 1 ? "completed" : activeStage === 0 ? "active" : "idle",
    },
    {
      id: "classify",
      label: "Urgency & Entity Router",
      sublabel: "RTSA Statutory Checks",
      type: "ai",
      icon: Cpu,
      status: activeStage > 1 ? "completed" : activeStage === 1 ? "active" : "idle",
    },
    {
      id: "queues",
      label: "Line Ministry Queues",
      sublabel: "Jal Nigam • Revenue • UPCL",
      type: "retrieval",
      icon: Layers,
      status: activeStage > 2 ? "completed" : activeStage === 2 ? "active" : "idle",
    },
    {
      id: "analytics",
      label: "DM Time-Limit Brief",
      sublabel: "Lagging Block Analytics",
      type: "ai",
      icon: BarChart3,
      status: activeStage > 3 ? "completed" : activeStage === 3 ? "active" : "idle",
    },
    {
      id: "officer",
      label: "DM Authority Sign-Off",
      sublabel: "Formal Endorsement & Release",
      type: "officer",
      icon: ShieldCheck,
      status: activeStage === 4 ? "completed" : activeStage >= 3 ? "active" : "idle",
    },
  ];

  const handleRunRouting = () => {
    setActiveStage(1);

    setTimeout(() => {
      setActiveStage(2);
    }, 1300);

    setTimeout(() => {
      setActiveStage(3);
      addLog(
        "Level 3: Automated Dak triage routed 5 petitions across 3 line departments. Flagged RTSA statutory violation in Neelam Valley and acute water hazard in Ward 4. Generated DM Time-Limit Review docket."
      );
    }, 2600);
  };

  const handleUpdateDept = (id: string, newDept: string) => {
    setLetters((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, assigned_department: newDept } : item
      )
    );
  };

  const handleUpdatePriority = (id: string, newPriority: string) => {
    setLetters((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, assigned_priority: newPriority } : item
      )
    );
  };

  const handleApproveAll = () => {
    setActiveStage(4);
    addLog(
      "Level 3: District Magistrate verified and endorsed all 5 Dak dispatches. Generated executive directives for Monday Time-Limit (TL) inter-departmental meeting."
    );
  };

  const handleReset = () => {
    setActiveStage(0);
    setSelectedBlock("ALL");
    setSelectedDeptFilter("ALL");
  };

  const filteredLetters = letters.filter((l) => {
    const matchesDept =
      selectedDeptFilter === "ALL" || l.assigned_department === selectedDeptFilter;
    const matchesBlock =
      selectedBlock === "ALL" || l.block === selectedBlock;
    return matchesDept && matchesBlock;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold animate-pulse";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Telemetry HUD */}
      <TelemetryHud
        model="Claude 3.5 Sonnet + State NIC Parser"
        latency={activeStage >= 3 ? "0.91s" : "0.00s"}
        groundingScore="Deterministic Grievance Categorization"
        statusText={
          activeStage === 4
            ? "Dispatched to Line Depts"
            : activeStage >= 3
            ? "DM Oversight & Override Active"
            : "Standby"
        }
        isVerified={activeStage === 4}
      />

      {/* Node Workflow Pipeline */}
      <WorkflowNodes
        nodes={workflowNodes}
        activeNodeId={
          activeStage === 1
            ? "classify"
            : activeStage === 2
            ? "queues"
            : activeStage === 3
            ? "analytics"
            : activeStage === 4
            ? "officer"
            : undefined
        }
      />

      {/* District Context & Operational Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Office of the District Magistrate & Collector, Haritpur
              <span className="text-xs font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Morning Dak Triage & TL Docket
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cross-Ministry Integration: CPGRAMS • CM-CMIS • Local Physical Petitions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {activeStage === 0 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunRouting}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition-all"
            >
              <Cpu className="w-4 h-4" />
              Run Autonomous Routing Agent
            </motion.button>
          )}

          {activeStage >= 1 && activeStage < 3 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Synthesizing Line Dept Routes & Statutory RTSA Limits...
            </div>
          )}

          {activeStage >= 3 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Docket
              </button>

              {activeStage === 3 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApproveAll}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2 rounded-lg text-xs font-bold shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Approve All Routes (Collector Endorsement)
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TOP SECTION: District Administrative Heatmap & Sub-Division Matrix (Slide 17 Capstone) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Haritpur District Administrative Review: Sub-Division & Tehsil Matrix
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Critical Anomaly
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-500" /> Normal Operations
            </span>
          </div>
        </div>

        {/* The 5 Administrative Block Cards (Interactive Filter) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {districtBlocks.map((blk) => {
            const isSelected = selectedBlock === blk.id;
            return (
              <div
                key={blk.id}
                onClick={() => setSelectedBlock(isSelected ? "ALL" : blk.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-800 border-blue-500 ring-1 ring-blue-500/50 shadow-md"
                    : blk.criticalFlag
                    ? "bg-rose-950/20 border-rose-500/50 hover:border-rose-400"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-200 truncate">
                    {blk.name}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1 rounded uppercase ${
                      blk.criticalFlag
                        ? "bg-rose-500/20 text-rose-300 font-bold"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {blk.type}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-1 mb-2 font-mono">
                  {blk.leadIssue}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono border-t border-slate-800/80 pt-1.5 text-slate-500">
                  <span>Outlay: {blk.budgetUtilization}</span>
                  <span className={blk.criticalFlag ? "text-rose-400 font-bold" : ""}>
                    {blk.grievancesCount} Grievance
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedBlock !== "ALL" && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-blue-950/30 border border-blue-500/30 text-xs text-blue-300">
            <span>Filtered to petitions originating from: <strong>{selectedBlock}</strong></span>
            <button
              onClick={() => setSelectedBlock("ALL")}
              className="text-[11px] underline hover:text-white"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Spatial Split: Interactive Dak Dispatch Queue & Collector's Time-Limit Brief */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Classified Letters with Officer Override Controls */}
        <div className="lg:col-span-2 flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl min-h-[580px]">
          {/* Header & Department Filters */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Dak Dispatch Queue & Line Department Assignment
              </span>
            </div>

            {/* Department Filter Tabs */}
            {activeStage >= 2 && (
              <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700 text-[10px] font-bold">
                {["ALL", "Jal Nigam", "Revenue", "UPCL"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDeptFilter(dept)}
                    className={`px-2 py-0.5 rounded transition-all ${
                      selectedDeptFilter === dept
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Letter Cards View */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
            {activeStage === 0 && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Scanned Inward Registers (Awaiting AI Routing Agent):</span>
                  <span>5 Pending Actions</span>
                </div>
                {letters.map((letter) => (
                  <div
                    key={letter.id}
                    className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-emerald-400 font-bold">
                          {letter.id}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {letter.block}
                        </span>
                        <h4 className="text-xs font-bold text-slate-100">
                          {letter.subject}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 max-w-xl">
                        {letter.content}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-slate-500">
                        Inward Channel: {letter.source}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded shrink-0">
                      RAW SCAN
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeStage >= 1 && activeStage < 3 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-blue-300 font-mono">
                    Triaging Grievances & Cross-referencing RTSA Time Limits...
                  </div>
                  <p className="text-xs text-slate-400">
                    Evaluating life-safety hazards, administrative pendency, and line department jurisdictions.
                  </p>
                </div>
              </div>
            )}

            {activeStage >= 3 && (
              <AnimatePresence>
                <div className="space-y-3">
                  {filteredLetters.map((letter) => (
                    <motion.div
                      layout
                      key={letter.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-emerald-400 font-bold">
                            {letter.id}
                          </span>
                          <span
                            className={`text-[10px] uppercase px-2 py-0.5 rounded border ${getPriorityBadge(
                              letter.assigned_priority
                            )}`}
                          >
                            {letter.assigned_priority}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {letter.block}
                          </span>
                          <h4 className="text-xs font-bold text-slate-100">
                            {letter.subject}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {letter.content}
                        </p>
                        <div className="text-[10px] font-mono text-slate-500">
                          Source: {letter.source} • Target Officer: {letter.assigned_department === "Jal Nigam" ? "Executive Engineer (Drinking Water)" : letter.assigned_department === "Revenue" ? "Sub-Divisional Magistrate / Tehsildar" : "Executive Engineer (Power)"}
                        </div>
                      </div>

                      {/* Officer in the Loop: Override Controls */}
                      <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                        {/* Department Selector */}
                        <div className="space-y-1 text-right">
                          <label className="text-[10px] text-slate-500 block font-mono">
                            DEPARTMENT
                          </label>
                          <select
                            disabled={activeStage === 4}
                            value={letter.assigned_department}
                            onChange={(e) =>
                              handleUpdateDept(letter.id, e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 text-xs font-mono text-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Jal Nigam">Jal Nigam</option>
                            <option value="Revenue">Revenue Dept</option>
                            <option value="UPCL">UPCL (Power)</option>
                          </select>
                        </div>

                        {/* Priority Selector */}
                        <div className="space-y-1 text-right">
                          <label className="text-[10px] text-slate-500 block font-mono">
                            PRIORITY
                          </label>
                          <select
                            disabled={activeStage === 4}
                            value={letter.assigned_priority}
                            onChange={(e) =>
                              handleUpdatePriority(letter.id, e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          >
                            <option value="Urgent">Urgent</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right Col: District Review Briefing (Executive Dashboard for Collector) */}
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl min-h-[580px]">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Collector&apos;s Monday TL Brief
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Haritpur Collectorate
            </span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-950/40">
            {activeStage < 3 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
                <BarChart3 className="w-8 h-8 text-slate-600" />
                <h4 className="text-xs font-semibold text-slate-400">
                  TL Analytics Pending
                </h4>
                <p className="text-[11px] max-w-xs">
                  Run the routing agent to compile the District Collector&apos;s Time-Limit
                  (TL) agenda and identify line department compliance bottlenecks.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Department Load Breakdown */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                    Grievance Distribution Across Ministries
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Jal Nigam (Drinking Water)</span>
                        <span className="text-emerald-400">2 files (40%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[40%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Revenue & Land Records</span>
                        <span className="text-blue-400">2 files (40%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full w-[40%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>UPCL (Power Infrastructure)</span>
                        <span className="text-amber-400">1 file (20%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[20%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lagging Block Critical Alert */}
                <div className="bg-rose-950/30 border border-rose-500/40 rounded-lg p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Immediate Action: Ward 4 Drinking Water</span>
                  </div>
                  <p className="text-[11px] text-rose-200/90 leading-relaxed">
                    Sewage infiltration into potable distribution main. Summon EE Jal Nigam
                    with water bacteriological test reports by 1500 hrs today. Order standby
                    water tankers for Civil Lines.
                  </p>
                </div>

                {/* Statutory Violation Alert */}
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-lg p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Statutory RTSA Breach: Neelam Valley</span>
                  </div>
                  <p className="text-[11px] text-amber-200/90 leading-relaxed">
                    Uncontested mutation pending for 180 days against statutory 45-day RTSA limit.
                    Issue show-cause notice to concerned Revenue Inspector under Civil Services
                    Conduct Rules.
                  </p>
                </div>

                {/* Executive DM Directives */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block">
                    Collector&apos;s Monday Review Directives
                  </span>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed font-sans">
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>
                        <strong>SDM Haritpur:</strong> Lead joint survey with Education Dept on Primary School Khasra 142/2 encroachment; execute Section 133 CrPC if obstruction persists.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>
                        <strong>Chief Agriculture Officer:</strong> Expedite PM Krishi Sinchayee Yojana subsidy clearance for Sitapur tube-well before Rabi sowing window closes.
                      </span>
                    </li>
                  </ul>
                </div>

                {activeStage === 4 && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex items-center gap-2 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Endorsed by District Magistrate • Dispatched via eOffice v7</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export type NodeType = "trigger" | "ai" | "retrieval" | "officer";

export interface WorkflowNode {
  id: string;
  label: string;
  sublabel?: string;
  type: NodeType;
  icon: LucideIcon;
  status: "idle" | "active" | "completed";
}

interface WorkflowNodesProps {
  nodes: WorkflowNode[];
  activeNodeId?: string;
  className?: string;
}

const colorMap: Record<
  NodeType,
  {
    border: string;
    bg: string;
    text: string;
    glow: string;
    tag: string;
  }
> = {
  trigger: {
    border: "border-emerald-500",
    bg: "bg-emerald-950/40",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.35)]",
    tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  ai: {
    border: "border-blue-500",
    bg: "bg-blue-950/40",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    tag: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  retrieval: {
    border: "border-amber-500",
    bg: "bg-amber-950/40",
    text: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    tag: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  officer: {
    border: "border-purple-500",
    bg: "bg-purple-950/40",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.35)]",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
};

export function WorkflowNodes({ nodes, activeNodeId, className = "" }: WorkflowNodesProps) {
  return (
    <div
      className={`w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Autonomous Pipeline State
        </span>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Trigger
          </span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> AI Process
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Retrieval
          </span>
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-400" /> Officer Verify
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
        {nodes.map((node, index) => {
          const colors = colorMap[node.type];
          const isActive = node.status === "active" || node.id === activeNodeId;
          const isCompleted = node.status === "completed";
          const isIdle = node.status === "idle" && !isActive;

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isIdle ? 0.35 : 1,
                  scale: isActive ? 1.04 : 1,
                  filter: isIdle ? "grayscale(40%)" : "none",
                }}
                transition={{ duration: 0.3 }}
                className={`relative flex-1 min-w-[170px] max-w-[220px] rounded-lg border p-3 transition-all duration-300 ${
                  isActive
                    ? `${colors.border} ${colors.bg} ${colors.glow} ring-1 ${colors.border}`
                    : isCompleted
                    ? "border-slate-700 bg-slate-800/80"
                    : "border-slate-800/80 bg-slate-900/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div
                    className={`p-1.5 rounded-md border ${
                      isActive
                        ? `${colors.tag}`
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    <node.icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? colors.text : isCompleted ? "text-slate-200" : "text-slate-400"
                    }`}
                  >
                    {node.label}
                  </span>
                </div>
                {node.sublabel && (
                  <p className="text-[11px] text-slate-400 truncate pl-0.5">{node.sublabel}</p>
                )}
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                  <span
                    className={`px-1.5 py-0.5 rounded border uppercase text-[9px] ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : isActive
                        ? `${colors.tag}`
                        : "bg-slate-800/60 text-slate-500 border-slate-700/50"
                    }`}
                  >
                    {isCompleted ? "DONE" : isActive ? "PROCESSING" : "STANDBY"}
                  </span>
                  <span className="text-slate-500">{node.type.toUpperCase()}</span>
                </div>
              </motion.div>

              {/* Edge / Pulse Connector between nodes */}
              {index < nodes.length - 1 && (
                <div className="relative flex items-center justify-center w-8 shrink-0">
                  <div className="h-0.5 w-full bg-slate-800" />
                  {/* Glowing Animated Pulse */}
                  {(isActive || isCompleted) && (
                    <motion.div
                      className="absolute h-1.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8]"
                      animate={{ x: [-12, 12] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

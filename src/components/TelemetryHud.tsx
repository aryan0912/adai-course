"use client";

import React from "react";
import { Zap, ShieldCheck, Cpu, Clock } from "lucide-react";

interface TelemetryHudProps {
  model?: string;
  latency?: string;
  groundingScore?: string;
  statusText?: string;
  isVerified?: boolean;
}

export function TelemetryHud({
  model = "Claude 3.5 Sonnet (State Fine-Tuned)",
  latency = "0.84s",
  groundingScore = "100% Deterministic",
  statusText = "Awaiting Officer Signature",
  isVerified = false,
}: TelemetryHudProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {/* 3-Second Rule metric 1: Latency */}
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 px-3">
        <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Execution Latency
          </div>
          <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
            {latency}
            <span className="text-[10px] text-emerald-400 font-sans">(-98.2% vs Manual)</span>
          </div>
        </div>
      </div>

      {/* 3-Second Rule metric 2: Model State */}
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 px-3">
        <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Active Intelligence Engine
          </div>
          <div className="text-sm font-bold text-slate-100 truncate max-w-[150px]">
            {model}
          </div>
        </div>
      </div>

      {/* 3-Second Rule metric 3: Grounding / Audit */}
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 px-3">
        <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Source Grounding
          </div>
          <div className="text-sm font-bold text-amber-400 font-mono">
            {groundingScore}
          </div>
        </div>
      </div>

      {/* 3-Second Rule metric 4: Officer in Loop Status */}
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 px-3">
        <div
          className={`p-2 rounded-md border ${
            isVerified
              ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
              : "bg-purple-950/30 text-purple-400 border-purple-800/40"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Officer-in-the-Loop
          </div>
          <div
            className={`text-sm font-bold truncate ${
              isVerified ? "text-purple-300" : "text-slate-200"
            }`}
          >
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}

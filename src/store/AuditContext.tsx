"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuditEntry = {
  id: string;
  action: string;
  timestamp: string;
};

type AuditContextType = {
  logs: AuditEntry[];
  addLog: (action: string) => void;
};

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<AuditEntry[]>([]);

  const addLog = (action: string) => {
    const newLog = {
      id: Math.random().toString(36).substring(7),
      action,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <AuditContext.Provider value={{ logs, addLog }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
}

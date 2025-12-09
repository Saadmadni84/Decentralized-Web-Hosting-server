import React from "react";

interface LogEntryProps {
  timestamp: string;
  message: string;
  type?: "info" | "warning" | "error" | "scale";
}

export default function LogEntry({ timestamp, message, type = "info" }: LogEntryProps) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0 font-mono text-xs">
      <span className="text-gray-500 whitespace-nowrap">[{timestamp}]</span>
      {type === "scale" && (
        <span className="text-green-400 font-bold">[ML-AUTO-SCALE]</span>
      )}
      <span className="text-gray-300">{message}</span>
    </div>
  );
}

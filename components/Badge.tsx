import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  status: "Active" | "Healthy" | "Flagged" | "De-indexed";
  className?: string;
}

export default function Badge({ status, className }: BadgeProps) {
  const styles = {
    Active: "bg-green-500/10 text-green-400 border-green-500/20",
    Healthy: "bg-green-500/10 text-green-400 border-green-500/20",
    Flagged: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "De-indexed": "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-md text-xs font-medium border uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

import React from "react";
import { motion } from "framer-motion";

interface ReplicaBarProps {
  count: number;
  max?: number;
}

export default function ReplicaBar({ count, max = 10 }: ReplicaBarProps) {
  const percentage = Math.min((count / max) * 100, 100);

  return (
    <div className="flex items-center gap-2 w-full max-w-[120px]">
      <div className="h-1.5 flex-grow bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
      <span className="text-xs text-gray-400 font-mono">{count}</span>
    </div>
  );
}

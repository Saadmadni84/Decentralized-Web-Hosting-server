"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NodeMap() {
  const nodes = [
    { id: 1, x: 20, y: 30 },
    { id: 2, x: 50, y: 20 },
    { id: 3, x: 80, y: 35 },
    { id: 4, x: 30, y: 60 },
    { id: 5, x: 70, y: 70 },
    { id: 6, x: 50, y: 50 },
  ];

  const connections = [
    [1, 2], [2, 3], [1, 4], [4, 6], [6, 5], [3, 5], [2, 6]
  ];

  return (
    <div className="relative w-full h-[300px] bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 shadow-inner shadow-black/40">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />
      
      <svg className="absolute inset-0 w-full h-full">
        {/* Connections */}
        {connections.map(([startId, endId], i) => {
          const start = nodes.find(n => n.id === startId);
          const end = nodes.find(n => n.id === endId);
          if (!start || !end) return null;
          return (
            <motion.line
              key={i}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="4"
              fill="#6366F1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="8"
              fill="rgba(99, 102, 241, 0.3)"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

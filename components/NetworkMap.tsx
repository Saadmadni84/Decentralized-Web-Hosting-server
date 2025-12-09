"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  name: string;
}

const defaultNodes: Node[] = [
  { id: "us-east", x: 25, y: 35, name: "US-East" }, // North America
  { id: "us-west", x: 15, y: 40, name: "US-West" },
  { id: "sa-east", x: 32, y: 75, name: "SA-East" }, // South America
  { id: "eu-west", x: 52, y: 30, name: "EU-West" }, // Europe
  { id: "asia-east", x: 80, y: 35, name: "Asia-East" }, // Asia
  { id: "aus", x: 85, y: 80, name: "AUS-1" }, // Australia
  { id: "africa", x: 55, y: 60, name: "AFR-1" }, // Africa
];

export default function NetworkMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate connections (MST or just nearest neighbors for visual appeal)
  const connections = [
    ["us-west", "us-east"],
    ["us-east", "eu-west"],
    ["us-east", "sa-east"],
    ["eu-west", "africa"],
    ["eu-west", "asia-east"],
    ["asia-east", "aus"],
    ["africa", "sa-east"],
    ["asia-east", "us-west"], // Trans-pacific
  ];

  return (
    <div className="relative w-full h-[400px] bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 shadow-inner shadow-black/40 group">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Abstract World Map Polygons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* North America */}
        <path d="M10,20 L35,20 L40,45 L20,50 Z" fill="#6366F1" />
        {/* South America */}
        <path d="M25,55 L40,55 L35,85 L25,80 Z" fill="#6366F1" />
        {/* Europe/Africa */}
        <path d="M45,25 L65,25 L60,75 L45,65 Z" fill="#6366F1" />
        {/* Asia/Aus */}
        <path d="M70,20 L95,20 L90,85 L70,75 Z" fill="#6366F1" />
      </svg>

      {/* Interactive Layer */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.6)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {mounted && connections.map(([startId, endId], i) => {
          const start = defaultNodes.find(n => n.id === startId);
          const end = defaultNodes.find(n => n.id === endId);
          if (!start || !end) return null;

          return (
            <motion.line
              key={`line-${i}`}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
            />
          );
        })}

        {/* Nodes */}
        {defaultNodes.map((node, i) => (
          <g key={node.id}>
            {/* Pulse Effect */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="rgba(99, 102, 241, 0.5)"
              animate={{
                r: [3, 8, 3],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
            
            {/* Core Node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="1.5"
              fill="#6366F1"
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1, type: "spring" }}
            />

            {/* Label (visible on hover) */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <rect 
                x={`${node.x + 2}%`} 
                y={`${node.y - 2}%`} 
                width="16" 
                height="6" 
                rx="1"
                fill="rgba(15, 23, 42, 0.9)" 
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              <text
                x={`${node.x + 3}%`}
                y={`${node.y + 1.5}%`}
                fill="white"
                fontSize="2.5"
                fontFamily="monospace"
              >
                {node.name}
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* Overlay Vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
    </div>
  );
}

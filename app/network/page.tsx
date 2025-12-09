"use client";

import React from "react";
import NetworkMap from "@/components/NetworkMap";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Activity, Server } from "lucide-react";

const regions = [
  { id: "US-East", nodeId: "NODE-001", cache: "84%", load: 42 },
  { id: "EU-West", nodeId: "NODE-002", cache: "62%", load: 78 },
  { id: "SA-East", nodeId: "NODE-003", cache: "91%", load: 24 },
  { id: "Asia-Pac", nodeId: "NODE-004", cache: "45%", load: 56 },
];

export default function NetworkPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Network Status</h1>

      {/* Map Section */}
      <div className="w-full">
        <NetworkMap />
      </div>

      {/* Region Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {regions.map((region) => (
          <Card key={region.id} className="bg-[#0d1117] border-white/10 shadow-inner shadow-black/40 hover:bg-white/5 transition-colors group">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">{region.id}</h3>
                  <p className="text-xs font-mono text-slate-500">{region.nodeId}</p>
                </div>
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <Server className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Database className="w-3 h-3" /> Cache
                  </span>
                  <span className="font-mono text-slate-200">{region.cache}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Load
                  </span>
                  <span className="font-mono text-neon-green text-[#4ade80] drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]">
                    {region.load}%
                  </span>
                </div>
                
                {/* Load Bar */}
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" 
                    style={{ width: `${region.load}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

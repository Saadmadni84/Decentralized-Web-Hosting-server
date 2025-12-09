"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Badge";
import ReplicaBar from "@/components/ReplicaBar";
import LogEntry from "@/components/LogEntry";
import { Zap, Plus } from "lucide-react";

// Mock Data
const initialItems = [
  { id: 1, name: "defi-swap-v3", cid: "QmX7...9a2", replicas: 8, status: "Active" },
  { id: 2, name: "nft-gallery-pro", cid: "QmY2...b41", replicas: 12, status: "Healthy" },
  { id: 3, name: "scam-token-landing", cid: "QmZ9...c33", replicas: 0, status: "Flagged" },
  { id: 4, name: "dark-market-ui", cid: "QmW1...d55", replicas: 0, status: "De-indexed" },
  { id: 5, name: "blog-personal", cid: "QmR4...e66", replicas: 3, status: "Active" },
];

const initialLogs = [
  { timestamp: "10:42:05", message: "Node US-East-4 rebalancing storage", type: "scale" },
  { timestamp: "10:41:58", message: "New content detected: QmX7...9a2", type: "info" },
  { timestamp: "10:41:12", message: "Traffic spike in EU-West region", type: "warning" },
  { timestamp: "10:40:45", message: "Replica count increased for nft-gallery-pro", type: "scale" },
  { timestamp: "10:39:22", message: "DAO proposal #124 passed", type: "info" },
];

export default function DashboardPage() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-purple-500/20">
          <Plus className="w-4 h-4 mr-2" /> Deploy Website
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <Card className="lg:col-span-2 bg-[#0d1117] border-white/10 shadow-inner shadow-black/40">
          <CardHeader>
            <CardTitle className="text-slate-200">Hosted Content</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-400 font-medium uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">CID</th>
                    <th className="px-6 py-4">Replicas</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-200">{item.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-400 text-xs">{item.cid}</td>
                      <td className="px-6 py-4">
                        <ReplicaBar count={item.replicas} max={15} />
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={item.status as any} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-yellow-400">
                          <Zap className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card className="bg-[#0d1117] border-white/10 shadow-inner shadow-black/40 h-fit">
          <CardHeader>
            <CardTitle className="text-slate-200">System Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {initialLogs.map((log, i) => (
              <LogEntry 
                key={i} 
                timestamp={log.timestamp} 
                message={log.message} 
                type={log.type as any} 
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

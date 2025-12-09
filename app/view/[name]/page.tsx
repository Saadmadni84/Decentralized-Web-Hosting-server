"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { resolveName } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Activity, Server, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ViewPage() {
  const params = useParams();
  const name = params.name as string;
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await resolveName(name);
        setContent(data);
      } catch (err) {
        setError("Content not found or de-indexed by DAO.");
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchContent();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-gray-400">Resolving {name} via dCDN...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Resolution Failed</h2>
        <p className="text-gray-400">{error}</p>
        <Button className="mt-6" onClick={() => window.location.href = "/"}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Main Content Viewer */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-grow"
      >
        <Card className="glass-card h-full min-h-[600px] flex flex-col">
          <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-mono">{name}</CardTitle>
              <p className="text-sm text-gray-400 mt-1">CID: {content.cid.substring(0, 12)}...</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-500 uppercase">{content.status}</span>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow bg-black/20 relative overflow-hidden flex items-center justify-center">
            {content.type === "image" ? (
              <img src={content.contentUrl} alt={name} className="max-w-full max-h-[600px] object-contain" />
            ) : (
              <div className="text-gray-500">Unsupported content type</div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full lg:w-80 space-y-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Network Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Latency</span>
              <span className="text-sm font-mono text-green-400">24ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Peers</span>
              <span className="text-sm font-mono">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Replicas</span>
              <span className="text-sm font-mono">12</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Moderation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">AI Scan Passed</p>
                  <p className="text-xs text-gray-400">No harmful content detected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">DAO Verified</p>
                  <p className="text-xs text-gray-400">Community approved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={() => window.location.href = "/report"}>
          Report Content
        </Button>
      </motion.div>
    </div>
  );
}

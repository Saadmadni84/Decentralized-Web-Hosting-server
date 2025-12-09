"use client";

import React, { useState } from "react";
import DAOCard from "@/components/DAOCard";
import Badge from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

const initialProposals = [
  { id: 1, target: "illegal-phishing-site.eth", probability: 92, votesBan: 0, votesKeep: 0 },
  { id: 2, target: "copyrighted-movie-stream.com", probability: 88, votesBan: 12, votesKeep: 4 },
];

const history = [
  { id: 101, target: "scam-token-drop.xyz", date: "2023-10-24", status: "De-indexed" },
  { id: 102, target: "political-blog-uncensored", date: "2023-10-22", status: "Active" },
  { id: 103, target: "malware-dist-node-4", date: "2023-10-20", status: "De-indexed" },
];

export default function DAOPage() {
  const [proposals, setProposals] = useState(initialProposals);

  const handleVote = (id: number, type: "ban" | "keep") => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesBan: type === "ban" ? p.votesBan + 1 : p.votesBan,
          votesKeep: type === "keep" ? p.votesKeep + 1 : p.votesKeep
        };
      }
      return p;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">DAO Moderation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voting Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-slate-300">Active Proposals</h2>
          {proposals.map(proposal => (
            <DAOCard
              key={proposal.id}
              target={proposal.target}
              probability={proposal.probability}
              votesBan={proposal.votesBan}
              votesKeep={proposal.votesKeep}
              onVoteBan={() => handleVote(proposal.id, "ban")}
              onVoteKeep={() => handleVote(proposal.id, "keep")}
            />
          ))}
        </div>

        {/* History Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-300">Governance History</h2>
          <Card className="bg-[#0d1117] border-white/10 shadow-inner shadow-black/40">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {history.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-slate-300 text-sm truncate max-w-[150px]">{item.target}</span>
                      <Badge status={item.status as any} />
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <History className="w-3 h-3" /> {item.date}
                      </span>
                      <span>#{item.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

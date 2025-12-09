"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";

interface DAOCardProps {
  target: string;
  probability: number;
  votesBan: number;
  votesKeep: number;
  onVoteBan: () => void;
  onVoteKeep: () => void;
}

export default function DAOCard({ target, probability, votesBan, votesKeep, onVoteBan, onVoteKeep }: DAOCardProps) {
  return (
    <Card className="bg-[#0d1117] border-white/10 shadow-inner shadow-black/40 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Alert Bar */}
        <div className="w-full md:w-2 bg-yellow-500/80 h-2 md:h-auto" />
        
        <CardContent className="flex-grow p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-200">Target: <span className="text-white">{target}</span></h3>
              <div className="flex items-center gap-2 mt-1 text-yellow-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">AI detected prohibited content (Probability: {probability}%)</span>
              </div>
            </div>
            <div className="flex gap-4 text-sm font-mono">
              <div className="text-center">
                <div className="text-red-400 font-bold text-xl">{votesBan}</div>
                <div className="text-gray-500 text-xs uppercase">Ban</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold text-xl">{votesKeep}</div>
                <div className="text-gray-500 text-xs uppercase">Keep</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onVoteBan}
              className="bg-red-500 hover:bg-red-600 text-white border-0 flex-1"
            >
              <ThumbsDown className="w-4 h-4 mr-2" /> Vote Ban
            </Button>
            <Button 
              onClick={onVoteKeep}
              className="bg-slate-700 hover:bg-slate-600 text-white border-0 flex-1"
            >
              <ThumbsUp className="w-4 h-4 mr-2" /> Vote Keep
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

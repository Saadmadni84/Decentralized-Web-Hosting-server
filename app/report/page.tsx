"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reportContent } from "@/lib/api";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportPage() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !reason) return;
    setIsSubmitting(true);
    try {
      await reportContent(name, reason);
      setSubmitted(true);
    } catch (error) {
      console.error("Report failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Card className="glass-card w-full max-w-md text-center p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
          <p className="text-gray-400 mb-6">
            A DAO proposal has been created to review this content. The community will vote on the action to be taken.
          </p>
          <Button onClick={() => window.location.href = "/dao"}>View DAO Proposals</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Report Content
            </CardTitle>
            <CardDescription>
              Flag content that violates community guidelines. This will trigger a DAO vote.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Content Name / URL</Label>
              <Input 
                id="name" 
                placeholder="e.g. illegal-site.eth" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Reporting</Label>
              <Textarea 
                id="reason" 
                placeholder="Describe the violation..." 
                className="min-h-[100px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white" 
              onClick={handleSubmit}
              disabled={!name || !reason || isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Report"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

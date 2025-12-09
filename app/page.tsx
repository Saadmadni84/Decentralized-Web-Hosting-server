"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Globe, Shield, Zap, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName) {
      router.push(`/view/${searchName}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
            The Intelligent Host
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Decentralized, AI-powered web hosting. Experience the future of censorship-resistant, optimized content delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/upload">
              <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 shadow-lg shadow-primary/20">
                Start Hosting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <form onSubmit={handleResolve} className="flex gap-2 w-full sm:w-auto">
              <div className="relative">
                <Input 
                  placeholder="Resolve name (e.g. demo)" 
                  className="h-12 w-full sm:w-64 bg-white/5 border-white/10"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <FeatureCard 
            icon={<Globe className="w-10 h-10 text-blue-400" />}
            title="Decentralized Hosting"
            description="Content stored on IPFS/Arweave, ensuring permanence and censorship resistance."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-yellow-400" />}
            title="AI-Powered dCDN"
            description="Smart routing and caching optimized by AI for lightning-fast delivery globally."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Shield className="w-10 h-10 text-green-400" />}
            title="DAO Governance"
            description="Community-driven content moderation. You decide what stays and what goes."
            delay={0.4}
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
        <CardHeader>
          <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

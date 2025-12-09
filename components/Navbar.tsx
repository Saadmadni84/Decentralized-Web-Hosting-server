import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cpu, Upload, Shield, LayoutDashboard, Activity } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Intelligent Host
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/network" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Network
          </Link>
          <Link href="/upload" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Link>
          <Link href="/dao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <Shield className="w-4 h-4" />
            DAO
          </Link>
          <Link href="/report" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Report
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="glass" size="sm" className="hidden sm:flex">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}

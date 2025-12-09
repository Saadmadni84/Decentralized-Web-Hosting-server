"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Check, Loader2, FileText } from "lucide-react";
import { uploadFile, registerName } from "@/lib/api";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState<"upload" | "register" | "success">("upload");
  const [cid, setCid] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      setCid(result.cid);
      setStep("register");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !cid) return;
    setIsUploading(true);
    try {
      await registerName(name, cid);
      setStep("success");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Upload & Host Content</CardTitle>
            <CardDescription>Deploy your content to the decentralized web.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === "upload" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-10 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center gap-2">
                    {file ? (
                      <>
                        <FileText className="w-10 h-10 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400" />
                        <span className="text-sm text-gray-400">Click to upload or drag and drop</span>
                      </>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleUpload} 
                  disabled={!file || isUploading}
                >
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Upload to IPFS"}
                </Button>
              </div>
            )}

            {step === "register" && (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-green-500">Content Uploaded</p>
                    <p className="text-xs text-gray-400 truncate">CID: {cid}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Register Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. my-awesome-site" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleRegister}
                  disabled={!name || isUploading}
                >
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register Name"}
                </Button>
              </div>
            )}

            {step === "success" && (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Successfully Deployed!</h3>
                <p className="text-gray-400">
                  Your content is now live at <span className="text-primary font-mono">{name}</span>
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = `/view/${name}`}>
                    View Content
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

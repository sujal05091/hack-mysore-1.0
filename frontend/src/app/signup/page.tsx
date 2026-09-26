"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Signup() {
  const [role, setRole] = useState<"candidate" | "reviewer" | "recruiter">("candidate");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Create account in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Create the user in our PostgreSQL Backend
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, full_name: fullName, role }),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to save to database: ${errorData}`);
      }
      
      router.push("/login?message=Account created! Please sign in.");
    } catch (err: any) {
      setError(err.message || "Account created, but failed to sync with backend.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EDE4] text-gray-900 flex items-center justify-center relative overflow-hidden p-6 selection:bg-primary/30">
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors z-20 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-md relative z-10 mt-8">
        <div className="bg-white/80 border border-white backdrop-blur-xl rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Create an Account</h1>
            <p className="text-gray-500 text-sm">Join VerifiCode and build proof of your skills.</p>
          </div>

          {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-600 rounded mb-4 text-sm font-medium">{error}</div>}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-3 gap-2">
              <Button type="button" onClick={() => setRole("candidate")} variant="outline" className={role === "candidate" ? "bg-white border-primary text-primary hover:bg-primary/5 font-semibold text-xs" : "bg-white/50 border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 font-medium text-xs"}>
                Candidate
              </Button>
              <Button type="button" onClick={() => setRole("reviewer")} variant="outline" className={role === "reviewer" ? "bg-white border-primary text-primary hover:bg-primary/5 font-semibold text-xs" : "bg-white/50 border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 font-medium text-xs"}>
                Reviewer
              </Button>
              <Button type="button" onClick={() => setRole("recruiter")} variant="outline" className={role === "recruiter" ? "bg-white border-primary text-primary hover:bg-primary/5 font-semibold text-xs" : "bg-white/50 border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 font-medium text-xs"}>
                Recruiter
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input type="email" placeholder="developer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary" />
            </div>

            <Button disabled={loading} className="w-full h-12 mt-6 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all border border-primary/50 font-semibold text-base">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500 font-medium">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

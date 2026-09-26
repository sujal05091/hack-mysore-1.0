"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${email}`);
        if (res.ok) {
          const user = await res.json();
          if (user.role === "reviewer") router.push("/reviewer");
          else if (user.role === "recruiter") router.push("/recruiter");
          else router.push("/candidate");
        } else {
          router.push("/candidate");
        }
      } catch {
        router.push("/candidate");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE4] text-gray-900 flex items-center justify-center relative overflow-hidden p-6 selection:bg-primary/30">
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors z-20 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/80 border border-white backdrop-blur-xl rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-primary font-bold text-2xl shadow-sm mx-auto mb-4">V</div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to your VerifiCode account</p>
          </div>

          {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-600 rounded mb-4 text-sm font-medium">{error}</div>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input type="email" placeholder="developer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary" />
            </div>

            <Button disabled={loading} className="w-full h-12 mt-4 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all border border-primary/50 text-base font-semibold">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500 font-medium">
            Don't have an account? <Link href="/signup" className="text-primary hover:underline font-bold">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

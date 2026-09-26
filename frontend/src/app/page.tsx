"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Code, Zap, ArrowRight, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0EDE4] text-gray-900 overflow-hidden relative selection:bg-primary/30">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/20 border border-primary/50 rounded-xl flex items-center justify-center text-primary font-bold text-xl shadow-sm">
            V
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">VerifiCode</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all border border-primary/50">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-6 max-w-5xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary-foreground text-sm mb-8 font-medium shadow-sm bg-white"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-gray-800">The New Standard in Technical Hiring</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-gray-900"
        >
          Build Proof. <br className="hidden md:block" /> Not Just Profiles.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10"
        >
          Stop relying on static resumes. VerifiCode tracks how you build, grills you with AI to test your knowledge, and proves your true engineering capability.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              Start Building <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/candidate">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/60 border-gray-300 hover:bg-white text-gray-900 backdrop-blur-md">
              View Demo Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
          {[
            { icon: Code, title: "Verified Coding Arena", desc: "Code in a secure, fullscreen environment with integrity tracking." },
            { icon: BrainCircuit, title: "AI Project Defense", desc: "Defend your code against our AI interviewer to prove authorship." },
            { icon: ShieldCheck, title: "Decision Fusion Engine", desc: "Get a final Trust Score based on code, telemetry, and defense." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-primary flex items-center justify-center mb-4 shadow-sm">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

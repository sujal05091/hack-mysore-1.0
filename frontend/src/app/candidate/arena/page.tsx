import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, LayoutTemplate, Server, Bug, Cpu } from "lucide-react";

export default function ArenaSelection() {
  const categories = [
    { name: "DSA", icon: Code2, desc: "Algorithms and Data Structures" },
    { name: "SQL", icon: Database, desc: "Database Queries & Optimization" },
    { name: "Backend", icon: Server, desc: "API Design & Logic" },
    { name: "Frontend", icon: LayoutTemplate, desc: "UI & State Management" },
    { name: "Debugging", icon: Bug, desc: "Find and fix broken code" },
    { name: "System Design", icon: Cpu, desc: "Scalable Architecture" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verified Coding Arena</h1>
        <p className="text-secondary mt-1">Select a challenge category to prove your problem-solving skills under controlled conditions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <category.icon className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4 mt-8">Recommended Challenges</h2>
        <div className="space-y-4">
          
          <div className="p-4 border border-border rounded-lg bg-background flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">LRU Cache Implementation</h4>
                <span className="px-2 py-0.5 bg-muted text-xs font-medium rounded text-secondary">DSA</span>
                <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs font-medium rounded">Medium</span>
              </div>
              <p className="text-sm text-secondary mt-1">Design and implement a data structure for Least Recently Used (LRU) cache.</p>
            </div>
            <Link href="/arena/lru-cache">
              <Button>Start Challenge</Button>
            </Link>
          </div>

          <div className="p-4 border border-border rounded-lg bg-background flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">Rate Limiter Middleware</h4>
                <span className="px-2 py-0.5 bg-muted text-xs font-medium rounded text-secondary">Backend</span>
                <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded">Hard</span>
              </div>
              <p className="text-sm text-secondary mt-1">Implement a sliding window rate limiter in Python.</p>
            </div>
            <Link href="/arena/rate-limiter">
              <Button>Start Challenge</Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

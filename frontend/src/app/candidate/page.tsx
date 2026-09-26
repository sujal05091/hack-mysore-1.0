import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FolderKanban, ShieldCheck } from "lucide-react";

export default function CandidateDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good morning, Sujal</h1>
        <p className="text-secondary mt-1">Here is your engineering profile progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Projects Verified</CardTitle>
            <FolderKanban className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">05</div>
            <p className="text-xs text-secondary mt-1">↑ 2 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Challenges Completed</CardTitle>
            <Code2 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">14</div>
            <p className="text-xs text-secondary mt-1">Top 15% in Backend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Defenses Completed</CardTitle>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">09</div>
            <p className="text-xs text-secondary mt-1">Average Score: 84/100</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Capability Overview</CardTitle>
            <CardDescription>Your verified skill scores based on evidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SkillBar name="Python" score={89} />
            <SkillBar name="FastAPI" score={91} />
            <SkillBar name="PostgreSQL" score={87} />
            <SkillBar name="Algorithms" score={82} />
            <SkillBar name="System Design" score={74} />
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Continue building your proof of work.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="p-4 border border-border rounded-lg bg-background">
              <h4 className="font-semibold text-sm mb-1">Pending Project Review</h4>
              <p className="text-xs text-secondary mb-3">Your URL Shortener API is waiting for human verification.</p>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[83%] rounded-full" />
              </div>
              <p className="text-xs text-right mt-1 text-secondary">83% Complete</p>
            </div>
          </CardContent>
          <div className="p-6 pt-0 flex gap-3 mt-auto">
            <Button className="w-full">Continue Building</Button>
            <Button variant="outline" className="w-full">Start Challenge</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SkillBar({ name, score }: { name: string, score: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium w-28">{name}</span>
      <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000" 
          style={{ width: `${score}%` }} 
        />
      </div>
      <span className="text-sm font-bold w-8 text-right">{score}</span>
    </div>
  );
}

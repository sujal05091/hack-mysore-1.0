import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ShieldCheck, Code2 } from "lucide-react";

export default function RecruiterDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discover Talent</h1>
        <p className="text-secondary mt-1">Search engineers by verified capability and proof of work.</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by role or technology (e.g. Backend Developer)..." 
            className="pl-10 h-12 text-base bg-card border-border"
          />
        </div>
        <Button variant="outline" className="h-12 px-6 gap-2 border-border text-foreground">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Verified Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center space-x-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border" defaultChecked />
                <span>Verified Projects</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border" defaultChecked />
                <span>Coding Arena Tests</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span>AI Project Defense</span>
              </label>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">Rahul Kumar</h3>
                <p className="text-sm font-medium text-primary mb-4">Backend Developer</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-2 py-1 bg-muted rounded text-xs font-medium flex gap-1 items-center">
                    Python <span className="text-primary ml-1">89</span>
                  </div>
                  <div className="px-2 py-1 bg-muted rounded text-xs font-medium flex gap-1 items-center">
                    FastAPI <span className="text-primary ml-1">91</span>
                  </div>
                  <div className="px-2 py-1 bg-muted rounded text-xs font-medium flex gap-1 items-center">
                    PostgreSQL <span className="text-primary ml-1">87</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-secondary">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-success" /> 5 Verified Projects</span>
                  <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-primary" /> 14 Challenges</span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 w-full md:w-32 border-l border-border pl-6">
                <Button className="w-full">Shortlist</Button>
                <Button variant="outline" className="w-full">Evidence</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

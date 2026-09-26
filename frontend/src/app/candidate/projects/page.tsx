import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Plus, Github, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export default function ProjectsList() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-secondary mt-1">Manage your submitted projects and track verification status.</p>
        </div>
        <Link href="/candidate/projects/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Submit New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>URL Shortener API</CardTitle>
                <CardDescription className="mt-1">FastAPI • PostgreSQL • Redis</CardDescription>
              </div>
              <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-secondary line-clamp-2">
              A high-performance URL shortening service featuring rate limiting via Redis and persistent storage in PostgreSQL.
            </p>
            <div className="flex flex-col gap-2 mt-4 text-sm font-medium">
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Github className="w-4 h-4" /> sujal05091/url-shortener
              </a>
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <LinkIcon className="w-4 h-4" /> https://url.example.com
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-border flex justify-between items-center">
              <span className="text-xs text-secondary">Verified on Oct 12, 2023</span>
              <Button variant="outline" size="sm">View Evidence</Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty state placeholder for next project */}
        <Card className="border-dashed border-2 border-border bg-transparent flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <FolderKanban className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Build your portfolio</h3>
          <p className="text-sm text-secondary max-w-sm mb-6">
            Submit another project to generate evidence and improve your capability profile.
          </p>
          <Link href="/candidate/projects/new">
            <Button variant="outline">Submit a Project</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Github, UploadCloud } from "lucide-react";

export default function NewProjectForm() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/candidate/projects">
          <Button variant="ghost" size="icon" className="text-secondary hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submit a Project</h1>
          <p className="text-secondary mt-1">Provide verifiable evidence of your engineering work.</p>
        </div>
      </div>

      <form className="space-y-8 mt-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Details about what you built and your role.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Name</Label>
              <Input id="title" placeholder="e.g. VerifiCode Platform" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Briefly describe what this project does..." 
                className="bg-background min-h-[100px]" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stack">Technology Stack</Label>
                <Input id="stack" placeholder="e.g. React, Next.js, Python, PostgreSQL" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" placeholder="e.g. Backend Lead, Solo Developer" className="bg-background" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Code Evidence (Friend 1's hook) */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Github className="w-5 h-5" /> Source Code Evidence
            </CardTitle>
            <CardDescription>
              Connect your GitHub repository to allow our platform to analyze your commits and code structure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="outline" className="gap-2 bg-background">
              <Github className="w-4 h-4" /> Connect GitHub Repository
            </Button>
            <p className="text-xs text-secondary mt-3 italic">
              * Note: The GitHub verification parsing will be handled automatically by the Verification Engine (Friend 1's integration).
            </p>
          </CardContent>
        </Card>

        {/* Architecture & Deployment */}
        <Card>
          <CardHeader>
            <CardTitle>Architecture & Deployment</CardTitle>
            <CardDescription>Provide evidence of your system design and live deployment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="deployment">Live Deployment URL (Optional)</Label>
              <Input id="deployment" placeholder="https://" className="bg-background" />
            </div>
            
            <div className="space-y-2">
              <Label>Architecture Decision Record (ADR)</Label>
              <Textarea 
                placeholder="Explain a major technical decision you made. Why did you choose a specific database or framework? What were the trade-offs?" 
                className="bg-background min-h-[120px]" 
              />
            </div>

            <div className="space-y-2">
              <Label>Architecture Diagram (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center bg-background/50 text-center hover:bg-muted transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-secondary mb-3" />
                <span className="text-sm font-medium">Click to upload or drag and drop</span>
                <span className="text-xs text-secondary mt-1">PNG, JPG, or PDF (max 5MB)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/candidate/projects">
            <Button variant="ghost" type="button">Cancel</Button>
          </Link>
          <Button type="submit" className="px-8">Submit Project for Verification</Button>
        </div>
      </form>
    </div>
  );
}

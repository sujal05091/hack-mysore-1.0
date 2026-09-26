import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ReviewerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviewer Dashboard</h1>
        <p className="text-secondary mt-1">Manage your assigned technical verifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Pending Reviews</CardTitle>
            <Clock className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Completed Today</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Verification Accuracy</CardTitle>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">98%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Submissions</CardTitle>
          <CardDescription>Projects waiting for technical verification and code quality review.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
              <div>
                <h4 className="font-semibold text-foreground">URL Shortener API</h4>
                <p className="text-sm text-secondary">Candidate: Rahul Kumar • Stack: FastAPI, PostgreSQL</p>
              </div>
              <Button>Start Review</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
              <div>
                <h4 className="font-semibold text-foreground">Real-time Chat App</h4>
                <p className="text-sm text-secondary">Candidate: Priya Sharma • Stack: React, Socket.io</p>
              </div>
              <Button>Start Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

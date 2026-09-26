import Link from "next/link";
import { LayoutDashboard, FolderKanban, Code2, ShieldCheck, Trophy, Target, Star, Settings, Bell } from "lucide-react";

export function Sidebar({ role = "candidate" }: { role?: "candidate" | "reviewer" | "recruiter" }) {
  // Navigation changes based on role (Phase 3 spec)
  const navItems = {
    candidate: [
      { name: "Overview", icon: LayoutDashboard, href: "/candidate" },
      { name: "Projects", icon: FolderKanban, href: "/candidate/projects" },
      { name: "Coding Arena", icon: Code2, href: "/candidate/arena" },
      { name: "AI Defense", icon: ShieldCheck, href: "/candidate/defense" },
      { name: "Capability", icon: Target, href: "/candidate/capability" },
      { name: "Reviews", icon: Star, href: "/candidate/reviews" },
      { name: "Rankings", icon: Trophy, href: "/candidate/rankings" },
      { name: "Settings", icon: Settings, href: "/candidate/settings" },
    ],
    reviewer: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/reviewer" },
      { name: "Assignments", icon: FolderKanban, href: "/reviewer/assignments" },
      { name: "Verification", icon: ShieldCheck, href: "/reviewer/verification" },
    ],
    recruiter: [
      { name: "Discover Talent", icon: Target, href: "/recruiter" },
      { name: "Hiring Requirements", icon: FolderKanban, href: "/recruiter/requirements" },
      { name: "Shortlist", icon: Star, href: "/recruiter/shortlist" },
    ]
  };

  const links = navItems[role] || navItems.candidate;

  return (
    <aside className="w-64 border-r border-border bg-card h-full flex flex-col p-4 space-y-2">
      <div className="flex items-center space-x-2 px-2 py-4 mb-4">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">V</div>
        <span className="font-bold text-xl tracking-tight text-foreground">VerifiCode</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {links.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-secondary hover:bg-muted hover:text-foreground transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

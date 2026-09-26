import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopNav() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex-1 max-w-md flex items-center relative">
        <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-9 bg-background border-border"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-secondary">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
          SK
        </div>
      </div>
    </header>
  );
}

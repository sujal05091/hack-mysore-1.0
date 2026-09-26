"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Play, Send, CheckCircle2, XCircle, Maximize, AlertTriangle, Monitor, Camera, Mic } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const boilerplates: Record<string, string> = {
  python: `class LRUCache:
    def __init__(self, capacity: int):
        pass
        
    def get(self, key: int) -> int:
        pass
        
    def put(self, key: int, value: int) -> None:
        pass`,
  javascript: `class LRUCache {
    constructor(capacity) {
        
    }
    
    get(key) {
        
    }
    
    put(key, value) {
        
    }
}`,
  cpp: `class LRUCache {
public:
    LRUCache(int capacity) {
        
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        
    }
};`,
  java: `class LRUCache {
    public LRUCache(int capacity) {
        
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
        
    }
}`,
  go: `type LRUCache struct {
    
}

func Constructor(capacity int) LRUCache {
    return LRUCache{}
}

func (this *LRUCache) Get(key int) int {
    return -1
}

func (this *LRUCache) Put(key int, value int)  {
    
}`
};

export default function ChallengeArena({ params }: { params: { challengeId: string } }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(boilerplates["python"]);
  const [permissions, setPermissions] = useState({ camera: false, mic: false, screen: false });
  const [warnings, setWarnings] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update boilerplate when language changes
  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    setCode(boilerplates[val]);
  };

  // Telemetry & Integrity Engine Simulation
  useEffect(() => {
    if (!hasStarted) return;

    // Track tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setWarnings(prev => [...prev, "Tab switched or minimized"]);
        console.log("[INTEGRITY EVENT]: Tab Switched");
      }
    };

    // Track fullscreen exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setWarnings(prev => [...prev, "Exited fullscreen mode"]);
        console.log("[INTEGRITY EVENT]: Exited Fullscreen");
      }
    };

    // Track global paste events
    const handlePaste = (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData("text") || "";
      if (pastedText.length > 50) {
        console.log(`[INTEGRITY EVENT]: Large Paste (${pastedText.length} chars)`);
        setWarnings(prev => [...prev, "Large block of code pasted"]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("paste", handlePaste);
    };
  }, [hasStarted]);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissions(p => ({ ...p, camera: true, mic: true }));
      await navigator.mediaDevices.getDisplayMedia({ video: true });
      setPermissions(p => ({ ...p, screen: true }));
    } catch (error) {
      console.error("Permission denied:", error);
      alert("You must grant camera, mic, and screen share permissions to start.");
    }
  };

  const startChallenge = async () => {
    if (!permissions.camera || !permissions.screen) {
      alert("Please complete the security setup first.");
      return;
    }
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setHasStarted(true);
    } catch (err) {
      console.error("Failed to enter fullscreen", err);
    }
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Integrity Setup</CardTitle>
            <CardDescription>
              To ensure a fair and verified environment, please allow the following permissions before starting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Camera & Microphone</span>
                </div>
                {permissions.camera ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <span className="text-sm text-secondary">Required</span>
                )}
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Screen Share</span>
                </div>
                {permissions.screen ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <span className="text-sm text-secondary">Required</span>
                )}
              </div>
            </div>

            {!permissions.screen ? (
              <Button className="w-full" onClick={requestPermissions}>
                Grant Permissions
              </Button>
            ) : (
              <Button className="w-full" onClick={startChallenge}>
                Enter Fullscreen & Start Challenge
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden animate-in fade-in" ref={containerRef}>
      
      {/* Integrity Warning Banner */}
      {warnings.length > 0 && (
        <div className="bg-destructive text-destructive-foreground px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 z-50 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          INTEGRITY WARNING: {warnings[warnings.length - 1]}
        </div>
      )}

      {/* Top Navbar for Arena */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/candidate/arena">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary" onClick={() => {
              if (document.fullscreenElement) document.exitFullscreen();
            }}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="font-semibold text-sm">Challenge: LRU Cache</div>
        </div>
        
        {/* Language Selection */}
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 h-8 text-xs bg-background">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="go">Go</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm font-medium text-warning bg-warning/10 px-3 py-1 rounded">
            <Clock className="w-4 h-4" /> 00:38:42
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-8 text-secondary">
            <Play className="w-4 h-4" /> Run Code
          </Button>
          <Button size="sm" className="gap-2 h-8 px-4">
            <Send className="w-4 h-4" /> Submit
          </Button>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Statement */}
        <div className="w-1/3 border-r border-border bg-card overflow-y-auto p-6">
          <h2 className="text-xl font-bold mb-4">LRU Cache</h2>
          <div className="prose prose-sm dark:prose-invert">
            <p>Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU) cache</strong>.</p>
            <p>Implement the <code>LRUCache</code> class:</p>
            <ul>
              <li><code>LRUCache(int capacity)</code> Initialize the LRU cache with positive size capacity.</li>
              <li><code>int get(int key)</code> Return the value of the key if the key exists, otherwise return <code>-1</code>.</li>
              <li><code>void put(int key, int value)</code> Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.</li>
            </ul>
            <p>The functions <code>get</code> and <code>put</code> must each run in <code>O(1)</code> average time complexity.</p>
          </div>
        </div>

        {/* Right Panel: Editor and Terminal */}
        <div className="flex-1 flex flex-col h-full bg-[#1E1E1E]">
          <div className="flex-1 w-full pt-4 relative">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "JetBrains Mono",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {/* Terminal / Test Cases Panel */}
          <div className="h-64 border-t border-[#333333] bg-[#0A0A0A] flex flex-col shrink-0">
            <div className="flex items-center gap-4 px-4 h-10 border-b border-[#333333] bg-[#141414] text-xs font-medium text-gray-400">
              <button className="text-white border-b-2 border-white h-full px-1">Test Cases</button>
              <button className="hover:text-white transition-colors h-full px-1">Console</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-200">Test Case 1</div>
                  <div className="text-xs text-gray-500">Passed (2ms)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

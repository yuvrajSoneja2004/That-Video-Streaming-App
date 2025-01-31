import { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditorSidebar } from "./EditorSidebar";
import { useGlobalState } from "@/states/global";
export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const { setShowSidebar } = useGlobalState();

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new Canvas(canvasRef.current, {
        width: window.innerWidth - 320, // Accounting for sidebar
        height: window.innerHeight - 100, // Accounting for header
        backgroundColor: "white",
      });

      setFabricCanvas(canvas);
      setShowSidebar(false);

      const handleResize = () => {
        canvas.setWidth(window.innerWidth - 320);
        canvas.setHeight(window.innerHeight - 100);
        canvas.renderAll();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        canvas.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [fabricCanvas]);

  return (
    <div className="flex h-screen">
      <EditorSidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center px-4 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Your Story templates" className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Share</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Export</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </Button>
          </div>
        </header>

        <div className="flex-1 p-4 bg-muted/10">
          <div
            className={cn(
              "bg-white rounded-lg shadow-sm mx-auto",
              "w-[40%] max-w-5xl h-[calc(100vh-8rem)]",
              "flex items-center justify-center"
            )}
          >
            <canvas ref={canvasRef} className="w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}

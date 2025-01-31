import {
  Crown,
  Image,
  Layout,
  PenTool,
  Sparkle,
  Sticker,
  Text,
  Type,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EditorSidebar() {
  return (
    <div className="w-80 border-r flex flex-col">
      <div className="h-16 border-b flex items-center px-4">
        <Button variant="ghost" size="icon" className="shrink-0">
          <span className="sr-only">Menu</span>
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
            className="h-6 w-6"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        </Button>
      </div>

      <Tabs defaultValue="templates" className="flex-1">
        <TabsList className="w-full justify-start rounded-none border-b h-12 px-4 gap-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="templates" className="m-0 p-4">
            <nav className="grid gap-2">
              <Button variant="ghost" className="justify-start gap-2">
                <Sticker className="h-4 w-4" />
                Stickers
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Type className="h-4 w-4" />
                Text
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Sparkle className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <PenTool className="h-4 w-4" />
                Draw
              </Button>
            </nav>
          </TabsContent>

          <TabsContent value="styles" className="m-0 p-4">
            <div className="text-sm text-muted-foreground">
              Style options will appear here
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

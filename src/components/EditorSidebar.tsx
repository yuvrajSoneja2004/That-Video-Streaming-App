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
import { useStoryEditorState } from "@/states/storyEditor";
import { EDITOR_ITEMS } from "@/utils/editorStickers";
import { useState } from "react";
import { fabric } from "fabric";

export function EditorSidebar() {
  const { updateCreateText, currentOptionSelected } = useStoryEditorState();
  const createText = () => {
    updateCreateText();
  };

  const [tab, setTab] = useState<"styleType" | "styleOptions">("styleType");

  const onTabChange = (value) => {
    setTab(value);
  };

  const navItems = [
    { icon: Sticker, label: "Stickers" },
    { icon: Type, label: "Text", onClick: createText },
    { icon: PenTool, label: "Draw" },
  ];

  const createObjectOnCanvas = (
    url: string,
    currentOptionSelected: string,
    fontFamily: string = "Arial"
  ) => {
    // fabric.Image.fromURL(url, (img) => {
    //   canvas.add(img);
    // });
    useStoryEditorState.setState({
      selectedSticker: url,
      textStyles: { selectedFont: fontFamily, textColor: "#000" },
    });
  };

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

      <Tabs
        defaultValue="styleType"
        className="flex-1"
        value={tab}
        onValueChange={onTabChange}
      >
        <TabsList className="w-full justify-start rounded-none border-b h-12 px-4 gap-4">
          <TabsTrigger value="styleType">Templates</TabsTrigger>
          <TabsTrigger value="styleOptions">Styles</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="styleType" className="m-0 p-4">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start gap-2"
                  onClick={() => {
                    item.onClick?.();
                    useStoryEditorState.setState({
                      currentOptionSelected: item.label,
                      isPenSelected: item.label == "Draw" ? true : false,
                    });
                    if (item.label != "Draw") {
                      onTabChange("styleOptions");
                    }
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </TabsContent>

          <TabsContent value="styleOptions" className="m-0 p-4">
            <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2 place-items-center">
              {EDITOR_ITEMS[currentOptionSelected || "Stickers"].map(
                (sticker) => (
                  <div
                    className="hover:bg-green-400"
                    onClick={() =>
                      createObjectOnCanvas(
                        sticker.url,
                        currentOptionSelected,
                        sticker.fontFamily || ""
                      )
                    }
                  >
                    <img
                      src={sticker.url}
                      alt={sticker.name}
                      className="h-24 w-24 object-cover"
                    />
                    <span>{sticker.name}</span>
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

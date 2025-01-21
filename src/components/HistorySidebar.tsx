import {
  Clock,
  MessageCircle,
  Pause,
  Search,
  Settings2,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function HistorySidebar() {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      className="border-l"
      side="right"
      variant={isMobile ? "floating" : "sidebar"}
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <SidebarTrigger className="lg:hidden" />
        <form className="flex w-full items-center space-x-2">
          <Input
            type="search"
            placeholder="Search watch history"
            className="h-9"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="h-9 w-9 shrink-0"
          >
            <Search className="size-4" />
            <span className="sr-only">Search history</span>
          </Button>
        </form>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Trash2 className="size-4" />
                  <span>Clear all watch history</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Pause className="size-4" />
                  <span>Pause watch history</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings2 className="size-4" />
                  <span>Manage all history</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Other history types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageCircle className="size-4" />
                  <span>Comments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Clock className="size-4" />
                  <span>Posts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="size-4" />
                  <span>Live chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

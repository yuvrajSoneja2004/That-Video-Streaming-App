import { HistoryList } from "@/components/HistoryList";
import { HistorySidebar } from "@/components/HistorySidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function UserHistoryPage() {
  return (
    <SidebarProvider>
      {/* This right here */}
      <div className="flex min-h-screen bg-background w-full">
        <SidebarInset className="flex flex-1 flex-col">
          <main className="flex-1 overflow-auto">
            <HistoryList />
          </main>
          {/* <HistorySidebar /> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

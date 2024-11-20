
import { Navbar } from "@/components/NavigationBar"
import { Sidebar } from "@/components/Sidebar"
import { VideoGrid } from "@/components/VideoGrid"
import * as React from "react"
// import { Sidebar } from "./Sidebar"
// import { Navbar } from "./Navbar"
// import { VideoGrid } from "./VideoGrid"

export default function TestHome({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-black text-white">
      {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
      <div className="flex-1 overflow-auto">
        <Navbar onMenuClick={toggleSidebar} />
        {/* <VideoGrid /> */}
        {children}
      </div>
    </div>
  )
}
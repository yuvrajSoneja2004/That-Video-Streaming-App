import { Button } from "@/components/ui/button"
import { Gamepad2, Home, Flame, Library, History, Clock, Heart, Settings } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 mb-8">
            <Gamepad2 className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold text-white">GameStream</span>
          </div>
          
          <nav className="space-y-6 flex-grow">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Home className="h-5 w-5" /> Home
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Flame className="h-5 w-5" /> Trending
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Library className="h-5 w-5" /> Library
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 px-3">Library</h3>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <History className="h-5 w-5" /> History
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Clock className="h-5 w-5" /> Watch Later
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Heart className="h-5 w-5" /> Liked Videos
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 px-3">Settings</h3>
              <Button variant="ghost" className="w-full justify-start gap-2 text-white">
                <Settings className="h-5 w-5" /> Settings
              </Button>
            </div>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
    </>
  )
}
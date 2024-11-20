import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Mic, Search, Bell, Menu, Plus, User, Moon, LogOut } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const categories = [
    "All", "Gaming", "Music", "Recently Uploaded", "Watched", "Subscribers"
  ]

  const creators = Array.from({length: 15}, (_, i) => ({
    name: `Creator ${i + 1}`,
    image: `/placeholder.svg?height=32&width=32`,
    isLive: i % 3 === 0
  }))

  return (
    <header className="sticky top-0 z-10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-gray-800">
      <div className="flex items-center justify-between gap-4 p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 flex items-center gap-2 max-w-xl">
          <Input 
            placeholder="Search" 
            className="bg-gray-900 border-gray-700"
          />
          <Button size="icon" variant="secondary">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Mic className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsDarkMode(!isDarkMode)}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode} 
                  className="ml-auto"
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap border-t border-gray-800">
        <div className="flex p-4 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="secondary"
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex px-4 gap-4">
          {creators.map((creator, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex-col gap-1 h-auto relative"
            >
              <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-offset-black ring-yellow-500">
                <AvatarImage src={creator.image} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-white">{creator.name}</span>
              {creator.isLive && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </header>
  )
}
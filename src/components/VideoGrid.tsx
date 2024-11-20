import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"


export function VideoGrid() {
  const videos = Array.from({length: 12}, (_, i) => ({
    id: i,
    title: `How to master game ${i + 1}`,
    author: `Pro Gamer ${i + 1}`,
    views: `${Math.floor(Math.random() * 900 + 100)}K views`,
    time: `${Math.floor(Math.random() * 23 + 1)} hours ago`,
    thumbnail: `/placeholder.svg?height=200&width=360`,
    authorAvatar: `/placeholder.svg?height=32&width=32`,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Card key={video.id} className="bg-gray-900 border-gray-800 overflow-hidden group">
          <CardContent className="p-0">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={video.authorAvatar} />
                <AvatarFallback>{video.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold line-clamp-2 text-white">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.author}</p>
                <p className="text-sm text-gray-400">
                  {video.views} • {video.time}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
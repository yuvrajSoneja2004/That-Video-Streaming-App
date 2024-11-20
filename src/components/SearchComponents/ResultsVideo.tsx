import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { Badge } from "@/components/ui/badge"
import { Video } from "../../types/search"
import RelativeTime from "../../utils/RelativeTime"
import { formatViews } from "../../utils/formatViews"
import { CheckCircle } from 'lucide-react'

export default function ResultsVideo({ data }: { data: Video }) {
  const [showPreviewGif, setShowPreviewGif] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <Card
      className="flex flex-col sm:flex-row bg-black border-gray-900 text-white cursor-pointer w-full max-w-[1096px] hover:bg-gray-900 transition-colors"
      onClick={() => navigate(`/watch/${data?.videoUrl}`)}
      onMouseEnter={() => setShowPreviewGif(true)}
      onMouseLeave={() => setShowPreviewGif(false)}
    >
      <div className="relative w-full sm:w-[360px] flex-shrink-0">
        <img
          src={!showPreviewGif ? data?.thumbnailUrl : data?.previewGif}
          alt="Video thumbnail"
          className="w-full aspect-video object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
        />
        <Badge 
          variant="secondary" 
          className="absolute bottom-2 right-2 bg-black/80 text-white"
        >
          15:35
        </Badge>
      </div>
      <CardContent className="flex flex-col justify-between p-4 w-full">
        <div>
          <h2 className="text-xl font-semibold mb-2">{data?.title}</h2>
          <p className="text-sm text-gray-400 mb-2">
            {formatViews(data?.views)} • <RelativeTime createdAt={data?.createdAt} />
          </p>
        </div>
        <Link to={`/channel/${data?.channel?.id}`} className="flex items-center mt-2 hover:text-gray-300">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src={data?.channel.avatarUrl} alt={data?.channel?.name} />
            <AvatarFallback>{data?.channel?.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm flex items-center">
            {data?.channel?.name}
            {data?.channel?.verified && (
              <CheckCircle className="w-4 h-4 ml-1 text-blue-500" />
            )}
          </span>
        </Link>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{data?.channel.description}</p>
      </CardContent>
    </Card>
  )
}
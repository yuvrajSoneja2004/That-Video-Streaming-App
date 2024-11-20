"use client"

import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQueries } from "react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreVertical,
  MessageCircle,
} from "lucide-react"
import { fetchVideoMetaData } from "../helpers/video/fetchVideoMetaData"
import { fetchUpNextSuggestions } from "../helpers/video/fetchUpNextSuggestions"
import { formatViews } from "../utils/formatViews"
import RelativeTime from "../utils/RelativeTime"
import CommentSection from "../components/CommentSection"
import CustomVideoPlayer from "../components/CustomPlayer"
import UpNextVideoCard from "../components/UpNextVideoCard"

export default function SingleVideoPage() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { videoId } = useParams()
  
  const queryResults = useQueries([
    {
      queryKey: ["videoMetadata", videoId],
      queryFn: () => fetchVideoMetaData(videoId),
    },
    {
      queryKey: ["videoSuggestions", videoId],
      queryFn: () => fetchUpNextSuggestions(videoId),
    },
  ])

  const [videoMetaDataInfo, videoSuggestionsInfo] = queryResults
  const videoMetaData = videoMetaDataInfo.data
  const channelInfo = videoMetaData?.channel

  if (videoMetaDataInfo.isLoading || videoSuggestionsInfo?.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="rounded-lg overflow-hidden mb-4">
              <CustomVideoPlayer bitrates={videoMetaData?.bitrates} />
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">{videoMetaData?.title}</h1>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 object-fill">
                    <AvatarImage src={channelInfo?.avatarUrl} alt={channelInfo?.name} className="object-fill"/>
                    <AvatarFallback>{channelInfo?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{channelInfo?.name}</span>
                    <span className="text-sm text-gray-400">{formatViews(videoMetaData?.views)} subscribers</span>
                  </div>
                  <Button
                    variant={isSubscribed ? "outline" : "default"}
                    className={isSubscribed ? "bg-gray-800" : "bg-yellow-500 hover:bg-red-700"}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-800 rounded-full">
                    <Button variant="ghost" className="rounded-l-full">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {videoMetaData?.likes.length}K
                    </Button>
                    <Separator orientation="vertical" />
                    <Button variant="ghost" className="rounded-r-full">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      {videoMetaData?.dislikes.length}K
                    </Button>
                  </div>
                  <Button variant="secondary" className="rounded-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Video Description */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {formatViews(videoMetaData?.views)} views • <RelativeTime createdAt={videoMetaData?.createdAt} />
                  </p>
                  <p className="text-sm whitespace-pre-line">{videoMetaData?.description}</p>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <div className="mt-6">
                <CommentSection />
              </div>
            </div>
          </div>

          {/* Sidebar - Up Next */}
          <div className="lg:w-[360px] space-y-4">
            <h2 className="text-lg font-semibold">Up Next</h2>
            <div className="space-y-3">
              {videoSuggestionsInfo?.data?.map((video, index) => (
                <UpNextVideoCard key={index} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
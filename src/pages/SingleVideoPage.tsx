"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQueries } from "react-query"
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
  Heart,
  Bookmark,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { fetchVideoMetaData } from "../helpers/video/fetchVideoMetaData";
import { fetchUpNextSuggestions } from "../helpers/video/fetchUpNextSuggestions";
import { formatViews } from "../utils/formatViews";
import RelativeTime from "../utils/RelativeTime";
import CommentSection from "../components/CommentSection";
import CustomVideoPlayer from "../components/CustomPlayer";
import UpNextVideoCard from "../components/UpNextVideoCard";
import { useGlobalState } from "@/states/global";
import { ShareModal } from "@/components/models/ShareModal";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { saveToWatchLaterHelper } from "@/helpers/saveToWatchLaterHelper";
import { useUserStore } from "@/states/user";

export default function SingleVideoPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { videoId } = useParams();
  const [user] = useAuthState(auth);
  const { setShowSidebar } = useGlobalState();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { userInfo } = useUserStore();

  const queryResults = useQueries([
    {
      queryKey: ["videoMetadata", videoId],
      queryFn: () => fetchVideoMetaData(videoId),
    },
    {
      queryKey: ["videoSuggestions", videoId],
      queryFn: () => fetchUpNextSuggestions(videoId),
    },
  ]);

  const [videoMetaDataInfo, videoSuggestionsInfo] = queryResults;
  const videoMetaData = videoMetaDataInfo.data;
  const channelInfo = videoMetaData?.channel;

  const likeVideoMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.post(
        `/video/likeVideo?eventType=${payload.eventType || "likeVideo"}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      // console.log("Video liked successfully!");
      // Optionally refetch or update video metadata
      // console.log(data , 'dard hi dard');
      setIsLiked(data?.liked);
    },
    onError: (error) => {
      console.error("Failed to like video", error);
      // console.log(videoMetaData , 'dard hi dard');
    },
  });

  const handleLike = async () => {
    try {
      // Optimistically update the like state
      setIsLiked((prev) => !prev);

      // Send the mutation request
      likeVideoMutation.mutate(
        {
          userId: user?.uid,
          videoId: videoMetaData?.videoId,
          eventType: "likeVideo",
        },
        {
          onError: (error) => {
            console.error("Error liking the video:", error);

            // Revert the optimistic update if the mutation fails
            setIsLiked((prev) => !prev);
          },
          onSuccess: (data) => {
            // console.log("Mutation successful:", data);
          },
        }
      );
    } catch (error) {
      console.error("Error handling like operation:", error);
    }
  };

  const { mutate } = useMutation(async () =>
    saveToWatchLaterHelper(userInfo?.userId, {
      videoId: videoId,
      watchedAt: new Date(),
    })
  );

  // ? Continue from here -
  // TODO Summery: You were making saveToWatch later feature. Now its time to make that helper function. Backend routes and stuff are also ready. Just connect the helper function.
  const saveToWatchLater = () => {
    mutate();
  };

  useEffect(() => {
    setShowSidebar(false);
    likeVideoMutation.mutate({
      userId: user?.uid,
      videoId: videoMetaData?.videoId,
      eventType: "checkAlreadyLiked",
    });

    return () => setShowSidebar(true);
  }, [user?.uid, videoMetaData?.videoId]);
  if (videoMetaDataInfo.isLoading || videoSuggestionsInfo?.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl text-white">Loading...</div>
      </div>
    );
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
                    <AvatarImage
                      src={channelInfo?.avatarUrl}
                      alt={channelInfo?.name}
                      className="object-fill"
                    />
                    <AvatarFallback>{channelInfo?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{channelInfo?.name}</span>
                    <span className="text-sm text-gray-400">
                      {formatViews(videoMetaData?.views)} subscribers
                    </span>
                  </div>
                  <Button
                    variant={isSubscribed ? "outline" : "default"}
                    className={
                      isSubscribed
                        ? "bg-gray-800"
                        : "bg-yellow-500 hover:bg-red-700"
                    }
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-800 rounded-full">
                    <Button
                      variant="ghost"
                      className="rounded-l-full"
                      onClick={handleLike}
                    >
                      <Heart
                        className="mr-2 h-4 w-4"
                        fill={isLiked ? "#fff" : "transparant"}
                      />
                      {videoMetaData?.likes.length}K
                    </Button>
                    <Separator orientation="vertical" />
                    {/* <Button variant="ghost" className="rounded-r-full">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      {videoMetaData?.dislikes.length}K
                    </Button> */}
                  </div>
                  <ShareModal />

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel
                        className="flex gap-2 items-center justify-center cursor-pointer"
                        onClick={saveToWatchLater}
                      >
                        <Bookmark size={15} /> Watch later
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Video Description */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {formatViews(videoMetaData?.views)} views •{" "}
                    <RelativeTime createdAt={videoMetaData?.createdAt} />
                  </p>
                  <p className="text-sm whitespace-pre-line">
                    {videoMetaData?.description}
                  </p>
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
  );
}
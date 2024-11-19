import React, { useState } from "react";
import VideoCard from "../VideoCard";
import { useInfiniteQuery } from "react-query";
import { fetchChannelVideos, Filters } from "../../helpers/fetchChannelVideos";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// Define interfaces
interface Video {
  id: string;
  // Add other video properties here
}

interface PageData {
  videos: Video[];
  nextCursor: string | null;
}

const VIDEOS_PER_PAGE = 8;

function ChannelVideos() {
  // Generate dummy data with more realistic content
  const videos = Array.from({ length: 20 }, (_, index) => ({
    id: crypto.randomUUID(),
    title: `Video Title ${index + 1} - Amazing Content`,
    description: `This is a description for video ${
      index + 1
    }. It contains interesting information about the video content.`,
    thumbnail: `https://picsum.photos/seed/${index}/300/200`, // Using picsum for random thumbnails
    views: Math.floor(Math.random() * 1000000) + 1000, // Random view count between 1k and 1M
    uploadedAt: new Date(
      Date.now() - Math.random() * 10000000000
    ).toISOString(), // Random date within recent past
  }));

  const [currentFilterQuery, setCurrentFilterQuery] =
    useState<Filters>("recent");

  // Create ref for intersection observer
  const { ref, inView } = useInView();
  const channelId: number = useOutletContext();

  // Modified fetch function to handle pagination
  const fetchChannelVideoPage = async ({
    pageParam = 0,
  }): Promise<PageData> => {
    const response = await fetchChannelVideos(
      pageParam,
      VIDEOS_PER_PAGE,
      channelId,
      currentFilterQuery
    );
    return {
      videos: response.videos,
      nextCursor: response.hasMore ? String(pageParam + 1) : null,
    };
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["channelVideos"], fetchChannelVideoPage, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  // Fetch next page when the last element is in view
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="text-center mt-20">Error: {(error as Error).message}</div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-6">
      {/* Filters Section - Similar to YouTube's */}
      <div className="mb-6 flex items-center space-x-4 border-b pb-4">
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Latest
        </button>
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Popular
        </button>
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Oldest
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((item: any) => (
          <div key={item.id} className="w-full">
            <VideoCard videoInfo={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelVideos;

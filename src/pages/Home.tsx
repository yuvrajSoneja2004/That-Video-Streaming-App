import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../helpers/fetchVideos";
import { useUserStore } from "@/states/user";
import { useGlobalState } from "@/states/global";
import SkeletonCard from "@/skeletons/SkeletonVideoCard";
import NoVideos from "@/components/NoVideos";
import { useSingleVideoState } from "@/states/video";

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

function Home() {
  // Create ref for intersection observer
  const { ref, inView } = useInView();
  const { userInfo } = useUserStore();
  const { loadingBarState, setLoadingBarState } = useGlobalState();
  const { currentVideoCategory } = useSingleVideoState();

  const fetchVideoPage = async ({ pageParam = 0 }): Promise<PageData> => {
    if (userInfo?.userId) {
      const response = await fetchVideos(
        currentVideoCategory,
        pageParam,
        VIDEOS_PER_PAGE,
        userInfo.userId
      );
      return {
        userWatchedDurations: response.userWatchedDurations,
        videos: response.videos,
        nextCursor: response.hasMore ? String(pageParam + 1) : null,
      };
    } else {
      return {
        userWatchedDurations: {},
        videos: [],
        nextCursor: null,
      };
    }
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["videos", userInfo?.userId, currentVideoCategory],
    fetchVideoPage,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  );

  // Fetch next page when the last element is in view
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setLoadingBarState(100);
  }, []);

  if (isError) {
    return (
      <div className="text-center mt-20">Error: {(error as Error).message}</div>
    );
  }

  if (data?.pages.length === 0) {
    return <NoVideos />;
  }
  return (
    <div className="p-7 bg-primaryLight dark:bg-primaryDark">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center">
        {/* Render skeleton cards during initial loading */}
        {isLoading &&
          Array.from({ length: VIDEOS_PER_PAGE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}

        {/* Render actual video cards */}
        {data?.pages.map((page) =>
          page.videos.map((video) => (
            <VideoCard key={video.id} videoInfo={video} durations={data} />
          ))
        )}

        {/* Render skeleton cards while fetching the next page */}
        {isFetchingNextPage &&
          Array.from({ length: VIDEOS_PER_PAGE }).map((_, index) => (
            <SkeletonCard key={`next-page-${index}`} />
          ))}
      </div>

      {/* Intersection observer target */}
      <div ref={ref} className="flex justify-center p-4 mt-4">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        ) : hasNextPage ? (
          <div className="h-8" /> // Spacer for intersection observer
        ) : null}
      </div>
    </div>
  );
}

export default Home;
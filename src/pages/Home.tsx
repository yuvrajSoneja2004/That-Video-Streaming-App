import React from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../helpers/fetchVideos";

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

  // Modified fetch function to handle pagination
  const fetchVideoPage = async ({ pageParam = 0 }): Promise<PageData> => {
    const response = await fetchVideos(pageParam, VIDEOS_PER_PAGE);
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
  } = useInfiniteQuery(["videos"], fetchVideoPage, {
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
    <div className="p-7 mt-20">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {data?.pages.map((page) =>
          page.videos.map((video, index) => (
            <VideoCard key={video.id} videoInfo={video} />
          ))
        )}
      </div>

      {/* Loading spinner */}
      <div ref={ref} className="flex justify-center p-4 mt-4">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        ) : hasNextPage ? (
          <div className="h-8" /> // Spacer for intersection observer
        ) : null}
      </div>

      {/* Initial loading state */}
      {isLoading && (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}

export default Home;
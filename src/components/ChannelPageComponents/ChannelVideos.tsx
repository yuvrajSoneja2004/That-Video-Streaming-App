import React, { useState } from "react";
import VideoCard from "../VideoCard";
import { useInfiniteQuery } from "react-query";
import { fetchChannelVideos, Filters } from "../../helpers/fetchChannelVideos";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { THEME } from "../../constants/theme";

const VIDEOS_PER_PAGE = 8;

function ChannelVideos() {
  const [currentFilterQuery, setCurrentFilterQuery] = useState<Filters>("recent");
  const { ref, inView } = useInView();
  const channelId: number = useOutletContext();

  // Fetch paginated videos with filter
  const fetchChannelVideoPage = async ({ pageParam = 0 }) => {
    return await fetchChannelVideos(pageParam, VIDEOS_PER_PAGE, channelId, currentFilterQuery);
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage
  } = useInfiniteQuery(
    ["channelVideos", currentFilterQuery],
    fetchChannelVideoPage,
    {
      getNextPageParam: (lastPage, allPages) => lastPage?.hasMore ? allPages.length : undefined,
      refetchOnWindowFocus: false,
    }
  );

  // Fetch next page when inView is true
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Change filter and refetch videos
  const changeFilter = (filter: Filters) => {
    setCurrentFilterQuery(filter);
    refetch();
  };

  if (isError) {
    return <div className="text-center mt-20">Error: {(error as Error).message}</div>;
  }

  if(isLoading) return <h1>Loading...</h1>

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-6">
      {/* Filters Section */}
      <div className="mb-3 flex items-center space-x-4  pb-4">
        <button
          onClick={() => changeFilter("recent")}
          className={`px-3 py-1 ${
            currentFilterQuery === "recent" ? "bg-white text-black" : "bg-[#1a1a1a] text-white"
          } rounded-md text-md font-medium `}
        >
          Latest
        </button>
        <button
          onClick={() => changeFilter("popular")}
          className={`px-3 py-1 ${
            currentFilterQuery === "popular" ? "bg-white text-black" : "bg-[#1a1a1a] text-white"
          } rounded-md text-md font-medium `}
        >
          Popular
        </button>
        <button
          onClick={() => changeFilter("oldest")}
          className={`px-3 py-1 ${
            currentFilterQuery === "oldest" ? "bg-white text-black" : "bg-[#1a1a1a] text-white"
          } rounded-md text-md font-medium`}
        >
          Oldest
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page.videos.map((video: any) => (
            <div key={video.id} className="w-full">
              <VideoCard videoInfo={video} />
            </div>
          ))
        )}
      </div>

      {/* Intersection Observer Trigger */}
      <div ref={ref} className="h-10"></div>

      {/* Loading Indicator */}
      {isLoading || isFetchingNextPage ? <div className="text-center">Loading...</div> : null}
    </div>
  );
}

export default ChannelVideos;

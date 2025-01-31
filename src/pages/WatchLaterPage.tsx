import { useMutation } from "react-query";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";
import { fetchWatchLater } from "@/helpers/fetchWatchLater";
import HistoryVideoCard from "@/components/HistoryVideoCard";
import HistoryVideoCardSkeleton from "@/skeletons/HistoryVideoCardSkeleton";
import NoVideos from "@/components/NoVideos";

function WatchLaterPage() {
  const { userInfo } = useUserStore();

  const { mutate, data, isLoading, isError, error } = useMutation(
    ["watchLater"],
    async () => fetchWatchLater(userInfo?.userId),
    {
      onSuccess: (data) => {
        console.log(data, "karda ni care");
      },
      onError: (error) => {
        console.error("Failed to fetch user watch later data:", error);
      },
    }
  );

  useEffect(() => {
    if (userInfo?.userId) {
      mutate();
    }
  }, [userInfo]);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (data?.length === 0) {
    return <NoVideos />;
  }

  return (
    <div className="divide-y divide-border">
      {/* Show skeleton loader while loading */}
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <HistoryVideoCardSkeleton key={index} />
          ))
        : // Show actual watch later data once loaded
          data?.map((item) => <HistoryVideoCard key={item.id} item={item} />)}
    </div>
  );
}

export default WatchLaterPage;
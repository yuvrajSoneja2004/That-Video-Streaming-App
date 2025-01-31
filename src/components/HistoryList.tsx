import { useMutation } from "react-query";
import { fetchUserHistory } from "@/helpers/fetchUserHistory";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";
import HistoryVideoCard from "./HistoryVideoCard";
import HistoryVideoCardSkeleton from "@/skeletons/HistoryVideoCardSkeleton";
import NoVideos from "./NoVideos";

export function HistoryList() {
  const { userInfo } = useUserStore();

  const { mutate, data, isLoading, isError, error } = useMutation(
    ["history"],
    async () => fetchUserHistory(userInfo?.userId),
    {
      onSuccess: (data) => {
        console.log(data, "karda ni care");
      },
      onError: (error) => {
        console.error("Failed to fetch user history:", error);
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
  if (data?.watchHistory.length === 0) {
    return <NoVideos />;
  }

  return (
    <div className="divide-y divide-border">
      {/* Show skeleton loader while loading */}
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <HistoryVideoCardSkeleton key={index} />
          ))
        : // Show actual history data once loaded
          data?.watchHistory.map((item) => (
            <HistoryVideoCard key={item.id} item={item} />
          ))}
    </div>
  );
}
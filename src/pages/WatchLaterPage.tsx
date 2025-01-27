import { useMutation } from "react-query";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";
import { fetchWatchLater } from "@/helpers/fetchWatchLater";
import HistoryVideoCard from "@/components/HistoryVideoCard";

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
        console.error("Failed to fetch user watchlater data:", error);
      },
    }
  );

  useEffect(() => {
    if (userInfo?.userId) {
      mutate();
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="divide-y divide-border">
      {data?.map((item) => (
        <HistoryVideoCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default WatchLaterPage;

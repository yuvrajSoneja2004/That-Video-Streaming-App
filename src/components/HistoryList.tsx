import { useMutation } from "react-query";
import { fetchUserHistory } from "@/helpers/fetchUserHistory";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";
import HistoryVideoCard from "./HistoryVideoCard";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="divide-y divide-border">
      {data?.watchHistory.map((item) => (
        <HistoryVideoCard key={item.id} item={item} />
      ))}
    </div>
  );
}

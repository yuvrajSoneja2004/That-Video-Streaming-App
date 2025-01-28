import { useMutation } from "react-query";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";
import HistoryVideoCard from "@/components/HistoryVideoCard";
import { fetchLikedVideos } from "@/helpers/fetchLikedVideos";

function LikedVideosPage() {
  const { userInfo } = useUserStore();

  const { mutate, data, isLoading, isError, error } = useMutation(
    ["likedVideos"],
    async () => fetchLikedVideos(userInfo?.userId),
    {
      onSuccess: (data) => {
        console.log(data, "Liked videos fetched successfully");
      },
      onError: (error) => {
        console.error("Failed to fetch user liked videos:", error);
      },
    }
  );

  useEffect(() => {
    if (userInfo?.userId) {
      mutate();
    }
  }, [userInfo, mutate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="divide-y divide-border">
      {data?.likedVideos.map((item) => (
        <HistoryVideoCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default LikedVideosPage;

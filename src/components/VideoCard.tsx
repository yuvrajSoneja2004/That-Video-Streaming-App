import { useState } from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import RelativeTime from "../utils/RelativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

interface VideoSchema {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  previewGif?: string;
  avatarUrl?: string;
  creator?: string;
  views: number;
  createdAt?: string;
  videoUrl: string;
  channel: {
    id: number;
    avatarUrl: string;
    name: string;
  };
}

interface Props {
  videoInfo: VideoSchema;
  isStatic?: boolean;
}

function VideoCard({ videoInfo, isStatic }: Props) {
  const {
    title,
    thumbnailUrl: thumbnail,
    views,
    avatarUrl: localAvatar,
    previewGif,
    createdAt,
    creator,
    videoUrl,
    channel,
  } = videoInfo;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/watch/${videoUrl}`}
      className="w-full sm:max-w-[330.9px] block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full sm:max-w-[330.9px] aspect-video">
        {!isStatic ? (
          <img
            src={
              isStatic
                ? "/video-placeholder.jpg"
                : isHovered && previewGif
                ? previewGif
                : thumbnail
            }
            alt="Video"
            className="rounded-lg w-full h-full object-cover"
          />
        ) : (
          <img
            src={thumbnail ? thumbnail : "/video-placeholder.jpg"}
            alt="Video"
            className="rounded-lg w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex items-start gap-3 mt-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src={isStatic ? localAvatar : channel?.avatarUrl || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col flex-grow min-w-0">
          <p className="text-md font-bold truncate text-primaryDark dark:text-primaryLight">{title}</p>
          <p className="text-sm truncate text-gray-700 dark:text-gray-400 my-1">
            {channel?.name}
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            <span className="truncate">{formatViews(views)}</span>
            <span className="mx-1">•</span>
            <span className="truncate">
              {createdAt ? (
                <RelativeTime createdAt={createdAt} />
              ) : (
                <span>3 days ago</span>
              )}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
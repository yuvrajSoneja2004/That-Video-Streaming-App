import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./ui/Avatar";
import { formatViews } from "../utils/formatViews";
import RelativeTime from "../utils/RelativeTime";

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
      className="max-w-[330.9px] min-h-[201.32px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
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
            className="rounded-lg w-[320px] h-[200px]"
          />
        ) : (
          <img
            src={thumbnail ? thumbnail : "/video-placeholder.jpg"}
            alt="Video"
            className="rounded-lg w-[320px] h-[200px]"
          />
        )}
      </div>
      <div className="flex items-start gap-3 mt-3">
        <Avatar
          size={36}
          src={isStatic ? localAvatar : channel?.avatarUrl || ""}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-wrap text-ellipsis">{title}</p>
          <p className="text-sm text-wrap text-ellipsis my-1">
            {channel?.name}
          </p>
          <p className="text-sm text-wrap text-ellipsis">
            {formatViews(views)}{" "}
            <span className="ml-2">
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

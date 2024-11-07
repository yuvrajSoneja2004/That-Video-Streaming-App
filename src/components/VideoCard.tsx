import { Link } from "react-router-dom";
import Avatar from "./ui/Avatar";

interface VideoSchema {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
}
interface Props {
  videoInfo: VideoSchema;
  isStatic?: boolean;
}
function VideoCard({ videoInfo, isStatic }: Props) {
  const { title, thumbnail, views, avatarUrl, creator } = videoInfo;
  return (
    <Link to={"/pathHere"} className="max-w-[330.9px] min-h-[201.32px] ">
      <div>
        <img
          src={isStatic ? "./video-placeholder.jpg" : thumbnail}
          alt="Video"
          className="rounded-lg"
        />
      </div>
      <div className="flex items-start gap-3 mt-3">
        <Avatar size={36} src={avatarUrl} />
        <div className="flex flex-col">
          <p className="text-md font-bold text-wrap text-ellipsis ">{title}</p>
          <p className="text-sm  text-wrap text-ellipsis my-1 ">{creator}</p>
          <p className="text-sm  text-wrap text-ellipsis ">
            {views}K views 1 year ago
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

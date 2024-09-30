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
}
function VideoCard({ videoInfo }: Props) {
  const { title, thumbnail, views } = videoInfo;
  return (
    <Link to={"/pathHere"} className="max-w-[330.9px] min-h-[201.32px] ">
      <div>
        <img src={thumbnail} alt="Video" className="rounded-lg" />
      </div>
      <div className="flex items-start gap-3 mt-3">
        <Avatar
          size={36}
          src={
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-wrap text-ellipsis ">{title}</p>
          <p className="text-sm  text-wrap text-ellipsis my-1 ">
            Roadside Coder
          </p>
          <p className="text-sm  text-wrap text-ellipsis ">
            {views}K views 1 year ago
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

import { RiVerifiedBadgeFill } from "react-icons/ri";
import {Avatar , AvatarFallback , AvatarImage} from "../ui/Avatar";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import UploadVideoModel from "../models/UploadVideoModel";
import ChannelCustomizeModal from "../models/CustomizeChannelModel";
import { useState } from "react";
interface ChannelInfoProps {
  channelId: number;
  avatarUrl: string;
  description: string;
  isVerified: boolean;
  name: string;
  subscribers: string[];
  createdBy: string;
  bannerUrl: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelId,
  avatarUrl,
  description,
  isVerified,
  name,
  subscribers,
  createdBy,
  bannerUrl,
}) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log(open);
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="flex gap-4 mt-8">
      {/* <Avatar size={160} src={avatarUrl} /> */}
      <Avatar className="h-[160px] w-[160px]">
                  <AvatarImage src={avatarUrl} alt="@username" className="object-cover" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="flex gap-3 items-center">
          <h1 className="text-4xl font-bold text-white">{name}</h1>
          {isVerified && <RiVerifiedBadgeFill color="#fff" />}
        </div>
        <div className="flex gap-4">
          <span>{subscribers.length} subscribers</span>
          <span>23 videos</span>
        </div>
        <span className="mb-2">
          {description}
          <span className="text-white font-bold">{"... more"}</span>
        </span>
        {user?.uid != createdBy ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: 20,
              background: "#fff",
              color: "#000",
              textTransform: "none",
            }}
          >
            Subscribe
          </Button>
        ) : (
          <div className="flex gap-2">
            <UploadVideoModel
              avatarUrl={avatarUrl}
              name={name}
              channelId={channelId}
            />
            <ChannelCustomizeModal
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              bannerUrl={bannerUrl}
              channelId={channelId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
// TODO: Learn how to make get request progress bar dynamic.
export default ChannelInfo;

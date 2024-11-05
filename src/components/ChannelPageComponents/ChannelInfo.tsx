import { RiVerifiedBadgeFill } from "react-icons/ri";
import Avatar from "../ui/Avatar";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UploadVideoModel from "../models/UploadVideoModel";
import ChannelCustomizeModal from "../models/CustomizeChannelModel";
import { useState } from "react";
interface ChannelInfoProps {
  avatarUrl: string;
  description: string;
  isVerified: boolean;
  name: string;
  subscribers: string[];
  createdBy: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  avatarUrl,
  description,
  isVerified,
  name,
  subscribers,
  createdBy,
}) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex gap-4 mt-8">
      <Avatar size={160} src={avatarUrl} />
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
            <UploadVideoModel />
            <ChannelCustomizeModal open={true} handleClose={handleClose} />
            {/* <Button
              variant="contained"
              sx={{
                borderRadius: 20,
                background: "#fff",
                color: "#000",
                textTransform: "none",
              }}
            >
              <EditOutlinedIcon sx={{ marginRight: 0.7, fontSize: 20 }} />
              Customize channel
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
};
// TODO: Learn how to make get request progress bar dynamic.
export default ChannelInfo;

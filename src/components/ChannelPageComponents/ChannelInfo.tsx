import { RiVerifiedBadgeFill } from "react-icons/ri";
import Avatar from "../ui/Avatar";
import { Button } from "@mui/material";

function ChannelInfo() {
  return (
    <div className="flex gap-4 mt-8">
      <Avatar
        size={160}
        src="https://yt3.googleusercontent.com/0xz7rfet0HZF8OMUSrdMBjGUWymrt9-9umERLzRk7gKvx7Bu98TqVOkojxley9_ytnXv0tok=s160-c-k-c0x00ffffff-no-rj"
      />
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="flex gap-3 items-center">
          <h1 className="text-4xl font-bold text-white">RADAL</h1>
          <RiVerifiedBadgeFill color="#fff" />
        </div>
        <div className="flex gap-4">
          <span>2.35M subscribers</span>
          <span>23 videos</span>
        </div>
        <span>
          the best video of radal....arrey yaar{" "}
          <span className="text-white font-bold">{"... more"}</span>
        </span>
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
      </div>
    </div>
  );
}

export default ChannelInfo;

import {
  Box,
  ButtonBase,
  CardMedia,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import RelativeTime from "../utils/RelativeTime";
import { VerticalAlignBottomOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpNextMenu from "./video/UpNextMenu";
import { Link } from "react-router-dom";

function UpNextVideoCard({ video }) {
  return (
    <Link to={`/watch/${video?.videoUrl}`}>
      <ListItem key={video.id} alignItems="flex-start" sx={{ px: 0 }}>
        <Box sx={{ position: "relative", mr: 2 }}>
          <CardMedia
            component="img"
            image={video.thumbnailUrl}
            alt={video.title}
            sx={{ width: 160, height: 90, borderRadius: 1 }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 4,
              right: 4,
              bgcolor: "rgba(0,0,0,0.8)",
              color: "white",
              px: 0.5,
              borderRadius: 0.5,
            }}
          >
            {video.duration}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            {video.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {video.channel}
          </Typography>
          <Typography variant="caption">
            {video.views} views • <RelativeTime createdAt={video?.createdAt} />
          </Typography>
        </Box>
        <UpNextMenu />
      </ListItem>
    </Link>
  );
}

export default UpNextVideoCard;

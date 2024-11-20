import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  styled,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material";
import { Video } from "../../types/search";
import RelativeTime from "../../utils/RelativeTime";
import { formatViews } from "../../utils/formatViews";
import { Link, useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#0f0f0f",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  color: "white",
  width: "100%",
  cursor: "pointer",
  maxWidth: "1096px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  width: "100%",
}));

export default function ResultsVideo({ data }: { data: Video }) {
  const [showPreviewGif, setShowPreviewGif] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <StyledCard
      elevation={0}
      onMouseEnter={() => setShowPreviewGif(true)}
      onMouseLeave={() => setShowPreviewGif(false)}
      onClick={() => navigate(`/watch/${data?.videoUrl}`)}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "360px" },
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={!showPreviewGif ? data?.thumbnailUrl : data?.previewGif}
          alt="Video thumbnail"
          sx={{
            aspectRatio: "16/9",
            width: "100%",
            height: "auto",
            borderRadius: 1,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "3px 4px",
            borderRadius: 1,
          }}
        >
          15:35
        </Typography>
      </Box>
      <ContentWrapper>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontSize: "1.2rem", fontWeight: 500, mb: 1 }}
          >
            {data?.title}
          </Typography>
          <Typography variant="body2" color="#fff" sx={{ mb: 1 }}>
            {formatViews(data?.views)} •{" "}
            <RelativeTime createdAt={data?.createdAt} />
          </Typography>
        </Box>
        <Link to={`/channel/${data?.channel?.id}`}>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {/* <Avatar
              src={data?.channel.avatarUrl}
              sx={{ width: 24, height: 24, mr: 1 }}
            /> */}
            <Typography
              variant="body2"
              color="#fff"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {data?.channel?.name}
              {/* <VerifiedIcon sx={{ fontSize: 14, ml: 0.5, color: 'text.secondary' }} /> */}
            </Typography>
          </Box>
        </Link>
        <Typography variant="body2" color="#fff" sx={{ mt: 1 }}>
          {data?.channel.description}
        </Typography>
      </ContentWrapper>
    </StyledCard>
  );
}

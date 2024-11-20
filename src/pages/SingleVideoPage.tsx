import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Mic,
  VideoCall,
  Notifications,
  ThumbUp,
  ThumbDown,
  Share,
  MoreVert,
  PlayArrow,
  SkipNext,
  VolumeUp,
  Settings,
  Fullscreen,
} from "@mui/icons-material";
import CommentSection from "../components/CommentSection";
import CustomVideoPlayer from "../components/CustomPlayer";
import { THEME } from "../constants/theme";
import { useQueries } from "react-query";
import { fetchVideoSuggestions } from "../helpers/fetchVideoSuggestions";
import { fetchVideoMetaData } from "../helpers/video/fetchVideoMetaData";
import { useParams } from "react-router-dom";
import { fetchUpNextSuggestions } from "../helpers/video/fetchUpNextSuggestions";
import { formatViews } from "../utils/formatViews";
import RelativeTime from "../utils/RelativeTime";
import UpNextVideoCard from "../components/UpNextVideoCard";

export default function SingleVideoPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { videoId } = useParams();
  const queryResults = useQueries([
    {
      queryKey: ["videoMetadata", videoId],
      queryFn: () => fetchVideoMetaData(videoId),
    },
    {
      queryKey: ["videoSuggestions", videoId],
      queryFn: () => fetchUpNextSuggestions(videoId),
    },
  ]);

  const [videoMetaDataInfo, videoSuggestionsInfo] = queryResults;

  const videoMetaData = videoMetaDataInfo.data;
  const channelInfo = videoMetaData?.channel;

  if (videoMetaDataInfo.isLoading || videoSuggestionsInfo?.isLoading)
    return <h2>Loading...</h2>;

  return (
    <Box
      sx={{ bgcolor: THEME.dark.background, minHeight: "100vh", marginTop: 7 }}
    >
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          spacing={0}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          {/* Video Player Section */}
          <Grid
            item
            xs={12}
            md={8}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            {/* // ? Here */}
            <CustomVideoPlayer bitrates={videoMetaData?.bitrates} />
            {/* Video Info */}
            <Typography variant="h6" gutterBottom>
              {videoMetaData?.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* <Avatar src={channelInfo?.avatarUrl} /> */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {channelInfo?.name}
                  </Typography>
                  <Typography variant="caption" color="#fff">
                    {videoMetaData?.views} subscribers
                  </Typography>
                </Box>
                <Button
                  variant={isSubscribed ? "outlined" : "contained"}
                  color={isSubscribed ? "primary" : "error"}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button startIcon={<ThumbUp />}>
                  {videoMetaData?.likes.length}K
                </Button>
                <Button startIcon={<ThumbDown />}>
                  {videoMetaData?.dislikes.length}K
                </Button>
                <Button startIcon={<Share />}>Share</Button>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Stack>
            </Box>
            {/* Video Description */}
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {videoMetaData?.views} views •{" "}
                  <RelativeTime createdAt={videoMetaData?.createdAt} />
                </Typography>
                <Typography variant="body2" paragraph>
                  {videoMetaData?.description}
                </Typography>
              </CardContent>
            </Card>
            <CommentSection />
          </Grid>

          {/* Recommended Videos */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 80 }}>
              <h1 className="text-2xl font-bold">Up Next </h1>

              <List sx={{ width: "100%" }}>
                {videoSuggestionsInfo?.data?.map((video) => (
                  <UpNextVideoCard video={video} />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

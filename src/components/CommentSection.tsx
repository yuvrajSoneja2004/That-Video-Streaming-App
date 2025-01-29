import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { ThumbUp, ThumbDown, MoreVert, Sort } from "@mui/icons-material";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { createComment } from "@/helpers/video/createComment";
import { useUserStore } from "@/states/user";
import { fetchComments } from "@/helpers/video/fetchComments";
import { MoreVertical, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";
import RelativeTime from "@/utils/RelativeTime";
import { replyToComment } from "@/helpers/video/replyToComment";

export default function CommentSection() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [commentList, setCommentList] = useState<any>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");
  const [openReplyId, setOpenReplyId] = useState<string | null>(null); // State to track which comment's reply box is open
  const [replyText, setReplyText] = useState<string>(""); // State to store reply text
  const videoUrlId = useParams<string>();
  const { userInfo } = useUserStore();
  const { toast } = useToast();

  // Fetch comments using useQuery with onSuccess function
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useQuery(
    ["comments", videoUrlId?.videoId], // Query key
    () => fetchComments(videoUrlId?.videoId || ""), // Fetch function
    {
      enabled: !!videoUrlId?.videoId, // Only fetch if videoId is available
      onSuccess: (data) => {
        setCommentList(data.comments); // Update the comment list state with the fetched data
      },
    }
  );

  const { mutate: addCommentMutation, isLoading: isAddingComment } =
    useMutation(
      async () => {
        const response = await createComment({
          userId: userInfo?.userId || "defaultUserId",
          videoId: videoUrlId?.videoId || "",
          commentText,
        });
        return response;
      },
      {
        onSuccess: () => {
          toast({
            title: "Added comment successfully.",
            description: "Shared successfully.",
          });
          setCommentText("");
          commentList.push({
            user: {
              name: userInfo?.name || "Unknown User",
              avatarUrl: userInfo?.avatarUrl || "",
              userId: userInfo?.userId || "",
            },
            _count: {
              likes: 0,
            },
            commentText,
            timestamp: new Date().toLocaleString(),
          });
        },
        onError: (error) => {
          console.error("Error adding comment:", error);
          toast({
            title: "Error adding comment.",
            description: error.message,
          });
        },
      }
    );

  const { mutate: replyCommentMutation, isLoading: isReplyingComment } =
    useMutation(
      async () => {
        const response = await replyToComment({
          userId: userInfo?.userId || "defaultUserId",
          videoId: videoUrlId?.videoId || "",
          commentId: openReplyId || "",
          replyText,
        });
        return response;
      },
      {
        onSuccess: () => {
          toast({
            title: "Replied to comment successfully.",
            description: "Reply shared successfully.",
          });
          setReplyText("");
          setOpenReplyId(null); // Close the reply box after successful reply
        },
        onError: (error) => {
          console.error("Error replying to comment:", error);
          toast({
            title: "Error replying to comment.",
            description: error.message,
          });
        },
      }
    );

  // Handler to toggle reply box
  const handleReplyClick = (commentId: string) => {
    if (openReplyId === commentId) {
      setOpenReplyId(null); // Close the reply box if it's already open
    } else {
      setOpenReplyId(commentId); // Open the reply box for the clicked comment
    }
  };

  // Handler to send a reply
  const handleSendReply = (commentId: string) => {
    // Add your logic to send the reply here
    console.log("Sending reply:", replyText, "for comment:", commentId);
    setReplyText(""); // Clear the reply input
    setOpenReplyId(null); // Close the reply box
    replyCommentMutation();
  };

  if (isCommentsLoading) {
    return <Typography>Loading comments...</Typography>;
  }

  if (commentsError) {
    return (
      <Typography>Error loading comments: {commentsError.message}</Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Comments Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          {comments?.comments?.length || 0} Comments
        </Typography>
        <Button
          startIcon={<Sort />}
          onClick={(e) => setSortAnchorEl(e.currentTarget)}
          sx={{ textTransform: "none" }}
        >
          Sort by
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => setSortAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              setSortBy("top");
              setSortAnchorEl(null);
            }}
          >
            Top comments
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortBy("newest");
              setSortAnchorEl(null);
            }}
          >
            Newest first
          </MenuItem>
        </Menu>
      </Box>

      {/* Add Comment */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Avatar src={userInfo?.avatarUrl} />
        <TextField
          fullWidth
          placeholder={"Write your comment here"}
          variant="standard"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "divider",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCommentMutation();
            }
          }}
        />
      </Box>

      {/* Comments List */}
      <Stack spacing={4}>
        {commentList?.map((comment) => {
          const {
            user: { name, avatarUrl, userId },
            id: commentId,
          } = comment;
          return (
            <Box key={commentId} sx={{ display: "flex", gap: 2 }}>
              <Link to={`/`}>
                <Avatar src={avatarUrl} />
              </Link>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    @{name}
                  </Typography>
                  <Typography variant="caption" color="text.white">
                    <RelativeTime createdAt={comment?.createdAt} />
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {comment.commentText}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small">
                    <ThumbsUp size={15} color="#fff" />
                  </IconButton>
                  <Typography variant="caption">
                    {comment._count.likes}
                  </Typography>
                  <Button onClick={() => handleReplyClick(commentId)}>
                    <p className="text-white ml-6">Reply</p>
                  </Button>
                </Box>

                {/* Reply Input Box (Conditional Rendering) */}
                {openReplyId === commentId && (
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Avatar src={userInfo?.avatarUrl} />
                    <TextField
                      fullWidth
                      placeholder="Write your reply here"
                      variant="standard"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "divider",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleSendReply(commentId)}
                    >
                      Send
                    </Button>
                  </Box>
                )}

                {comment.replies > 0 && (
                  <Button
                    startIcon={<Sort sx={{ transform: "rotate(90deg)" }} />}
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      mt: 1,
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    {comment.replies} replies
                  </Button>
                )}
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Report</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Block user
                </MenuItem>
              </Menu>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
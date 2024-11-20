import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { ThumbUp, ThumbDown, MoreVert, Sort } from "@mui/icons-material";

// Add this component after the Video Description Card in the main code
export default function CommentSection() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);

  const comments = [
    {
      id: 1,
      user: "subhadeepkr8",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "6 years ago",
      text: "Nokia mobiles, Nseries, Motorola flip phones, wallpapers, ringtones..those days !!!..only 90's kids knows !",
      likes: "8.7K",
      replies: 505,
    },
    {
      id: 2,
      user: "abhaysinghrajpurohit2641",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "6 years ago",
      text: "Those days....walkman, emran, himesh, saregamapa 2005, nokia, kk, B4U music, kalyug, class crushes 😢 really miss those days yaar.",
      likes: "3.8K",
      replies: 122,
    },
    {
      id: 3,
      user: "RafielHisham",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "4 years ago",
      text: "That time back, I used to get confused between Emraan Hashmi and Himesh Reshammiya 😅 😅 😅 Those golden days of 2006 🔥",
      likes: "2.1K",
      replies: 45,
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Comments Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          7,973 Comments
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
          <MenuItem onClick={() => setSortAnchorEl(null)}>
            Top comments
          </MenuItem>
          <MenuItem onClick={() => setSortAnchorEl(null)}>
            Newest first
          </MenuItem>
        </Menu>
      </Box>

      {/* Add Comment */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        {/* <Avatar src="/placeholder.svg?height=40&width=40" /> */}
        <TextField
          fullWidth
          placeholder="Add a comment..."
          variant="standard"
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "divider",
            },
          }}
        />
      </Box>

      {/* Comments List */}
      <Stack spacing={4}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ display: "flex", gap: 2 }}>
            <Avatar src={comment.avatar} />
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  @{comment.user}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {comment.timestamp}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {comment.text}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="caption">{comment.likes}</Typography>
                <IconButton size="small">
                  <ThumbDown fontSize="small" />
                </IconButton>
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    minWidth: "auto",
                    color: "text.secondary",
                  }}
                >
                  Reply
                </Button>
                <IconButton
                  size="small"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
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
              <MenuItem onClick={() => setAnchorEl(null)}>Block user</MenuItem>
            </Menu>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RelativeTime from "@/utils/RelativeTime";
import { ThumbsUp } from "lucide-react";
function CommentCard({ reply }) {
  console.log("oh ya ya yya", reply);
  // User info
  const { avatarUrl, name, userId } = reply.user;
  return (
    <Box key={"commentId"} sx={{ display: "flex", gap: 2 }}>
      <Link to={`/channel/${userId}`}>
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
            <RelativeTime createdAt={reply.createdAt} />
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {reply.replyText}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <ThumbsUp size={15} color="#fff" />
          </IconButton>
          <Typography variant="caption">{"comment._count.likes"}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CommentCard;

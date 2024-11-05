import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const Input = styled("input")({
  display: "none",
});

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export default function ChannelCustomizeModal({ open, handleClose }) {
  const [channelName, setChannelName] = useState("Your Channel Name");
  const [channelDescription, setChannelDescription] = useState(
    "Your channel description goes here..."
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={ModalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4">Customize Channel</Typography>
            <IconButton onClick={handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Channel Art Section */}
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Channel Art" />
            <CardContent>
              <Box
                sx={{
                  position: "relative",
                  height: 180,
                  bgcolor: "grey.200",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <img
                  src="/placeholder.svg?height=180&width=1280"
                  alt="Channel Art"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <label htmlFor="channel-art-upload">
                  <Input accept="image/*" id="channel-art-upload" type="file" />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{ position: "absolute", bottom: 8, right: 8 }}
                  >
                    Change Art
                  </Button>
                </label>
              </Box>
            </CardContent>
          </Card>

          {/* Profile Picture Section */}
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Profile Picture" />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ position: "relative" }}>
                  <Avatar sx={{ width: 80, height: 80 }}>
                    <CameraAltIcon />
                  </Avatar>
                  <label htmlFor="profile-picture-upload">
                    <Input
                      accept="image/*"
                      id="profile-picture-upload"
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ position: "absolute", bottom: -8, right: -8 }}
                    >
                      <CameraAltIcon />
                    </IconButton>
                  </label>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Your profile picture will appear where your channel is
                  presented on YouTube
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Basic Info Section */}
          <Card>
            <CardHeader title="Basic Info" />
            <CardContent>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ alignSelf: "flex-start" }}
                >
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
}

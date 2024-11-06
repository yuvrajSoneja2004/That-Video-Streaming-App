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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { THEME } from "../../constants/theme";
import { useMutation } from "react-query";
import {
  updateChannelInfo,
  uploadToImgBB,
} from "../../helpers/updateChannelInfo";
import { useChannelState } from "../../states/channel";

// Types
interface ChannelCustomizeModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  bannerUrl: string;
  channelId: string;
  onSuccess?: (data: ChannelUpdateResponse) => void;
}

interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
  };
  success: boolean;
}

interface ChannelUpdateResponse {
  name: string;
  description: string;
  bannerUrl: string;
  profileUrl: string;
}

interface ChannelUpdateRequest {
  name: string;
  description: string;
  bannerUrl: string;
  avatarUrl: string;
}

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
  background: THEME.dark.background,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

// const IMGBB_API_KEY = "1860dbb564356e69f87167f8d4c2785c"; // Replace with your ImgBB API key

// async function uploadToImgBB(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("image", file);

//   const response = await fetch(
//     `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to upload image");
//   }

//   const data: ImgBBResponse = await response.json();
//   console.log("img url", data.data.url);
//   return data.data.url;
// }

export default function ChannelCustomizeModal({
  open,
  handleClose,
  handleOpen,
  bannerUrl,
  channelId,
  onSuccess,
}: ChannelCustomizeModalProps) {
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState(bannerUrl);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { setIsChannelInfoUpdated } = useChannelState();

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedBanner(file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedProfile(file);
      setPreviewProfile(URL.createObjectURL(file));
    }
  };

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      setIsUploading(true);
      try {
        // Upload images first if they exist
        const uploadPromises: Promise<string>[] = [];
        let newBannerUrl = bannerUrl;
        let newProfileUrl = "";

        if (selectedBanner) {
          uploadPromises.push(
            uploadToImgBB(selectedBanner, setIsChannelInfoUpdated)
          );
        }
        if (selectedProfile) {
          uploadPromises.push(
            uploadToImgBB(selectedProfile, setIsChannelInfoUpdated)
          );
        }

        // Wait for all uploads to complete
        if (uploadPromises.length > 0) {
          const urls = await Promise.all(uploadPromises);
          if (selectedBanner) newBannerUrl = urls[0];
          if (selectedProfile) newProfileUrl = urls[selectedBanner ? 1 : 0];
        }

        // Send final update request with all data
        const channelData: ChannelUpdateRequest = {
          name: channelName,
          description: channelDescription,
          bannerUrl: newBannerUrl,
          avatarUrl: newProfileUrl,
        };

        return await updateChannelInfo(channelData, channelId);
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data);
      handleClose();
    },
    onError: (error) => {
      console.error("Error updating channel:", error);
    },
  });

  const isSubmitDisabled = isLoading || isUploading;

  return (
    <>
      <Button
        onClick={handleOpen}
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
      </Button>
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
                background: THEME.dark.background,
              }}
            >
              <Typography variant="h4">
                Customize Channel {channelId}
              </Typography>
              <IconButton onClick={handleClose} size="large">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Channel Art Section */}
            <Card sx={{ mb: 4, background: THEME.dark.backgroundSecondary }}>
              <CardHeader title="Channel Art" sx={{ color: THEME.dark.text }} />
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
                    src={previewBanner || bannerUrl}
                    alt="Channel Art"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <label htmlFor="channel-art-upload">
                    <Input
                      accept="image/*"
                      id="channel-art-upload"
                      type="file"
                      onChange={handleBannerChange}
                    />
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
            <Card sx={{ mb: 4, background: THEME.dark.backgroundSecondary }}>
              <CardHeader
                title="Profile Picture"
                sx={{ color: THEME.dark.text }}
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ position: "relative" }}>
                    <Avatar src={previewProfile} sx={{ width: 80, height: 80 }}>
                      {!previewProfile && <CameraAltIcon />}
                    </Avatar>
                    <label htmlFor="profile-picture-upload">
                      <Input
                        accept="image/*"
                        id="profile-picture-upload"
                        type="file"
                        onChange={handleProfileChange}
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
                  <Typography variant="body2" sx={{ color: THEME.dark.text }}>
                    Your profile picture will appear where your channel is
                    presented on YouTube
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Basic Info Section */}
            <Card sx={{ mb: 4, background: THEME.dark.backgroundSecondary }}>
              <CardHeader title="Basic Info" sx={{ color: THEME.dark.text }} />
              <CardContent>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    color: THEME.dark.text,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    error={Boolean(error)}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    error={Boolean(error)}
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {error.message}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ alignSelf: "flex-start" }}
                    onClick={() => mutate()}
                    // disabled={isSubmitDisabled}
                  >
                    {isUploading
                      ? "Uploading..."
                      : isLoading
                      ? "Saving..."
                      : "Save"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
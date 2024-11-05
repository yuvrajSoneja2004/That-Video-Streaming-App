import { THEME } from "../constants/theme";
import { useUserStore } from "../states/user";
import {
  Avatar,
  Button,
  Snackbar,
  TextField,
  Alert,
  Box,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useState } from "react";
import {
  Twitter,
  Instagram,
  Facebook,
  Language,
  Close,
} from "@mui/icons-material";

interface ChannelFormData {
  description: string;
  links: {
    website?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

interface CreateChannelResponse {
  success: boolean;
  message: string;
  data?: {
    channel: {
      id: number;
      name: string;
      avatarUrl: string;
      createdAt: string;
      isVerified: boolean;
      subscribers: string[];
      description: string;
    };
    about: {
      description: string;
      links: {
        website?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
      };
      createdAt: string;
    };
  };
  errors?: Array<{
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
  }>;
}

function CreateChannel() {
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore();

  // Debugging log

  // Form state
  const [formData, setFormData] = useState<ChannelFormData>({
    description: "",
    links: {},
  });

  // Alert state
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Create channel mutation
  const mutation = useMutation<
    CreateChannelResponse,
    Error,
    {
      user: string;
      name: string;
      avatarUrl: string;
      description: string;
      links: object;
    }
  >(
    async (channelData) => {
      console.log("Sending channel data:", channelData); // Debug log
      const response = await axiosInstance.post(
        "/channels/create",
        channelData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("tum ho", data);
        setAlert({
          open: true,
          message: "Channel created successfully!",
          severity: "success",
        });
        queryClient.invalidateQueries("userChannel");
      },
      onError: (error: any) => {
        console.error("Mutation error:", error); // Debug log
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error creating channel";
        setAlert({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      },
    }
  );

  const handleCreateChannel = () => {
    // Validate required fields
    if (!userInfo.userId || !userInfo.name || !userInfo.avatarUrl) {
      setAlert({
        open: true,
        message: "Missing required user information",
        severity: "error",
      });
      return;
    }

    const channelData = {
      user: userInfo.userId, // Make sure this matches the expected field name
      name: userInfo.name,
      avatarUrl: userInfo.avatarUrl,
      description: formData.description,
      links: formData.links,
    };

    console.log("Submitting channel data:", channelData); // Debug log
    mutation.mutate(channelData);
  };

  const handleLinkChange =
    (platform: keyof typeof formData.links) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        links: {
          ...prev.links,
          [platform]: event.target.value,
        },
      }));
    };

  const clearLink = (platform: keyof typeof formData.links) => {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [platform]: "",
      },
    }));
  };

  // Early return if user info is not available
  if (!userInfo.userId || !userInfo.name || !userInfo.avatarUrl) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert severity="error">
          User information is not available. Please log in again.
        </Alert>
      </Box>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Box
        sx={{
          width: "100%",
          maxWidth: "md",
          p: 4,
          borderRadius: 2,
          bgcolor: THEME.dark.backgroundSecondary,
          boxShadow: 3,
        }}
      >
        <div className="space-y-6">
          {/* Avatar and Title */}
          <div className="text-center space-y-4">
            <Avatar
              src={userInfo.avatarUrl}
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
              }}
            />
            <Typography variant="h4" color="white">
              Become a creator yourself!
            </Typography>
          </div>

          {/* Channel Description */}
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Channel Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.05)",
              "& label": { color: "grey.400" },
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "grey.700" },
                "&:hover fieldset": { borderColor: "grey.500" },
              },
            }}
          />

          {/* Social Links */}
          <div className="space-y-4">
            <Typography variant="h6" color="white" gutterBottom>
              Social Links
            </Typography>

            {/* Website */}
            <TextField
              fullWidth
              label="Website"
              value={formData.links.website || ""}
              onChange={handleLinkChange("website")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language sx={{ color: "grey.400" }} />
                  </InputAdornment>
                ),
                endAdornment: formData.links.website && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => clearLink("website")}
                      size="small"
                    >
                      <Close sx={{ color: "grey.400" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }}
            />

            {/* Twitter */}
            <TextField
              fullWidth
              label="Twitter"
              value={formData.links.twitter || ""}
              onChange={handleLinkChange("twitter")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Twitter sx={{ color: "grey.400" }} />
                  </InputAdornment>
                ),
                endAdornment: formData.links.twitter && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => clearLink("twitter")}
                      size="small"
                    >
                      <Close sx={{ color: "grey.400" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }}
            />
          </div>

          {/* Create Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateChannel}
            disabled={mutation.isLoading}
            sx={{ mt: 4, py: 1.5 }}
          >
            {mutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Channel"
            )}
          </Button>
        </div>

        {/* Alert Snackbar */}
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default CreateChannel;

import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertTitle,
  Button,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { THEME } from "../constants/theme";
import SignInBtn from "./ui/SignInBtn";
import GlobalButton from "./ui/GlobalButton";

interface AuthErrorScreenProps {
  onRetry: () => void;
  errorInfo: {
    title: string;
    code: string;
  };
}

const AuthErrorScreen: React.FC<AuthErrorScreenProps> = ({
  onRetry,
  errorInfo,
}) => {
  const { title, code } = errorInfo;
  console.log("kaise kahu", title, code);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "grey.50",
        background: THEME.dark.background,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Error Illustration */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 256, height: 256, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <AlertCircle
                  size={128}
                  style={{
                    color: "#ef4444",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                  strokeWidth={1.5}
                /> */}
                <img src="/error/user_failed.png" />
              </Box>
            </Box>
          </Box>

          {/* Error Message */}
          <Alert
            severity="error"
            sx={{
              border: 1,
              borderColor: "error.light",
              bgcolor: "error.lighter",
              "& .MuiAlert-message": {
                width: "100%",
              },
            }}
          >
            <AlertTitle
              sx={{ fontSize: "1.25rem", fontWeight: 600, color: "error.dark" }}
            >
              {!title ? "Authentication Error" : title}
            </AlertTitle>
            <Typography color="error.dark">
              We're having trouble loading your information. This might be due
              to a network issue or temporary service disruption.
            </Typography>
          </Alert>

          {/* Action Buttons */}
          {code !== "USER_NOT_FOUND" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={onRetry}
                sx={{
                  bgcolor: "error.main",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                  px: 4,
                  py: 1,
                }}
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                sx={{
                  borderColor: "error.light",
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "error.lighter",
                    borderColor: "error.light",
                  },
                }}
              >
                Refresh Page
              </Button>
            </Box>
          ) : (
            <SignInBtn variant={"type2"} />
          )}

          {/* Help Text */}
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            If the problem persists, please try clearing your browser cache or
            contact support.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthErrorScreen;

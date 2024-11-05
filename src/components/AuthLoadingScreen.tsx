import { Box, LinearProgress } from "@mui/material";
import { THEME } from "../constants/theme";
import { useUserStore } from "../states/user";
import { useEffect, useState } from "react";

function AuthLoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Increase progress by 10% each interval up to 100%
        const nextProgress = prevProgress + 10;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 300);

    // Clean up the timer when the component unmounts or progress completes
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-3">
      <img src="/logo-placeholder.svg" width={100} height={100} className="" />
      <Box sx={{ minWidth: "20%", marginTop: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            borderRadius: 20,
            "& .MuiLinearProgress-bar": {
              backgroundColor: THEME.primary, // Replace with your custom hex color
            },
          }}
        />
      </Box>
    </div>
  );
}

export default AuthLoadingScreen;

import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface GlobalButtonProps extends Omit<ButtonProps, "sx"> {
  value?: string;
  additionalStyles?: SxProps<Theme>;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({
  value = "Subscribe",
  onClick,
  additionalStyles,
  children,
  startIcon,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={startIcon && startIcon}
      sx={{
        borderRadius: 20,
        background: "#fff",
        color: "#000",
        textTransform: "none",
        "&:hover": {
          background: "#f5f5f5",
        },
        ...additionalStyles,
      }}
      {...props}
    >
      {children || value}
    </Button>
  );
};

export default GlobalButton;

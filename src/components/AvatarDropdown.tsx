import React, { useState, MouseEvent } from "react";
import { Avatar, IconButton, Menu, MenuItem, Switch } from "@mui/material";
import { FaUserAlt, FaCogs, FaSignOutAlt, FaMoon } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
// Define types for the props and menu options
interface AvatarDropdownProps {
  avatarUrl: string;
}

interface MenuOption {
  label: string;
  icon: JSX.Element;
  route?: string;
  toggle?: boolean;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ avatarUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Define the menu options with their respective icons
  const menuOptions: MenuOption[] = [
    {
      label: "My Account",
      icon: <AccountCircleOutlinedIcon />,
      route: "/channel",
    },
    { label: "Settings", icon: <SettingsOutlinedIcon />, route: "/" },
    {
      label: "Dark Mode",
      icon: <BedtimeOutlinedIcon />,
      toggle: true, // Custom key to handle toggling
    },
    { label: "Logout", icon: <LogoutOutlinedIcon /> },
  ];

  // Handle opening the menu
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      {/* Avatar or icon to trigger the menu */}
      <IconButton onClick={handleClick}>
        <Avatar>
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
            width={30}
            height={30}
            referrerPolicy="no-referrer"
          />
        </Avatar>
      </IconButton>

      {/* Menu component */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.toggle ? handleDarkModeToggle() : handleClose();
              navigate(`${option.route}/${user?.uid}`);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#999999", // Custom background color on hover
              },
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mx-1 my-2"
            >
              <span style={{ marginRight: 10 }}>{option.icon}</span>
              <span>{option.label}</span>
              {option.toggle && (
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  size="small"
                  style={{ marginLeft: "auto" }}
                />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AvatarDropdown;

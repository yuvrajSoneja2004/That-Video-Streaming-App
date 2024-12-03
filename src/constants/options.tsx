import { PiSignOut } from "react-icons/pi";

// Used in src/components/Navbar.tsx
export const NAVBAR_AVATAR_OPTIONS = [
  {
    title: "My Profile",
    icon: <PiSignOut size={20} />,
    path: "/someThing",
  },
];

// Used in src/components/VideoPlayer.tsx
export const VIDEO_PLAYER_OPTIONS = [
  {
    slug: "playspeed",
    title: "Playback Speed",
    icon: <PiSignOut size={20} />,
    speedList: [0.75 , 0.5 , 0.25, 1 , 1.25 , 1.50 , 1.75 , 2, 5] 
  },
  {
    slug: 'quality',
    title: "Quality",
    icon: <PiSignOut size={20} />,
  },
];

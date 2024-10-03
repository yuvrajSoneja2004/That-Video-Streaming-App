import React from "react";
import { motion } from "framer-motion";

interface Props {
  isOptionsOpen: boolean;
  children: React.ReactNode;
}

function VideoOptions({ isOptionsOpen, children }: Props) {
  return (
    <motion.div
      className={`absolute bottom-14 right-0 w-[200px] h-[200px] bg-[#0f0f0fd7] rounded-lg transition-opacity duration-300 ease-in-out ${
        isOptionsOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {children}
    </motion.div>
  );
}

export default VideoOptions;

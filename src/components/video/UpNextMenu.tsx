import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AnimatePresence, motion } from "framer-motion";

const UpNextMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Motion animation for each MenuItem
  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // Initial state of each item (invisible and slightly shifted)
    visible: {
      opacity: 1,
      x: 0, // Animate to the original position
      transition: { duration: 0.5 }, // Duration for each item to transition
    },
  };

  return (
    <div>
      <MoreVertIcon
        sx={{ margin: 1, borderRadius: 10 }}
        onClick={handleClick}
      />
      <AnimatePresence>
        <motion.div
          animate={{ x: 100 }} // Animate the whole menu to the right
          initial={{ x: -100 }} // Start the menu from the left
        >
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }, // Stagger the items
              }}
            >
              <motion.div variants={itemVariants}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </motion.div>
              <motion.div variants={itemVariants}>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </motion.div>
              <motion.div variants={itemVariants}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </motion.div>
            </motion.div>
          </Menu>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UpNextMenu;

import { Button, Modal } from "@mui/material";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export default function BasicModal({
  children,
  handleOpen,
  handleClose,
  open,
}: Props) {
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
}

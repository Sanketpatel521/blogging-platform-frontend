import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  itemName,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography id="delete-confirmation-modal" variant="h6" component="div">
          Delete Confirmation
        </Typography>
        <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
          Are you sure you want to delete {itemName}?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={onClose}
            color="primary"
            variant="outlined"
            sx={{ marginRight: 1 }}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;

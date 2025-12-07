import React from "react";
import { Box } from "@mui/material";

const AddProblemOverlay = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          width: "70%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "white",
          borderRadius: "12px",
          padding: "20px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AddProblemOverlay;

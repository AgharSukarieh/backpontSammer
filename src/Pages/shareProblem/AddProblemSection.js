import React, { useState } from "react";
import { Typography, Card, Button, Box } from "@mui/material";
import AddProblemOverlay from "./AddProblemOverlay";
import AddProblemRequest from "./AddProblemRequest";
const buttonColor = "#00949cff";
const shadowColor = "rgba(23, 160, 164, 0.5)";

const AddProblemSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "29px",
          boxShadow: `0 4px 6px -2px ${shadowColor}`,
          border: "none",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", my: 6 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: "#333" }}>
            شاركنا أفكارك لمسائل جديدة وكن جزءاً من تطوير المجتمع!
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: buttonColor,
              fontWeight: "bold",
              px: 7,
              py: 1.5,
              "&:hover": { backgroundColor: "#006368" },
            }}
            onClick={() => setOpen(true)}
          >
            إضافة
          </Button>
        
        </Box>
      </Card>
            <AddProblemOverlay open={open} onClose={() => setOpen(false)}>
            <AddProblemRequest />
          </AddProblemOverlay>
      {/* Dialog */}
      {/* <AddProblemDialog open={openDialog} onClose={() => setOpenDialog(false)} /> */}
    </>
  );
};

export default AddProblemSection;

import React, { FC } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormSigIn from "./FormSigIn";
import "./sigInModal.css";

interface SigInModalProps {
  open: boolean;
  handleClose: () => void;
}

const SigInModal: FC<SigInModalProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className="modal-container">
        <IconButton onClick={handleClose} className="button-back">
          <ArrowBackIcon />
        </IconButton>
        <FormSigIn handleClose={handleClose} />
        <Box sx={{ width: "50%", background: "#1c1c1c", position: "relative" }}>
          <div
            style={{
              padding: 20,
              color: "white",
            }}
          >
            <h2 style={{ margin: "10px 0px" }}>
              Welcome back to Inlaze Movies
            </h2>
            <Typography style={{ marginTop: "10px" }}>
              Ready to dive into the world of unlimited entertaiment? Enter your
              credentials and let the cinematic adventure begin!
            </Typography>
          </div>
          <img src="/sigIn.png" alt="image" className="image-styles" />
        </Box>
      </Box>
    </Dialog>
  );
};

export default SigInModal;

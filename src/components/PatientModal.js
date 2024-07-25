import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { calculateAge } from "../helpers";

const dummyImages = {
  acne: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZhrOxa-IvBr0z1NECUBYjsbtdVfMDVpalw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzRbJWOaTDtpnuaAI1PeJRiayYRxtzypm9w&s",
  ],
  eczema: [
    "https://images.everydayhealth.com/images/skin-beauty/eczema/types-of-eczema-01-atopic-722x406.jpg?w=720",
  ],
  melanoma: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJPUle3rSdgCWN_XMdvn-ItA6nsXEhpKrfg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxCzWS2JfQ0l1VSLPFOOCSph1TYFM3J9gG6w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTjDbO863hp-PkuNQ3EMXmrco0Ytuh1TLjQ&s",
  ],
  psoriasis: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWjrRaeDTe4jxOKFEIxybY7gDdoQdT-Yaog&s",
  ],
};

const labelStyle = {
  fontWeight: "bold",
};

const PatientModal = ({ isModalOpen, handleClose, patient }) => {
  const {
    allergies,
    dateOfBirth,
    firstName,
    lastName,
    history,
    sex,
    condition,
    medications,
    nextVisit,
    notes,
  } = patient;

  const fullName = `${firstName} ${lastName}`;
  const age = calculateAge(dateOfBirth);
  const images = dummyImages[condition.toLowerCase()] ?? [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      navigateImages("left");
    } else if (event.key === "ArrowRight") {
      navigateImages("right");
    }
  };

  const navigateImages = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : images.length - 1
      );
    } else if (direction === "right") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isModalOpen) {
        handleKeyDown(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogActions>
        <Button
          sx={{ color: "#222", position: "absolute", right: 0, top: 10 }}
          onClick={handleClose}
          color="primary"
        >
          <CloseIcon />
        </Button>
      </DialogActions>
      <DialogTitle sx={{ fontWeight: "bold" }}>{fullName}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <Typography>
              <span style={labelStyle}>Age:</span> {age}
            </Typography>
            <Typography>
              <span style={labelStyle}>Sex:</span> {sex}
            </Typography>
            <Typography>
              <span style={labelStyle}>Condition:</span> {condition}
            </Typography>
            <Typography>
              <span style={labelStyle}>Allergies:</span> {allergies}
            </Typography>
            <Typography>
              <span style={labelStyle}>Medications:</span> {medications}
            </Typography>
            <Typography>
              <span style={labelStyle}>Next Visit:</span> {nextVisit}
            </Typography>
            <Typography>
              <span style={labelStyle}>History:</span> {history}
            </Typography>
            <Typography>
              <span style={labelStyle}>Notes:</span> {notes}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={images[currentImageIndex]}
                alt={`Patient Image ${currentImageIndex + 1}`}
              />
            </Card>
            <Typography sx={{ textAlign: "center", mt: 1 }}>
              {currentImageIndex + 1}/{images.length}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PatientModal;

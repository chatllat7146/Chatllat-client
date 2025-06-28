import React, { useState, useEffect } from "react";
import Aside from "../components/Aside";
import BasicTabs from "../components/TabPanel";
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0E1218",
  border: "1px solid #4b515a",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const AgreementPage = () => {
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect MetaMask and get the wallet address
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  // Function to handle role selection and auto-fetch wallet address
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setOpen(false); // Close the modal when a role is selected
    connectWallet(); // Auto-fetch wallet address
  };

  useEffect(() => {
    if (role) {
      // Auto-fetch wallet address based on selected role
      connectWallet();
    }
  }, [role]);

  return (
    <>
      {/* Modal for role selection */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="role-selection-modal"
        aria-describedby="role-selection-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" align="center" mb={2}>
            Select Your Role
          </Typography>

          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              {/* Payer Button */}
              <Button
                variant="outlined"
                color="white"
                fullWidth
                onClick={() => handleRoleSelect("Payer")}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: "8px", // Space between image and text
                }}
              >
                <img
                  src="images/client.png" // Replace with your actual image path
                  alt="Payer"
                  style={{ width: 50, height: 50 }}
                />
                <Typography variant="body1">I am a Payer</Typography>
              </Button>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              {/* Receiver Button */}
              <Button
                variant="outlined"
                color="white"
                fullWidth
                onClick={() => handleRoleSelect("Receiver")}
              >
                <img
                  src="images/receiver.png" // Replace with your actual image path
                  alt="Receiver"
                  style={{ width: 24, height: 24 }}
                /><br />
                <Typography variant="body1">I'm a Receiver</Typography>
              </Button>
            </Grid>
          </Grid>

          {/* Display selected role and wallet address */}
          {role && (
            <div>
              <Typography variant="h6" align="center" mt={2}>
                Selected Role: {role}
              </Typography>
              <Typography variant="body1" align="center">
                Wallet Address: {walletAddress}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>

      {/* Main Content */}
      <div className="wrapper">
        <main className="main">
          <Aside />
          <BasicTabs />
        </main>
      </div>
    </>
  );
};

export default AgreementPage;

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  Radio,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const RoleSelectionModal = ({
  open,
  setOpen,
  role,
  setRole,
  walletAddress,
  setWalletAddress,
  onConfirm,
}) => {
  const handleRoleSelect = async (selectedRole) => {
    setRole(selectedRole);
    const address = await connectWallet();
    if (address) setWalletAddress(address);
  };

  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Error connecting to MetaMask. Please try again.");
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to connect your wallet."
      );
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(-4);
  };
  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="role-selection-modal"
      aria-describedby="role-selection-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "#0E1218",
          border: "1px solid #4b515a",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
          fontFamily: "Clash Grotesk",
          color: "#fff",
        }}
      >
        <Typography variant="h6" align="center" mb={3}>
          Select Your Role
        </Typography>

        <Grid container rowSpacing={3} columnSpacing={2}>
          {/* CLIENT */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              onClick={async () => {
                if (typeof window.ethereum !== "undefined") {
                  try {
                    const accounts = await window.ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    setAccount(accounts[0]);
                    setWalletAddress(accounts[0]); // set for autofill
                    handleRoleSelect("Payer");
                  } catch (error) {
                    console.error("Error connecting to MetaMask:", error);
                    alert("Error connecting to MetaMask. Please try again.");
                  }
                } else {
                  alert(
                    "MetaMask is not installed. Please install MetaMask to connect your wallet."
                  );
                }
              }}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "flex-end",
                border: "1px solid",
                borderColor: role === "Payer" ? "#fff" : "#4b515a",
                borderRadius: "12px",
                padding: "20px",
                height: "280px",
                background: role === "Payer" ? "transparent" : "transparent",
                textTransform: "none",
              }}
            >
              <Radio
                checked={role === "Payer"}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  pointerEvents: "none",
                  "& .MuiSvgIcon-root": {
                    color: role === "Payer" ? "#ffffff" : "#4b515a",
                  },
                }}
              />
              <img
                src={
                  role === "Payer"
                    ? "images/client-white.png"
                    : "images/client-grey.png"
                }
                alt="Payer"
                style={{ width: 150, height: 150 }}
              />
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 24,
                  color: role === "Payer" ? "#fff" : "#4b515a",
                }}
              >
                I'm a Payer
              </Typography>
            </Button>
          </Grid>

          {/* FREELANCER */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              onClick={async () => {
                if (typeof window.ethereum !== "undefined") {
                  try {
                    const accounts = await window.ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    setAccount(accounts[0]);
                    setWalletAddress(accounts[0]); // set for autofill
                    handleRoleSelect("Receiver");
                  } catch (error) {
                    console.error("Error connecting to MetaMask:", error);
                    alert("Error connecting to MetaMask. Please try again.");
                  }
                } else {
                  alert(
                    "MetaMask is not installed. Please install MetaMask to connect your wallet."
                  );
                }
              }}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "flex-end",
                border: "1px solid",
                borderColor: role === "Receiver" ? "#fff" : "#4b515a",
                borderRadius: "12px",
                padding: "20px",
                height: "280px",
                backgroundColor:
                  role === "Receiver" ? "transparent" : "transparent",
                textTransform: "none",
              }}
            >
              <Radio
                checked={role === "Receiver"}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  pointerEvents: "none",
                  color: role === "Receiver" ? "#fff" : "#4b515a",
                  "& .MuiSvgIcon-root": {
                    color: role === "Receiver" ? "#ffffff" : "#4b515a",
                  },
                }}
              />
              <img
                src={
                  role === "Receiver"
                    ? "images/freelancer-white.png"
                    : "images/freelancer-grey.png"
                }
                alt="Receiver"
                style={{ width: 150, height: 150 }}
              />
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 24,
                  color: role === "Receiver" ? "#fff" : "#4b515a",
                }}
              >
                I'm a Receiver
              </Typography>
            </Button>
          </Grid>
        </Grid>

        {/* Role selected wallet address auto-filling */}
        {role && (
          <div>
            <TextField
              id="wallet-address"
              label={
                role === "Payer"
                  ? "Payer Wallet Address"
                  : "Receiver Wallet Address"
              }
              variant="outlined"
              value={walletAddress}
              disabled
              fullWidth
              inputProps={{ style: { border: "none" } }}
              sx={{ mt: 2 }}
            />
          </div>
        )}

        {/* Create Agreement Button */}
        <Box mt={4} sx={{ display: "flex", justifyContent: "end" }}>
          <Typography
            component="span"
            onClick={() => {
              if (role) {
                onConfirm?.(); // optional chaining for safety
              }
            }}
            sx={{
              fontFamily: "Clash Grotesk",
              fontSize: 16,
              fontWeight: "medium",
              display: "flex",
              alignItems: "center",
              color: role ? "#fff" : "#4b515a",
              cursor: role ? "pointer" : "not-allowed",
              pointerEvents: role ? "auto" : "none",
            }}
          >
            Create Agreement
            <Box
              sx={{
                border: `1.5px solid ${role ? "#fff" : "#4b515a"}`,
                borderRadius: "5px",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 1,
                background: role ? "#fff" : "transparent",
              }}
            >
              <ArrowForwardIcon
                fontSize="small"
                sx={{
                  color: role ? "#000" : "#4b515a",
                }}
              />
            </Box>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoleSelectionModal;

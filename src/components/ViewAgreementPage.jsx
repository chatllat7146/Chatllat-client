import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WalletContext } from "../../context/WalletContext";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0d12",
      paper: "#0a0d12",
    },
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#FF9800",
    },
    error: {
      main: "#f44336",
    },
  },
});

const ViewAgreementPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { walletAddress } = useContext(WalletContext);

  const [inputLink, setInputLink] = useState("");
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementData, setAgreementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonStates, setButtonStates] = useState({
    accept: false,
    negotiate: false,
    cancel: false,
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [cancellationReason, setCancellationReason] = useState("");

  useEffect(() => {
    if (id) {
      const fullUrl = `${window.location.origin}/view-agreement/${id}`;
      setInputLink(fullUrl);
      handleViewAgreement(id);
    }
  }, [id]);

  const extractIdFromLink = (link) => {
    const parts = link.split("/view-agreement/");
    return parts.length > 1 ? parts[1] : null;
  };

  const handleViewAgreement = async (agreementId = null) => {
    const idToUse = agreementId || extractIdFromLink(inputLink);
    if (!idToUse) {
      setNotification({
        open: true,
        message: "Enter a valid agreement link",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agreement/${idToUse}`);
      const result = await res.json();
      if (result.success) {
        setAgreementData(result.agreement);
        setShowAgreement(true);

        if (walletAddress) {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agreement/${idToUse}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "view", walletAddress }),
          });

          const { role, payerWallet, receiverWallet } = result.agreement;
          if (
            (role === "Receiver" && !payerWallet) ||
            (role === "Payer" && !receiverWallet)
          ) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agreement/${idToUse}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "connect_wallet", walletAddress }),
            });
            const refresh = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/agreement/${idToUse}`
            );
            const refreshed = await refresh.json();
            if (refreshed.success) setAgreementData(refreshed.agreement);
          }
        }
      } else {
        throw new Error(result.message || "Agreement not found");
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Legacy handler for original agreement actions (Accept, Negotiate, Cancel)
  const handleAgreementAction = async (status, actionName, reason = null) => {
    if (!walletAddress || !agreementData?.agreementId) {
      setNotification({
        open: true,
        message: "Missing wallet or agreement ID",
        severity: "error",
      });
      return;
    }

    const buttonKey =
      actionName === "accepted"
        ? "accept"
        : actionName === "negotiated"
        ? "negotiate"
        : "cancel";
    
    // Set button states based on the action
    if (buttonKey === "accept") {
      setButtonStates(prev => ({ ...prev, accept: true, negotiate: true }));
    } else if (buttonKey === "negotiate") {
      setButtonStates(prev => ({ ...prev, accept: true, negotiate: true }));
    } else if (buttonKey === "cancel") {
      setButtonStates(prev => ({ ...prev, accept: true, negotiate: true, cancel: true }));
    }

    setLoading(true);
    try {
      const requestBody = {
        walletAddress,
        agreementId: agreementData.agreementId,
        status,
      };

      if (reason && status === "Rejected") {
        requestBody.cancellationReason = reason;
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement/wallet/addAddress`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await res.json();
      if (result.success) {
        setAgreementData(result.updatedAgreement);
        setNotification({
          open: true,
          message: `Agreement ${actionName} successfully`,
          severity: "success",
        });
      } else {
        throw new Error(result.message || `Failed to ${actionName}`);
      }
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
      // Reset button states on error
      setButtonStates(prev => ({ ...prev, accept: false, negotiate: false, cancel: false }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAgreement = () => {
    setCancellationReason("");
    setConfirmDialog({
      open: true,
      title: "Cancel Agreement",
      message:
        "Are you sure you want to cancel this agreement? This action cannot be undone and will terminate the agreement permanently.",
      onConfirm: () => {
        setConfirmDialog({ ...confirmDialog, open: false });
        handleAgreementAction("Rejected", "cancelled", cancellationReason);
      },
    });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
    setCancellationReason("");
  };

  const handleSubmitContactInfo = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement/details/personal`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agreementId: agreementData.agreementId,
            details: contactForm,
          }),
        }
      );
      const result = await res.json();
      if (result.success) {
        setAgreementData((prev) => ({
          ...prev,
          ...result.data,
        }));

        setNotification({
          open: true,
          message: "Contact details saved",
          severity: "success",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "created":
        return "#d1d5db";
      case "accepted":
        return "#10b981";
      case "negotiated":
        return "#3b82f6";
      case "rejected":
        return "#ef4444";
      case "escrowfunded":
        return "#8b5cf6";
      case "worksubmitted":
        return "#f59e0b";
      case "completed":
        return "#10b981";
      case "disputed":
        return "#ef4444";
      case "AgreementUpdated":
        return "#6b7280";
      default:
        return "#d1d5db";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Not connected";

  // Determine user role and permissions
  const isPayer = walletAddress === agreementData?.payerWallet;
  const isReceiver = walletAddress === agreementData?.receiverWallet;

  // Render action buttons - only three buttons with specific disable logic
  const renderActionButtons = () => {
    if (!agreementData || !walletAddress) return null;

    return [
      <button
        key="accept"
        onClick={() => handleAgreementAction("Accepted", "accepted")}
        disabled={loading || buttonStates.accept}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "16px 24px",
          fontSize: "18px",
          fontWeight: "600",
          color: (loading || buttonStates.accept) ? "#6b7280" : "#10b981",
          cursor: (loading || buttonStates.accept) ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: (loading || buttonStates.accept) ? 0.5 : 1,
          borderColor: (loading || buttonStates.accept) ? "#6b7280" : "#10b981"
        }}
        onMouseOver={(e) => {
          if (!loading && !buttonStates.accept) {
            e.target.style.backgroundColor = "#10b981";
            e.target.style.color = "#ffffff";
          }
        }}
        onMouseOut={(e) => {
          if (!loading && !buttonStates.accept) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#10b981";
          }
        }}
      >
        Accept Agreement
      </button>,
      <button
        key="negotiate"
        onClick={() => handleAgreementAction("Negotiated", "negotiated")}
        disabled={loading || buttonStates.negotiate}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #f59e0b",
          borderRadius: "8px",
          padding: "16px 24px",
          fontSize: "18px",
          fontWeight: "600",
          color: (loading || buttonStates.negotiate) ? "#6b7280" : "#f59e0b",
          cursor: (loading || buttonStates.negotiate) ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: (loading || buttonStates.negotiate) ? 0.5 : 1,
          borderColor: (loading || buttonStates.negotiate) ? "#6b7280" : "#f59e0b"
        }}
        onMouseOver={(e) => {
          if (!loading && !buttonStates.negotiate) {
            e.target.style.backgroundColor = "#f59e0b";
            e.target.style.color = "#ffffff";
          }
        }}
        onMouseOut={(e) => {
          if (!loading && !buttonStates.negotiate) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#f59e0b";
          }
        }}
      >
        Negotiate Agreement
      </button>,
      <button
        key="cancel"
        onClick={handleCancelAgreement}
        disabled={loading || buttonStates.cancel}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #ef4444",
          borderRadius: "8px",
          padding: "16px 24px",
          fontSize: "18px",
          fontWeight: "600",
          color: (loading || buttonStates.cancel) ? "#6b7280" : "#ef4444",
          cursor: (loading || buttonStates.cancel) ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: (loading || buttonStates.cancel) ? 0.5 : 1,
          borderColor: (loading || buttonStates.cancel) ? "#6b7280" : "#ef4444"
        }}
        onMouseOver={(e) => {
          if (!loading && !buttonStates.cancel) {
            e.target.style.backgroundColor = "#ef4444";
            e.target.style.color = "#ffffff";
          }
        }}
        onMouseOut={(e) => {
          if (!loading && !buttonStates.cancel) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ef4444";
          }
        }}
      >
        Cancel Agreement
      </button>
    ];
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          backgroundColor: "#0E1218",
          minHeight: "100%",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px 10px",
        }}
      >
        {!showAgreement ? (
          <Paper
            sx={{ p: 4, maxWidth: 600, mx: "auto", backgroundColor: "#0a0d12" }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 3, textAlign: "center", color: "#ffffff" }}
            >
              View Agreement
            </Typography>
            <TextField
              fullWidth
              label="Paste Agreement Link"
              value={inputLink}
              onChange={(e) => setInputLink(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  "& fieldset": { borderColor: "#4b5563" },
                  "&:hover fieldset": { borderColor: "#6b7280" },
                  "&.Mui-focused fieldset": { borderColor: "#10b981" },
                },
                "& .MuiInputLabel-root": { color: "#d1d5db" },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleViewAgreement()}
              disabled={loading || !inputLink}
              sx={{
                backgroundColor: "#10b981",
                "&:hover": { backgroundColor: "#059669" },
                "&:disabled": { backgroundColor: "#374151" },
              }}
            >
              {loading ? "Loading..." : "View Agreement"}
            </Button>
          </Paper>
        ) : (
          <div style={{ maxWidth: "1000px", margin: "0 auto", border: "1px solid #4B515A", padding: "20px 30px" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#ffffff" }}>
                Agreement ID: {agreementData?.agreementId}
              </div>
              <div
                style={{
                  backgroundColor: getStatusColor(agreementData?.status),
                  color:
                    agreementData?.status?.toLowerCase() === "created"
                      ? "#374151"
                      : "#ffffff",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {agreementData?.status}
              </div>
            </div>

            {/* Title and Description */}
            <div style={{ marginBottom: "40px" }}>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  margin: "0 0 12px 0",
                  color: "#ffffff",
                }}
              >
                {agreementData?.projectTitle}
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#d1d5db",
                }}
              >
                {agreementData?.projectDescription}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "2px",
                background: "linear-gradient(to right, #4b5563, #1f2937)",
                marginBottom: "15px",
              }}
            ></div>

            {/* Agreement Details Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                marginBottom: "25px",
              }}
            >
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "5px",
                    }}
                  >
                    Payer:
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d1d5db",
                    }}
                  >
                    {formatAddress(agreementData?.payerWallet)}
                    {isPayer && (
                      <span
                        style={{
                          marginLeft: "8px",
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "5px",
                    }}
                  >
                    Chain:
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    💰 {agreementData?.amountDetails?.chain}
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "5px",
                    }}
                  >
                    Receiver:
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d1d5db",
                    }}
                  >
                    {formatAddress(agreementData?.receiverWallet)}
                    {isReceiver && (
                      <span
                        style={{
                          marginLeft: "8px",
                          backgroundColor: "#f59e0b",
                          color: "#ffffff",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "5px",
                    }}
                  >
                    Deadline:
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d1d5db",
                    }}
                  >
                    {formatDate(agreementData?.deadline)}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  Amount:
                </div>
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {agreementData?.amountDetails?.amount}{" "}
                  {agreementData?.amountDetails?.currency || "USDT"}
                </div>
              </div>
            </div>

            {/* Contact Info Section */}
            <div
              style={{
                border: "2px solid #374151",
                borderRadius: "8px",
                padding: "15px 20px",
                marginBottom: "40px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 15px 0",
                }}
              >
                Your Contact Info (Optional) :
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto",
                  gap: "20px",
                  alignItems: "end",
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid #4b5563",
                    borderRadius: "4px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#ffffff",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid #4b5563",
                    borderRadius: "4px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#ffffff",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={contactForm.contact}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
                  }
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid #4b5563",
                    borderRadius: "4px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#ffffff",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSubmitContactInfo}
                  style={{
                    backgroundColor: "#059669",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#047857")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#059669")
                  }
                >
                  Save Info
                </button>
              </div>
            </div>

            {/* Wallet Connection Check */}
            {!walletAddress && (
              <div
                style={{
                  backgroundColor: "#fbbf24",
                  color: "#92400e",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                Please connect your wallet to see available actions
              </div>
            )}

            {/* Action Buttons - Always show the 3 buttons */}
            {walletAddress && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "30px",
                  marginBottom: "60px",
                }}
              >
                {renderActionButtons()}
              </div>
            )}

            {/* Status Footer */}
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                color: "#d1d5db",
              }}
            >
              <span style={{ fontWeight: "600" }}>Status :</span>{" "}
              {agreementData?.status}
              {agreementData?.actions && agreementData.actions.length > 0 && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    marginTop: "8px",
                  }}
                >
                  Last action:{" "}
                  {
                    agreementData.actions[agreementData.actions.length - 1]
                      ?.details
                  }
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        >
          <Alert severity={notification.severity}>{notification.message}</Alert>
        </Snackbar>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialog.open}
          onClose={handleCloseConfirmDialog}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#1f2937",
              color: "#ffffff",
            },
          }}
        >
          <DialogTitle id="confirm-dialog-title" sx={{ color: "#fff" }}>
            {confirmDialog.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="confirm-dialog-description"
              sx={{ color: "#ccc", mb: 2 }}
            >
              {confirmDialog.message}
            </DialogContentText>

            {/* Cancellation Reason Input */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Reason for Cancellation (Optional)"
              placeholder="Please provide a reason for cancelling this agreement..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              variant="outlined"
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#777",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f44336",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#ccc",
                  "&.Mui-focused": {
                    color: "#f44336",
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseConfirmDialog}
              color="inherit"
              variant="outlined"
            >
              No
            </Button>
            <Button
              onClick={confirmDialog.onConfirm}
              color="error"
              variant="contained"
              autoFocus
            >
              Yes, Cancel Agreement
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default ViewAgreementPage;
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  IconButton,
  Chip,
  Divider,
  TextField,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  InsertPhoto as ImageIcon,
  Description as FileIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const DisputeResponseModal = ({
  open,
  onClose,
  disputeData,
  onSubmitResponse,
}) => {
  const fileInputRef = useRef(null);
  const [responseText, setResponseText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshedData, setRefreshedData] = useState(null);

  // ✅ Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setResponseText("");
      setUploadedFiles([]);
      setRefreshedData(null);
    }
  }, [open]);

  // ✅ Helper function to get dispute reason from API data
  const getDisputeReason = (data) => {
    console.log('🔍 Getting dispute reason from data:', data);

    if (!data) return "No reason provided";

    // Try the nested reasons structure from API
    if (data.reasons) {
      const reason = data.reasons.payerReason ||
        data.reasons.receiverReason ||
        data.reasons.autoCreatedReason;

      if (reason) {
        console.log('✅ Found reason in reasons object:', reason);
        return reason;
      }
    }

    // ✅ Fallback to flattened props if available
    if (data.payerReasons || data.receiverReason) {
      const reason = data.payerReasons || data.receiverReason;
      console.log('✅ Found reason in flattened props:', reason);
      return reason;
    }


    // Fallback to flat disputeReason field
    if (data.disputeReason) {
      console.log('✅ Found reason in disputeReason field:', data.disputeReason);
      return data.disputeReason;
    }

    console.log('❌ No reason found in data');
    return "No reason provided";
  };

  // ✅ Helper function to get attached evidence from API data
  const getAttachedEvidence = (data) => {
    console.log('🔍 Getting attached evidence from data:', data);

    if (!data) return [];

    // Try attachedEvidence first (from the processed structure)
    if (data.attachedEvidence && Array.isArray(data.attachedEvidence)) {
      console.log('✅ Found evidence in attachedEvidence:', data.attachedEvidence.length);
      return data.attachedEvidence;
    }

    // Try nested evidence structure from API
    if (data.evidence) {
      const payerEvidence = data.evidence.payerEvidence || [];
      const receiverEvidence = data.evidence.receiverEvidence || [];
      const allEvidence = [...payerEvidence, ...receiverEvidence];

      console.log('✅ Found evidence in nested structure:', {
        payerEvidence: payerEvidence.length,
        receiverEvidence: receiverEvidence.length,
        total: allEvidence.length
      });

      return allEvidence;
    }

    console.log('❌ No evidence found in data');
    return [];
  };

  // ✅ Function to refresh dispute data from API
  const refreshDisputeData = async () => {
    if (!disputeData?.agreementId) return;

    setDataLoading(true);
    try {
      console.log('🔄 Refreshing dispute data for agreement:', disputeData.agreementId);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/dispute/details?agreementId=${disputeData.agreementId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Refreshed dispute data:', data);

      if (data.success && data.dispute) {
        // Map fresh data from API
        const freshData = {
          disputeId: data.dispute.disputeId,
          agreementId: data.dispute.agreementId,
          projectTitle: data.dispute.projectTitle,
          disputeCategory: data.dispute.disputeCategory,
          raisedOn: data.dispute.createdAt,
          status: data.dispute.status,
          payerReasons: data.dispute.reasons?.payerReason,
          receiverReason: data.dispute.reasons?.receiverReason,
          evidence: data.dispute.evidence,
          attachedEvidence: [
            ...(data.dispute.evidence?.payerEvidence || []),
            ...(data.dispute.evidence?.receiverEvidence || [])
          ],
        };

        setRefreshedData(freshData);
        console.log('✅ Set refreshed data:', freshData);
      }

    } catch (error) {
      console.error('❌ Error refreshing dispute data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  // ✅ Use refreshed data if available, otherwise use props data
  const currentData = refreshedData || disputeData;

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const maxSizeMB = 200;
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File too large: ${file.name}`);
        return false;
      }
      return true;
    });
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
    e.target.value = "";
  };

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      alert("Please enter a response");
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrls = [];
      if (uploadedFiles.length > 0) {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload/file`,
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadResult = await uploadResponse.json();
        if (uploadResult.success) {
          fileUrls = uploadResult.data.imgUrls;
        }
      }

      const responseData = {
        disputeId: currentData?.disputeId,
        agreementId: currentData?.agreementId,
        response: responseText,
        attachments: fileUrls,
      };

      if (onSubmitResponse) await onSubmitResponse(responseData);
      setResponseText("");
      setUploadedFiles([]);
      onClose();
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatted = date.toLocaleDateString("en-GB", options);
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";
    return formatted.replace(/^\d+/, `${day}${suffix}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting for Response":
      case "DisputeRaised":
        return "#FFD700";
      case "InProcess":
      case "Under Review":
        return "#FF9800";
      case "Resolved":
        return "#4CAF50";
      case "Rejected":
        return "#F44336";
      default:
        return "#FFD700";
    }
  };

  const renderEvidence = (evidence = []) =>
    evidence.map((url, index) => {
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
      return (
        <Grid item xs={4} key={index}>
          <Paper
            onClick={() => window.open(url, "_blank")}
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            {isImage ? (
              <ImageIcon sx={{ fontSize: 36, color: "#FFD700" }} />
            ) : (
              <FileIcon sx={{ fontSize: 36, color: "#FFD700" }} />
            )}
            <Typography
              variant="body2"
              sx={{ mt: 1, color: "#ccc", wordBreak: "break-all" }}
            >
              {`File ${index + 1}`}
            </Typography>
          </Paper>
        </Grid>
      );
    });

  // ✅ Get the dispute reason and evidence using helper functions
  const disputeReason = getDisputeReason(currentData);
  const attachedEvidence = getAttachedEvidence(currentData);

  // ✅ Debug logging
  console.log('🔍 DisputeResponseModal render:', {
    disputeData,
    refreshedData,
    currentData,
    disputeReason,
    attachedEvidenceCount: attachedEvidence.length
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        border: '1px solid #4B515A'
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 2,
          border: '1px solid #4B515A',
          background: '#0E1218'
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Chip
            label={`Dispute ID : ${currentData?.disputeId || "Loading..."}`}
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* ✅ Add refresh button */}
            <IconButton
              onClick={refreshDisputeData}
              disabled={dataLoading}
              sx={{ color: "#fff" }}
              title="Refresh dispute data"
            >
              {dataLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
            </IconButton>

            <Chip
              label={currentData?.status || "Unknown"}
              sx={{
                backgroundColor: "transparent",
                color: getStatusColor(currentData?.status),
                border: `2px solid ${getStatusColor(currentData?.status)}`,
                fontWeight: "bold",
              }}
            />
            <IconButton onClick={onClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* ✅ Show loading indicator when refreshing */}
        {dataLoading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={16} />
              <span>Refreshing dispute data...</span>
            </Box>
          </Alert>
        )}

        <Typography variant="h6" sx={{ mb: 1 }}>
          Agreement ID: {currentData?.agreementId || "Loading..."}
        </Typography>

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          {currentData?.projectTitle || "Loading project title..."}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Dispute Reason:
        </Typography>
        {/* ✅ Display the fetched dispute reason */}
        <Typography
          sx={{
            mb: 3,
            fontStyle: disputeReason === "No reason provided" ? "italic" : "normal",
            color: disputeReason === "No reason provided" ? "#888" : "#fff",
            backgroundColor: disputeReason !== "No reason provided" ? "#1a2332" : "transparent",
            p: disputeReason !== "No reason provided" ? 2 : 0,
            borderRadius: 1,
            border: disputeReason !== "No reason provided" ? "1px solid #4B515A" : "none"
          }}
        >
          {disputeReason}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Dispute Category:
            </Typography>
            <Typography>{currentData?.disputeCategory || "Loading..."}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Raised On:
            </Typography>
            <Typography>{formatDate(currentData?.raisedOn)}</Typography>
          </Grid>
        </Grid>

        {/* ✅ Display attached evidence from API */}
        {attachedEvidence.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Attached Evidence ({attachedEvidence.length} files):
            </Typography>
            <Grid container spacing={2}>
              {renderEvidence(attachedEvidence)}
            </Grid>
          </>
        )}

        {/* ✅ Show message if no evidence */}
        {attachedEvidence.length === 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Alert severity="info" sx={{ mb: 2 }}>
              No evidence files attached to this dispute.
            </Alert>
          </>
        )}

        {/* Response Input */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Your Response:
        </Typography>
        <TextField
          multiline
          fullWidth
          placeholder="Enter your response against dispute"
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          disabled={isSubmitting}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "transparent",
              border: "2px solid #4A5568",
              borderRadius: "8px",
              color: "#9CA3AF",
              minHeight: "120px",
            },
          }}
        />

        {/* File Upload */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Attach Proof:
          </Typography>
          <Paper
            sx={{
              border: "2px dashed #4A5568",
              borderRadius: "8px",
              p: 4,
              textAlign: "center",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "#6B7280", mb: 2 }} />
            <Typography sx={{ color: "#9CA3AF" }}>
              Drag & Drop or click to upload files
            </Typography>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileInputChange}
              hidden
              disabled={isSubmitting}
            />
          </Paper>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitResponse}
            disabled={isSubmitting || !responseText.trim()}
            sx={{ backgroundColor: "#FFD700", color: "#000" }}
          >
            {isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        </Box>

        {/* ✅ Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: "#1a1a1a", borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: "#888" }}>
              Debug Info: Reason found: {disputeReason !== "No reason provided" ? "✅" : "❌"} |
              Evidence count: {attachedEvidence.length} |
              Status: {currentData?.status || "N/A"}
            </Typography>
          </Box>
        )}
      </Paper>
    </Modal>
  );
};

export default DisputeResponseModal;
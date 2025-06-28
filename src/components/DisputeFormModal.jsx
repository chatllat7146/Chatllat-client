import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  LinearProgress,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import DisputeSelect from "./DisputeSelect";

const DisputeFormModal = ({ 
  open, 
  onClose, 
  agreement, 
  currentWalletAddress, 
  onDisputeSuccess 
}) => {
  // File upload states
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [proofFiles, setProofFiles] = useState([]); // Store Cloudinary URLs

  // Form states
  const [formData, setFormData] = useState({
    agreementId: agreement?.agreementId || "",
    projectTitle: agreement?.projectTitle || "",
    disputeReason: "",
    description: "",
  });

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Update form data when agreement changes
  React.useEffect(() => {
    if (agreement) {
      setFormData(prev => ({
        ...prev,
        agreementId: agreement.agreementId || "",
        projectTitle: agreement.projectTitle || "",
      }));
    }
  }, [agreement]);

  // File validation
  const isValidFile = (file) => {
    const maxSizeMB = 200;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setNotification({
        open: true,
        message: `File too large: ${file.name}. Maximum size is ${maxSizeMB}MB.`,
        severity: "error",
      });
      return false;
    }

    return true;
  };

  // File handling functions
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(isValidFile);
    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setUploadProgress((prevProgress) => [
        ...prevProgress,
        ...Array(validFiles.length).fill(0),
      ]);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setUploadProgress((prevProgress) =>
      prevProgress.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleUploadFiles = async () => {
    console.log("Uploading dispute proof files");
    if (uploadedFiles.length === 0) {
      setNotification({
        open: true,
        message: "Please select files to upload",
        severity: "warning",
      });
      return;
    }

    setIsUploading(true);
    const formDataUpload = new FormData();

    uploadedFiles.forEach((file) => {
      formDataUpload.append("files", file);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload/file`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success || !result.data?.imgUrls) {
        throw new Error(result.message || "Upload failed");
      }

      setProofFiles((prev) => [...prev, ...result.data.imgUrls]);
      setUploadProgress((prev) => prev.map(() => 100));
      setNotification({
        open: true,
        message: `Uploaded ${result.data.imgUrls.length} proof file(s) successfully`,
        severity: "success",
      });
    } catch (err) {
      console.error("Upload error:", err);
      setNotification({
        open: true,
        message: `Upload failed: ${err.message}`,
        severity: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFileSelect(files);
    e.target.value = "";
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    const iconMap = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      txt: "📄",
      xls: "📊",
      xlsx: "📊",
      csv: "📊",
      ppt: "📽️",
      pptx: "📽️",
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
      svg: "🖼️",
      mp4: "🎥",
      avi: "🎥",
      mov: "🎥",
      mp3: "🎵",
      wav: "🎵",
      zip: "🗜️",
      rar: "🗜️",
      js: "💻",
      html: "💻",
      css: "💻",
    };

    return iconMap[extension] || "📎";
  };

  const renderFilePreview = (file, index) => {
    const isImage = file.type.startsWith("image/");

    return (
      <Box
        key={index}
        sx={{
          position: "relative",
          width: 60,
          height: 60,
          border: "1px solid #555",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#222",
        }}
        onClick={() => setPreviewFile(file)}
      >
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box sx={{ textAlign: "center", p: 1 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {getFileIcon(file.name)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: 10, wordBreak: "break-all", display: "block" }}
            >
              {file.name.length > 15
                ? `${file.name.substring(0, 12)}...`
                : file.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: 8, color: "#888", display: "block", mt: 0.5 }}
            >
              {(file.size / 1024 / 1024).toFixed(1)}MB
            </Typography>
          </Box>
        )}

        <IconButton
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.9)",
            },
            width: 15,
            height: 15,
          }}
          onClick={(e) => {
            e.stopPropagation();
            removeFile(index);
          }}
        >
          <CloseIcon sx={{ width: 12 }} />
        </IconButton>

        {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              p: 0.5,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={uploadProgress[index]}
              sx={{ height: 4 }}
            />
          </Box>
        )}
      </Box>
    );
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitDispute = async () => {
    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    // Validation
    if (!formData.disputeReason || !formData.description) {
      setNotification({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🚀 Submitting dispute for agreement:", formData.agreementId);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dispute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agreementId: formData.agreementId,
          connectedWallet: currentWalletAddress,
          reason: formData.description,
          disputeCategory: formData.disputeReason,
          evidence: proofFiles
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create dispute');
      }

      console.log("✅ Dispute created successfully:", data);

      // Show success notification
      setNotification({
        open: true,
        message: 'Dispute raised successfully! The case will be reviewed by our team.',
        severity: 'success'
      });

      // Call the success callback to update parent component
      if (onDisputeSuccess) {
        onDisputeSuccess({
          agreementId: formData.agreementId,
          disputeId: data.data?.disputeId,
          status: "Disputed"
        });
      }

      // Close modal after a short delay to show success message
      setTimeout(() => {
        handleCancelDispute();
        onClose();
      }, 1500);

    } catch (error) {
      console.error("❌ Error creating dispute:", error);
      setNotification({
        open: true,
        message: error.message || "Failed to create dispute. Please try again.",
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelDispute = () => {
    // Reset all form states
    setUploadedFiles([]);
    setUploadProgress([]);
    setProofFiles([]);
    setFormData({
      agreementId: agreement?.agreementId || "",
      projectTitle: agreement?.projectTitle || "",
      disputeReason: "",
      description: "",
    });
    setPreviewFile(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    handleCancelDispute();
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="dispute-form-modal"
        aria-describedby="dispute-form-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#0e1218",
            color: "#fff",
            width: '100%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 2,
            border: '1px solid #4B515A',
            outline: 'none',
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid #4B515A",
            }}
          >
            <Typography variant="h6" id="dispute-form-modal">
              Raise a Dispute
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: "#fff" }} disabled={isSubmitting}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Modal Content */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Agreement ID */}
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Agreement ID"
                  variant="outlined"
                  fullWidth
                  value={formData.agreementId}
                  disabled
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "#fff",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#aaa",
                    }
                  }}
                />
              </Grid>

              {/* Project Title */}
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Project Title"
                  variant="outlined"
                  fullWidth
                  value={formData.projectTitle}
                  disabled
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "#fff",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#aaa",
                    }
                  }}
                />
              </Grid>

              {/* Dispute Reason Dropdown */}
              <Grid size={{ xs: 12, md: 12 }}>
                <DisputeSelect
                  value={formData.disputeReason}
                  onChange={(event) => handleInputChange("disputeReason", event.target.value)}
                  disabled={isSubmitting}
                />
              </Grid>

              {/* Description */}
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Reason for Dispute *"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your dispute in detail. Include specific issues, timeline, and any relevant information."
                  disabled={isSubmitting}
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "transparent",
                      color: "#fff",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#aaa",
                    }
                  }}
                />
              </Grid>

              {/* File Upload Section */}
              <Grid size={{ xs: 12 }}>
                <Grid container>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                      Upload Dispute Evidence (Optional)
                    </Typography>

                    <Box
                      sx={{
                        p: 1,
                        border: "1px solid #555",
                        borderRadius: 2,
                        textAlign: "center",
                        color: "#aaa",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        backgroundColor: "transparent",
                        transition: "all 0.3s ease",
                        opacity: isSubmitting ? 0.6 : 1,
                        "&:hover": !isSubmitting ? {
                          backgroundColor: "#222",
                          borderColor: "#777",
                        } : {},
                      }}
                      onDragOver={!isSubmitting ? handleDragOver : undefined}
                      onDrop={!isSubmitting ? handleDrop : undefined}
                      onClick={!isSubmitting ? () => fileInputRef.current?.click() : undefined}
                    >
                      <CloudUploadIcon sx={{ fontSize: 20, color: "#666" }} />
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Drag & Drop files here or click to select
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        All file types supported • Max size: 200MB each
                      </Typography>

                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        accept="*/*"
                        style={{ display: "none" }}
                        onChange={handleFileInputChange}
                        disabled={isSubmitting}
                      />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* File Previews */}
                    {uploadedFiles.length > 0 && (
                      <Box sx={{ mt: 3, ml: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: "#fff" }}>
                          Selected Files ({uploadedFiles.length})
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {uploadedFiles.map((file, index) => renderFilePreview(file, index))}
                        </Box>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUploadFiles}
                          disabled={isUploading || uploadedFiles.length === 0 || isSubmitting}
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            backgroundColor: "#4caf50",
                            "&:hover": {
                              backgroundColor: "#45a049",
                            },
                          }}
                        >
                          {isUploading
                            ? "Uploading..."
                            : `Upload ${uploadedFiles.length} File(s)`}
                        </Button>
                      </Box>
                    )}

                    {/* Uploaded Files Display */}
                    {proofFiles.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: "#4caf50", mb: 1 }}>
                          ✅ {proofFiles.length} file(s) uploaded successfully
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Modal Actions */}
          <Box sx={{ p: 2, borderTop: "1px solid #333", display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCancelDispute}
              variant="outlined"
              disabled={isSubmitting || isUploading}
            >
              Reset Form
            </Button>
            <Button
              onClick={handleSubmitDispute}
              variant="contained"
              color="primary"
              disabled={isSubmitting || isUploading || !formData.disputeReason || !formData.description}
              sx={{
                backgroundColor: "#f44336",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
                "&:disabled": {
                  backgroundColor: "#666",
                },
              }}
            >
              {isSubmitting ? "Submitting Dispute..." : "Submit Dispute"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* File Preview Modal */}
      <Modal
        open={Boolean(previewFile)}
        onClose={() => setPreviewFile(null)}
        aria-labelledby="file-preview-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          sx={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            width: '100%',
            maxWidth: 600,
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 2,
            outline: 'none',
          }}
        >
          {/* Preview Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid #333",
            }}
          >
            <Typography variant="h6" id="file-preview-modal">
              {previewFile?.name}
            </Typography>
            <IconButton
              onClick={() => setPreviewFile(null)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Preview Content */}
          <Box sx={{ p: 3 }}>
            {previewFile && (
              <Box sx={{ textAlign: "center" }}>
                {previewFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(previewFile)}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      {getFileIcon(previewFile.name)}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {previewFile.type.includes("pdf")
                        ? "PDF Document"
                        : previewFile.type.includes("video")
                          ? "Video File"
                          : previewFile.type.includes("audio")
                            ? "Audio File"
                            : previewFile.type.includes("zip") ||
                              previewFile.type.includes("rar")
                              ? "Archive File"
                              : "Document"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {previewFile.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#888", display: "block", mb: 1 }}
                    >
                      Size: {(previewFile.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#888", display: "block" }}
                    >
                      Type: {previewFile.type || "Unknown"}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DisputeFormModal;
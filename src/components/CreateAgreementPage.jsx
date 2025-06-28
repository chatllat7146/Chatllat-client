import { useState, useContext, useRef } from "react";
import { NumericFormat } from "react-number-format";
import {
  Box,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  LinearProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CssBaseline from "@mui/material/CssBaseline";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Aside from "./Aside";
import "../styles/style.min.css";
import RoleSelectionModal from "../components/RoleSelectionModal";
import { WalletContext } from "../../context/WalletContext";
import React from "react";
import polygonIcon from "../assets/icons/USDT EIP20.png";
import ethereumIcon from "../assets/icons/USDT ERC20.png";
import binanceIcon from "../assets/icons/USDT BEP20.png";
import { Select, MenuItem } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0E1218",
      paper: "#0E1218",
    },
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            outline: "none",
          },
        },
        input: {
          border: "none",
          "&:focus": {
            border: "none",
          },
        },
      },
    },
  },
});

export default function CreateAgreementPage() {
  const { walletAddress } = useContext(WalletContext);
  const fileInputRef = useRef(null);

  // Form states
  const [date, setDate] = useState(null);
  const [role, setRole] = useState("");
  const [roleModalOpen, setRoleModalOpen] = useState(true);
  const [generatedLink, setGeneratedLink] = useState("");
  const [agreementId, setAgreementId] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form data states
  const [formData, setFormData] = useState({
    payerWallet: "",
    receiverWallet: "",
    name: "",
    email: "",
    contact: "",
    projectTitle: "",
    projectDescription: "",
    amount: "",
    attachments: [],
    chain: "ethereum",
  });

  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoleConfirm = () => {
    setRoleModalOpen(false);
    // Auto-fill wallet based on role
    if (role === "Payer") {
      setFormData((prev) => ({
        ...prev,
        payerWallet: walletAddress,
      }));
    } else if (role === "Receiver") {
      setFormData((prev) => ({
        ...prev,
        receiverWallet: walletAddress,
      }));
    }
  };

  const validateForm = () => {
    const required = ["projectTitle", "projectDescription", "amount"];
    const missing = required.filter((field) => !formData[field]);

    if (missing.length > 0) {
      setNotification({
        open: true,
        message: `Please fill in: ${missing.join(", ")}`,
        severity: "error",
      });
      return false;
    }

    if (!date) {
      setNotification({
        open: true,
        message: "Please select a deadline",
        severity: "error",
      });
      return false;
    }

    return true;
  };

  const handleGenerateLink = async () => {
    console.log("Hello World!!!")
    if (!validateForm()) return;

    setLoading(true);

    try {
      const agreementData = {
        role,
        creatorWallet: walletAddress,
        payerDetails:
          role === "Payer"
            ? {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                isOnline: false,
              }
            : {},
        receiverDetails:
          role === "Receiver"
            ? {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
              }
            : {},
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        deadline: date,
        amountDetails: {
          amount: formData.amount,
          chain: formData.chain || "ethereum",
        },
        attachments: formData.attachments,
      };

      console.log(agreementData);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agreement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agreementData),
      });

      const result = await response.json();

      if (result.success) {
        const agreementIdFromServer = result.agreement.agreementId;
        setGeneratedLink(result.shareableLink);
        setAgreementId(agreementIdFromServer);
        console.log("Agreement ID:", agreementIdFromServer);
        setNotification({
          open: true,
          message: "Agreement created successfully!",
          severity: "success",
        });
      } else {
        throw new Error(result.message || "Failed to create agreement");
      }
    } catch (error) {
      console.error("Error creating agreement:", error);
      setNotification({
        open: true,
        message: error.message || "Failed to create agreement",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setNotification({
      open: true,
      message: "Link copied to clipboard!",
      severity: "success",
    });
  };

  const handleCancelAgreement = () => {
    // Reset form
    setFormData({
      payerWallet: "",
      receiverWallet: "",
      name: "",
      email: "",
      contact: "",
      projectTitle: "",
      projectDescription: "",
      amount: "",
      attachments: "",
      chain: ""
    });
    setDate(null);
    setGeneratedLink("");
    setUploadedFiles([]);
    setUploadProgress([]);
    setNotification({
      open: true,
      message: "Form reset successfully",
      severity: "info",
    });
  };

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

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(isValidFile);
    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      // Initialize progress for new files
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
    console.log("Hello World");
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
      formDataUpload.append("files", file); // all files under same key "file"
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/file`, {
        method: "POST",
        body: formDataUpload,
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data?.imgUrls) {
        throw new Error(result.message || "Upload failed");
      }

      // ✅ Append all URLs to attachments
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...result.data.imgUrls],
      }));

      setUploadProgress((prev) => prev.map(() => 100));
      setNotification({
        open: true,
        message: `Uploaded ${result.data.imgUrls.length} file(s) successfully`,
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
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    const iconMap = {
      // Documents
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      txt: "📄",
      rtf: "📄",

      // Spreadsheets
      xls: "📊",
      xlsx: "📊",
      csv: "📊",

      // Presentations
      ppt: "📽️",
      pptx: "📽️",

      // Images
      jpg: "🖼️",
      jpeg: "🖼️",
      png: "🖼️",
      gif: "🖼️",
      svg: "🖼️",
      bmp: "🖼️",
      webp: "🖼️",

      // Videos
      mp4: "🎥",
      avi: "🎥",
      mov: "🎥",
      wmv: "🎥",
      flv: "🎥",
      webm: "🎥",

      // Audio
      mp3: "🎵",
      wav: "🎵",
      flac: "🎵",
      aac: "🎵",

      // Archives
      zip: "🗜️",
      rar: "🗜️",
      "7z": "🗜️",
      tar: "🗜️",
      gz: "🗜️",

      // Code
      js: "💻",
      html: "💻",
      css: "💻",
      php: "💻",
      py: "💻",
      java: "💻",
      cpp: "💻",
      c: "💻",
      json: "💻",
      xml: "💻",
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
            height: 15
          }}
          onClick={(e) => {
            e.stopPropagation();
            removeFile(index);
          }}
        >
          <CloseIcon sx={{ width: 12 }} />
        </IconButton>

        {/* Progress overlay */}
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

  const chainOptions = [
    { label: "USDT ERC20", value: "ethereum", icon: ethereumIcon },
    { label: "USDT BEP20", value: "bsc", icon: binanceIcon },
    { label: "USDT EIP20", value: "polygon", icon: polygonIcon },
  ];

  return (
    <div className="wrapper">
      <main className="main">
        <RoleSelectionModal
          open={roleModalOpen}
          setOpen={setRoleModalOpen}
          role={role}
          setRole={setRole}
          walletAddress={walletAddress}
          setWalletAddress={() => {}}
          onConfirm={handleRoleConfirm}
        />
        <Aside />
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Box sx={{ width: "100%", height: "100%", bgcolor: "#0E1218" }}>
            <Box sx={{ padding: "20px" }}>
              <h1 className="tabs-title">Create Agreement</h1>
              <br />
              <br />
              <Grid
                container
                rowSpacing={3}
                columnSpacing={2}
                sx={{ backgroundColor: "transparent", color: "#FFFFFF" }}
              >
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="payer-w-address"
                    label="Payer Wallet Address"
                    variant="outlined"
                    required
                    fullWidth
                    value={formData.payerWallet || ""}
                    onChange={(e) =>
                      handleInputChange("payerWallet", e.target.value)
                    }
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="receiver-w-address"
                    label="Receiver Wallet Address"
                    variant="outlined"
                    required
                    fullWidth
                    value={formData.receiverWallet || ""}
                    onChange={(e) =>
                      handleInputChange("receiverWallet", e.target.value)
                    }
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="a-name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    fullWidth
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your Full Name (Optional)"
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="a-email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your Email (Optional)"
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="a-contact"
                    label="Contact No."
                    variant="outlined"
                    fullWidth
                    value={formData.contact}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                    placeholder="Enter your Contact No. (Optional)"
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <NumericFormat
                      customInput={TextField}
                      label="Amount (USDT)"
                      value={formData.amount}
                      onValueChange={(values) => {
                        handleInputChange("amount", values.value);
                      }}
                      thousandSeparator
                      decimalScale={2}
                      allowNegative={false}
                      allowLeadingZeros={false}
                      placeholder="Enter amount"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              minWidth: 165,
                              borderRight: "1px solid #555",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: "transparent",
                                border:
                                  formData.chain === "ethereum"
                                    ? "1px solid #1976d2"
                                    : formData.chain === "bsc"
                                    ? "1px solid #f0b90b"
                                    : formData.chain === "polygon"
                                    ? "1px solid #8247e5"
                                    : "1px solid #2a2a2a",
                                borderRadius: "5px",
                                padding: "2px 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                minWidth: 140,
                              }}
                            >
                              <Select
                                value={formData.chain || "ethereum"}
                                onChange={(e) =>
                                  handleInputChange(
                                    "chain",
                                    e.target.value
                                  )
                                }
                                displayEmpty
                                variant="standard"
                                disableUnderline
                                sx={{
                                  "& .MuiSelect-select": {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    paddingLeft: 0,
                                    paddingRight: "20px !important",
                                    fontSize: "0.9rem",
                                    minWidth: 120,
                                    color: "#fff",
                                    fontWeight: 500,
                                  },
                                  "& .MuiSelect-icon": {
                                    color: "#fff",
                                    right: 0,
                                  },
                                }}
                              >
                                <MenuItem value="" disabled>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      color: "#888",
                                    }}
                                  >
                                    <Box sx={{ width: 20, height: 20 }} />
                                    <em>Select Chain</em>
                                  </Box>
                                </MenuItem>
                                {chainOptions.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    sx={{
                                      backgroundColor: "transparent",
                                      border:
                                        option.value === "ethereum"
                                          ? "1px solid #1976d2"
                                          : option.value === "bsc"
                                          ? "1px solid #f0b90b"
                                          : option.value === "polygon"
                                          ? "1px solid #8247e5"
                                          : "1px solid #fff",
                                      borderRadius: "5px",
                                      margin: "4px 8px",
                                      padding: "8px 16px",
                                      minHeight: "auto",
                                      color: "#fff",
                                      "&:hover": {
                                        backgroundColor:
                                          option.value === "ethereum"
                                            ? "rgba(25, 118, 210, 0.1)"
                                            : option.value === "bsc"
                                            ? "rgba(240, 185, 11, 0.1)"
                                            : option.value === "polygon"
                                            ? "rgba(130, 71, 229, 0.1)"
                                            : "rgba(255, 255, 255, 0.1)",
                                      },
                                      "&.Mui-selected": {
                                        backgroundColor:
                                          option.value === "ethereum"
                                            ? "rgba(25, 118, 210, 0.2)"
                                            : option.value === "bsc"
                                            ? "rgba(240, 185, 11, 0.2)"
                                            : option.value === "polygon"
                                            ? "rgba(130, 71, 229, 0.2)"
                                            : "rgba(255, 255, 255, 0.2)",
                                        "&:hover": {
                                          backgroundColor:
                                            option.value === "ethereum"
                                              ? "rgba(25, 118, 210, 0.3)"
                                              : option.value === "bsc"
                                              ? "rgba(240, 185, 11, 0.3)"
                                              : option.value === "polygon"
                                              ? "rgba(130, 71, 229, 0.3)"
                                              : "rgba(255, 255, 255, 0.3)",
                                        },
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <img
                                        src={option.icon}
                                        alt={option.label}
                                        width={20}
                                        height={20}
                                        style={{ flexShrink: 0 }}
                                      />
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontSize: "0.9rem",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {option.label}
                                      </Typography>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  size={{ xs: 12, md: 12 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="project-title"
                    label="Project Title"
                    variant="outlined"
                    required
                    fullWidth
                    value={formData.projectTitle}
                    onChange={(e) =>
                      handleInputChange("projectTitle", e.target.value)
                    }
                    placeholder="Enter your Project Title"
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 12 }}
                  sx={{ textAlign: "center" }}
                >
                  <TextField
                    id="project-desc"
                    label="Project Description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    required
                    fullWidth
                    value={formData.projectDescription}
                    onChange={(e) =>
                      handleInputChange("projectDescription", e.target.value)
                    }
                    placeholder="Enter Description of your Project"
                  />
                </Grid>
                <Grid
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{ textAlign: "center" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Deadline"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Enhanced File Upload Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Grid container>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="h6" sx={{ color: "#fff" }}>
                        Submit Proof
                      </Typography>

                      {/* Drag and Drop Zone */}
                      <Box
                        sx={{
                          p: 3,
                          border: "1px solid #555",
                          borderRadius: 2,
                          textAlign: "center",
                          color: "#aaa",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#222",
                            borderColor: "#777",
                          },
                        }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <CloudUploadIcon
                          sx={{ fontSize: 48, mb: 1, color: "#666" }}
                        />
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
                        />
                      </Box>
                    </Grid>

                    {/* File Previews */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                      {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 3, ml: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ mb: 2, color: "#fff" }}
                          >
                            Selected Files ({uploadedFiles.length})
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 2,
                              mb: 2,
                              width: "150px"
                            }}
                          >
                            {uploadedFiles.map((file, index) =>
                              renderFilePreview(file, index)
                            )}
                          </Box>

                          {/* Upload Button */}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUploadFiles}
                            disabled={isUploading || uploadedFiles.length === 0}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                              mt: 1,
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
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  size={{ xs: 12, md: 12 }}
                  sx={{ textAlign: "center" }}
                >
                  <Grid container columnSpacing={2} rowSpacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Button
                        variant="contained"
                        endIcon={<LinkIcon />}
                        size="large"
                        sx={{ width: "100%" }}
                        onClick={handleGenerateLink}
                        disabled={loading || isUploading}
                      >
                        {loading ? "Generating..." : "Generate Link"}
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Button
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                        size="large"
                        sx={{ width: "100%" }}
                        onClick={handleCancelAgreement}
                      >
                        Reset Form
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Generated Link Section */}
                {generatedLink && (
                  <Grid
                    container
                    size={{ xs: 12, md: 12 }}
                    columnSpacing={2}
                    rowSpacing={2}
                    sx={{ textAlign: "center" }}
                  >
                    <Grid item size={{ xs: 12, md: 8 }}>
                      <TextField
                        fullWidth
                        value={generatedLink}
                        disabled
                        sx={{ mb: 1 }}
                        label="Shareable Agreement Link"
                      />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 4 }}>
                      <Button
                        fullWidth
                        size="large"
                        sx={{ padding: "13px 0px" }}
                        variant="outlined"
                        onClick={handleCopyLink}
                      >
                        Copy Link
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>

        {/* File Preview Modal */}
        <Dialog
          open={Boolean(previewFile)}
          onClose={() => setPreviewFile(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: "#1a1a1a",
              color: "#fff",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{previewFile?.name}</Typography>
            <IconButton
              onClick={() => setPreviewFile(null)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
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
          </DialogContent>
        </Dialog>

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() =>
              setNotification((prev) => ({ ...prev, open: false }))
            }
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

import { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Aside from "./Aside";
import "../styles/style.min.css";
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

export default function EditAgreementPage() {
  const { walletAddress } = useContext(WalletContext);
  const { agreementId } = useParams();
  const fileInputRef = useRef(null);

  // Form states
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAgreement, setLoadingAgreement] = useState(true);
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

  // Fetch agreement data on component mount
  useEffect(() => {
    const fetchAgreementData = async () => {
      try {
        setLoadingAgreement(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/agreement/${agreementId}`
        );
        const result = await response.json();

        if (result.success && result.agreement) {
          const agreement = result.agreement;
          
          // Determine user role and details
          const isPayerOnline = agreement.payerWallet === walletAddress;
          const userDetails = isPayerOnline 
            ? agreement.payerDetails 
            : agreement.receiverDetails;

          // Set form data WITHOUT the role field
          setFormData({
            payerWallet: agreement.payerWallet || "",
            receiverWallet: agreement.receiverWallet || "",
            name: userDetails?.name || "",
            email: userDetails?.email || "",
            contact: userDetails?.contact || "",
            projectTitle: agreement.projectTitle || "",
            projectDescription: agreement.projectDescription || "",
            amount: agreement.amountDetails?.amount || "",
            attachments: agreement.attachments || [],
            chain: agreement.amountDetails?.chain || "ethereum",
          });

          // Set deadline date
          if (agreement.deadline) {
            setDate(new Date(agreement.deadline));
          }
        } else {
          throw new Error(result.message || "Failed to fetch agreement");
        }
      } catch (error) {
        console.error("Error fetching agreement:", error);
        setNotification({
          open: true,
          message: error.message || "Failed to fetch agreement",
          severity: "error",
        });
      } finally {
        setLoadingAgreement(false);
      }
    };

    if (agreementId) {
      fetchAgreementData();
    }
  }, [agreementId, walletAddress]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleUpdateAgreement = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Determine user role
      const isPayerOnline = formData.payerWallet === walletAddress;
      const role = isPayerOnline ? "Payer" : "Receiver";

      const updateData = {
        agreementId,
        role,
        payerDetails: isPayerOnline
          ? {
              name: formData.name,
              email: formData.email,
              contact: formData.contact,
              isOnline: false,
            }
          : {},
        receiverDetails: !isPayerOnline
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

      console.log("Update data (before sending):", updateData);
      console.log("Update data keys:", Object.keys(updateData));
      
      // Double check that role is not included
      if ('role' in updateData) {
        console.error("ERROR: role field found in updateData, removing it");
        delete updateData.role;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement/wallet/updateAgreement`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setNotification({
          open: true,
          message: "Agreement updated successfully!",
          severity: "success",
        });
      } else {
        throw new Error(result.message || "Failed to update agreement");
      }
    } catch (error) {
      console.error("Error updating agreement:", error);
      setNotification({
        open: true,
        message: error.message || "Failed to update agreement",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original state or navigate back
    setNotification({
      open: true,
      message: "Edit cancelled",
      severity: "info",
    });
    // You can add navigation logic here if needed
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
    // Handle both file names and URLs
    const name = typeof fileName === 'string' ? fileName.split('/').pop() || fileName : fileName;
    const extension = name.split(".").pop()?.toLowerCase();

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
            height: 15,
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

  // Show loading state while fetching agreement data
  if (loadingAgreement) {
    return (
      <div className="wrapper">
        <main className="main">
          <Aside />
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Box sx={{ width: "100%", height: "100%", bgcolor: "#0E1218" }}>
              <Box sx={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h4" sx={{ color: "#FFFFFF", mb: 2 }}>
                  Loading Agreement...
                </Typography>
                <LinearProgress />
              </Box>
            </Box>
          </ThemeProvider>
        </main>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <main className="main">
        <Aside />
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Box sx={{ width: "100%", height: "100%", bgcolor: "#0E1218" }}>
            <Box sx={{ padding: "20px" }}>
              <h1 className="tabs-title">Edit Agreement</h1>
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
                                  handleInputChange("chain", e.target.value)
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
                <Grid item size={{ xs: 12, md: 6 }}>
                  <Grid container>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="h6" sx={{ color: "#fff" }}>
                        File Attachments
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
                      {/* Existing Attachments */}
                      {formData.attachments.length > 0 && (
                        <Box sx={{ mt: 3, ml: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ mb: 2, color: "#fff" }}
                          >
                            Existing Attachments ({formData.attachments.length})
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 2,
                              mb: 2,
                              maxWidth: "300px"
                            }}
                          >
                            {formData.attachments.map((attachment, index) => (
                              <Box
                                key={`existing-${index}`}
                                sx={{
                                  position: "relative",
                                  width: 60,
                                  height: 60,
                                  border: "1px solid #4caf50",
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#1a1a1a",
                                }}
                                onClick={() => window.open(attachment, '_blank')}
                              >
                                <Box sx={{ textAlign: "center", p: 1 }}>
                                  <Typography variant="h4" sx={{ mb: 1 }}>
                                    {getFileIcon(attachment)}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ 
                                      fontSize: 8, 
                                      wordBreak: "break-all", 
                                      display: "block",
                                      color: "#4caf50"
                                    }}
                                  >
                                    {attachment.split('/').pop()?.substring(0, 8)}...
                                  </Typography>
                                </Box>

                                {/* Remove existing attachment button */}
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
                                    setFormData(prev => ({
                                      ...prev,
                                      attachments: prev.attachments.filter((_, i) => i !== index)
                                    }));
                                  }}
                                >
                                  <CloseIcon sx={{ width: 12 }} />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>

                          {/* Add New File Button */}
                          <Button
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                              mt: 1,
                              borderColor: "#4caf50",
                              color: "#4caf50",
                              "&:hover": {
                                borderColor: "#45a049",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                              },
                            }}
                          >
                            Add More Files
                          </Button>
                        </Box>
                      )}

                      {/* Show Add Files button even when no existing attachments */}
                      {formData.attachments.length === 0 && (
                        <Box sx={{ mt: 3, ml: 3 }}>
                          <Button
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                              borderColor: "#4caf50",
                              color: "#4caf50",
                              "&:hover": {
                                borderColor: "#45a049",
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                              },
                            }}
                          >
                            Add Files
                          </Button>
                        </Box>
                      )}

                      {/* New Files to Upload */}
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
                              maxWidth: "300px"
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
                        endIcon={<SendIcon />}
                        size="large"
                        sx={{ 
                          width: "100%",
                          backgroundColor: "#4caf50",
                          "&:hover": {
                            backgroundColor: "#45a049",
                          },
                        }}
                        onClick={handleUpdateAgreement}
                        disabled={loading || isUploading}
                      >
                        {loading ? "Updating..." : "Update Agreement"}
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Button
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                        size="large"
                        sx={{ width: "100%" }}
                        onClick={handleCancelEdit}
                      >
                        Cancel Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
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
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Button from "@mui/material/Button";
import {
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Dialog,
  DialogContent,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0E1218",
      paper: "#0E1218",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

export default function AgreementDetailView({ agreement, onClose }) {
  if (!agreement) return null;

  const timelineItems = [
    { status: "Agreement Sent", date: "24 Apr 2024", color: "primary" },
    { status: "Agreement Locked", date: "25 Apr 2024", color: "secondary" },
    { status: "Deposited", date: "26 Apr 2024", color: "success" },
    { status: "Dispute Raised", date: "27 Apr 2024", color: "error" },
    { status: "Completed", date: "28 Apr 2024", color: "success" },
  ];

  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(null);

  // Helper to check if file is an image
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(url);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100%", bgcolor: "#0E1218", color: "#FFFFFF" }}>
        <div
          className="tabs-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Agreement</h1>
          <IconButton
            aria-label="close"
            onClick={onClose}
            disableRipple
            disableFocusRipple
            sx={{
              color: "#FFFFFF",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:active": {
                backgroundColor: "transparent",
              },
              "&:focus": {
                backgroundColor: "transparent",
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <br />
        <br />
        <Grid container rowSpacing={3} columnSpacing={2}>
          {/* Left side - Agreement Details */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Payer Wallet Address"
                  value={agreement.payerWallet || "N/A"}
                  Input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Receiver Wallet Address"
                  value={agreement.receiverWallet || "N/A"}
                  Input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={agreement.payerDetails.name || "N/A"}
                  Input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  value={agreement.payerDetails.email || "N/A"}
                  Input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Contact No."
                  value={agreement.payerDetails.contact || "N/A"}
                  Input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Amount"
                  value={agreement.budget || 'N/A'}
                  input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid> */}
              <Grid item size={{ xs: 12, md: 12 }}>
                <TextField
                  fullWidth
                  label="Project Title"
                  value={agreement.projectTitle || "N/A"}
                  input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Project Description"
                  value={agreement.projectDescription || "N/A"}
                  input={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Attachments
                </Typography>
                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  {agreement.files && agreement.files.length > 0 ? (
                    <List>
                      {agreement.files.map((file, index) => {
                        const isImageFile = isImage(file.url);
                        return (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <Tooltip
                                title={
                                  isImageFile
                                    ? "Preview Image"
                                    : "Open Document"
                                }
                              >
                                <IconButton
                                  edge="end"
                                  onClick={() => {
                                    if (isImageFile) {
                                      setPreviewImage(file.url);
                                      setOpenImageModal(true);
                                    } else {
                                      window.open(file.url, "_blank");
                                    }
                                  }}
                                >
                                  {isImageFile ? (
                                    <ImageIcon />
                                  ) : (
                                    <InsertDriveFileIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <ListItemText
                              primary={`Attachment ${index + 1}`}
                              secondary={file.name}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <Typography>No files uploaded</Typography>
                  )}
                </Box>

                {/* Image Preview Dialog */}
                <Dialog
                  open={openImageModal}
                  onClose={() => setOpenImageModal(false)}
                  maxWidth="md"
                >
                  <IconButton
                    onClick={() => setOpenImageModal(false)}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: "#fff",
                      zIndex: 10,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent sx={{ backgroundColor: "#000" }}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </Grid>

              <Grid item size={{ xs: 4, md: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ width: "100%", background: "#fff" }}
                >
                  Lock
                </Button>
              </Grid>
              <Grid item size={{ xs: 4, md: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    width: "100%",
                    background: "transparent",
                    color: "#fff",
                    borderColor: "#fff",
                  }}
                >
                  Negotiate
                </Button>
              </Grid>
              <Grid item size={{ xs: 4, md: 4 }}>
                <Button
                  color="error"
                  variant="outlined"
                  size="large"
                  sx={{
                    width: "100%",
                    background: "transparent",
                    borderColor: "red",
                    color: "red",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side - Timeline */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ borderRadius: 2, height: "100%", width: "100%" }}>
              <Timeline position="right">
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                      {item.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={item.color} />
                      {index < timelineItems.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>{item.status}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Grid>

          {/* Close Button */}
          <Grid item xs={12} sx={{ mt: 2, textAlign: "center" }}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

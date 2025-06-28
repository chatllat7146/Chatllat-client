import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  return (
    <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
      <input
        type="file"
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => setUploadedFile(e.target.files[0])}
      />
      <Button
        variant="outlined"
        onClick={() => fileInputRef.current.click()}
        sx={{ mb: 1 }}
      >
        Select File
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!uploadedFile}
        onClick={async () => {
          const formData = new FormData();
          formData.append("file", uploadedFile);

          try {
            const res = await fetch("${import.meta.env.VITE_BACKEND_URL}/api/file", {
              method: "POST",
              body: formData,
            });

            const result = await res.json();

            if (result.success) {
              setNotification({
                open: true,
                message: "File uploaded successfully!",
                severity: "success",
              });
              console.log("Uploaded file URL:", result.data.imageUrl);
              // Optionally: Save this URL to agreement formData.attachments
              setFormData((prev) => ({
                ...prev,
                attachments: result.data.imageUrl,
              }));
            } else {
              throw new Error(result.message || "Upload failed");
            }
          } catch (err) {
            console.error("Upload error:", err);
            setNotification({
              open: true,
              message: err.message || "Upload failed",
              severity: "error",
            });
          }
        }}
      >
        Upload File
      </Button>
    </Grid>
  );
}

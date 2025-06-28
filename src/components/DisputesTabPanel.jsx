import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import DisputesTable from "./DisputesTable";
import DisputeDetailView from "./DisputeDetailView";
import DisputeResponseModal from "./DisputeResponseModal";


export default function DisputesTabPanel({ currentWalletAddress }) {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);

  // Fetch all disputes from agreements (not wallet-specific)
  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        setLoading(true);
        console.log('Fetching all disputes from agreements...');

        // Fetch all disputes globally, not filtered by wallet
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dispute/wallet/all/disputes?connectedWalletId=${currentWalletAddress}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('All disputes API response:', result);

        if (result.success && result.data && Array.isArray(result.data.disputes)) {
          // ✅ FIXED: Proper mapping to ensure all required fields are available
          const formattedDisputes = result.data.disputes.map((dispute, index) => {
            console.log('🔍 Raw dispute from API:', dispute);

            const formatted = {
              // Include all original data first
              ...dispute,

              // Then override with our required fields (this ensures our mapping takes priority)
              id: dispute.disputeId || dispute._id || `dispute-${index}`,
              disputeId: dispute.disputeId || 'N/A',
              agreementId: dispute.agreementId || 'N/A',
              status: dispute.status || 'N/A',
              disputeCategory: dispute.disputeCategory || 'N/A',
              disputeCreator: dispute.disputeCreator || 'N/A',
              createdAt: dispute.createdAt || 'N/A',
            };

            console.log('✅ Final formatted dispute:', formatted);
            console.log('🎯 Key fields check:', {
              status: formatted.status,
              createdAt: formatted.createdAt,
              disputeId: formatted.disputeId
            });

            return formatted;
          });

          console.log('✅ All formatted disputes for table:', formattedDisputes);
          setDisputes(formattedDisputes);
        } else {
          setError('Failed to fetch disputes');
        }
      } catch (err) {
        setError('Error fetching disputes: ' + err.message);
        console.error('Error fetching disputes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

  // Handlers
  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute);
    setDetailViewOpen(true);
  };

  const handleSubmitProof = (dispute) => {
    alert(`Submit Proof for Dispute ID: ${dispute.disputeId}`);
    // TODO: Implement actual proof submission logic
  };

  const handleRespondToDispute = async (dispute) => {
    const agreementId = dispute?.agreementId;

    if (!agreementId) {
      console.warn("Agreement ID not found in dispute:", dispute);
      return;
    }

    try {
      // Fetch full dispute details using API
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/dispute/details?agreementId=${agreementId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
      }

      const result = await response.json();

      if (result.success && result.data?.dispute) {
        const data = result.data.dispute;

        const formattedDispute = {
          disputeId: data.disputeId,
          agreementId: data.agreementId,
          projectTitle: data.projectTitle,
          disputeCategory: data.disputeCategory,
          raisedOn: data.createdAt,
          status: data.status === "DisputeRaised" ? "Awaiting Response" : data.status,
          payerReasons: data.reasons?.payerReason,
          receiverReason: data.reasons?.receiverReason,
          evidence: data.evidence,
          attachedEvidence: [
            ...(data.evidence?.payerEvidence || []),
            ...(data.evidence?.receiverEvidence || [])
          ],
          disputeCreator: data.disputeCreator
        };

        setSelectedDispute(formattedDispute);
        setResponseModalOpen(true);
      } else {
        throw new Error("No dispute data returned");
      }
    } catch (err) {
      console.error("❌ Error loading dispute details for response modal:", err);
      alert("Failed to load dispute details. Please try again.");
    }
  };


  const handleCloseDetailView = () => {
    setDetailViewOpen(false);
    setSelectedDispute(null);
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3 }}>
        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
          Loading disputes...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", p: 3 }}>
        <Typography variant="h6" sx={{ color: "#ff6b6b" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          color: "#FFFFFF",
          mb: 3,
          borderBottom: 1,
          borderColor: "divider",
          pb: 2,
        }}
      >
        Manage Disputes
      </Typography>

      {/* Disputes Table */}
      <DisputesTable
        disputes={disputes}
        onViewDetails={handleViewDetails}
        onSubmitProof={handleRespondToDispute}
        currentWalletAddress={currentWalletAddress}
      />

      {/* Dispute Detail View Modal */}
      {detailViewOpen && (
        <DisputeDetailView
          dispute={selectedDispute}
          onClose={handleCloseDetailView}
        />
      )}

      {responseModalOpen && (
        <DisputeResponseModal
          open={responseModalOpen}
          onClose={() => setResponseModalOpen(false)}
          disputeData={selectedDispute}
          onSubmitResponse={async (data) => {
            try {
              const payload = {
                agreementId: data.agreementId,
                connectedWallet: currentWalletAddress,
                reason: data.response,
                evidence: data.attachments,
              };

              const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/dispute/add/evidence`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                }
              );

              const result = await response.json();
              console.log("✅ Response submitted:", result);

              if (!result.success) throw new Error(result.message || "Unknown error");

              // refresh disputes list
              setResponseModalOpen(false);
              alert("Response submitted successfully");
            } catch (err) {
              console.error("❌ Error submitting response:", err);
              alert("Failed to submit dispute response.");
            }
          }}
        />
      )}
    </Box>
  );
}
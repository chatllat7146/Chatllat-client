import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Badge } from "@mui/material";
import AgreementsTable from "./AgreementsTable";
import DisputesTable from "./DisputesTable";
import DisputeResponseModal from "./DisputeResponseModal";

function IntegratedAgreementsDisputes({
  agreements = [],
  currentWalletAddress,
  onView,
  onStatusUpdate,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [disputedAgreements, setDisputedAgreements] = useState([]);
  const [disputeResponseModal, setDisputeResponseModal] = useState({
    open: false,
    disputeData: null,
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle disputed agreements data from AgreementsTable
  const handleDisputedAgreementsChange = (disputes) => {
    setDisputedAgreements(disputes);
  };

  // ✅ Handler for viewing dispute details (for non-creators)
  const handleViewDisputeDetails = (dispute) => {
    console.log('📋 View dispute details:', dispute);
    // You can implement a separate view modal here or reuse existing ones
    alert(`Viewing dispute details for: ${dispute.projectTitle}`);
  };

  // ✅ Handler for submitting evidence (for creators)
  const handleSubmitEvidence = (dispute) => {
    console.log('📁 Submit evidence for dispute:', dispute);
    // You can implement evidence submission modal here
    alert(`Submit evidence for dispute: ${dispute.projectTitle}`);
  };

  // ✅ Handler for responding to dispute (for non-creators)
  const handleRespondToDispute = async (dispute) => {
    console.log('💬 Respond to dispute:', dispute);

    try {
      // Fetch detailed dispute data from API
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/dispute/details?agreementId=${dispute.agreementId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.data.dispute) {
        const disputeDetails = data.data.dispute;

        // Map backend data to modal structure
        const disputeData = {
          disputeId: disputeDetails.disputeId,
          agreementId: disputeDetails.agreementId,
          projectTitle: disputeDetails.projectTitle || dispute.projectTitle,
          disputeCategory: disputeDetails.disputeCategory,
          raisedOn: disputeDetails.createdAt,
          status: disputeDetails.status === "DisputeRaised" ? "Waiting for Response" : disputeDetails.status,
          disputeCreator: disputeDetails.disputeCreator,
          reasons: disputeDetails.reasons,
          attachedEvidence: [
            ...(disputeDetails.evidence?.payerEvidence || []),
            ...(disputeDetails.evidence?.receiverEvidence || [])
          ],
          disputeRaisedBy: disputeDetails.disputeCreator === 'Payer'
            ? disputeDetails.payerWalletAddress
            : disputeDetails.receiverWalletAddress,
        };

        // Open modal with fetched data
        setDisputeResponseModal({
          open: true,
          disputeData,
        });

      } else {
        throw new Error(data.message || 'No dispute data found');
      }

    } catch (error) {
      console.error('❌ Error fetching dispute details:', error);
      alert(`Failed to load dispute details: ${error.message}`);
    }
  };

  // ✅ Handler for viewing dispute (for creators)
  const handleViewDispute = (dispute) => {
    console.log('👁️ View dispute:', dispute);
    // You can implement view dispute modal here
    alert(`Viewing dispute: ${dispute.projectTitle}`);
  };

  // Close dispute response modal
  const closeDisputeResponseModal = () => {
    setDisputeResponseModal({
      open: false,
      disputeData: null,
    });
  };

  // Handle dispute response submission
  const handleDisputeResponseSubmit = async (responseData) => {
    try {
      const agreementId = disputeResponseModal.disputeData?.agreementId;

      if (!agreementId) {
        throw new Error('Agreement ID not found');
      }

      console.log('Submitting response for agreementId:', agreementId);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dispute/add/evidence`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agreementId: agreementId,
          connectedWallet: currentWalletAddress,
          reason: responseData.response,
          evidence: responseData.attachments || []
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit response');
      }

      alert('Dispute response submitted successfully!');
      closeDisputeResponseModal();

      console.log("✅ Response submitted successfully:", result);

    } catch (error) {
      console.error("❌ Error submitting response:", error);
      alert(error.message || "Failed to submit response");
      throw error;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: "#9CA3AF",
              "&.Mui-selected": {
                color: "#FFD700",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#FFD700",
            },
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>Agreements</span>
                <Badge 
                  badgeContent={agreements.length} 
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FFD700",
                      color: "#000",
                    },
                  }}
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>Disputes</span>
                <Badge 
                  badgeContent={disputedAgreements.length} 
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#f44336",
                      color: "#fff",
                    },
                  }}
                />
              </Box>
            } 
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            All Agreements
          </Typography>
          <AgreementsTable
            agreements={agreements}
            onView={onView}
            currentWalletAddress={currentWalletAddress}
            onStatusUpdate={onStatusUpdate}
            onDisputedAgreementsChange={handleDisputedAgreementsChange}
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Active Disputes
          </Typography>
          {disputedAgreements.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" sx={{ color: "#9CA3AF" }}>
                No active disputes found.
              </Typography>
            </Box>
          ) : (
            <DisputesTable
              disputes={disputedAgreements}
              currentWalletAddress={currentWalletAddress}
              onViewDetails={handleViewDisputeDetails}
              onSubmitEvidence={handleSubmitEvidence}
              onRespondToDispute={handleRespondToDispute}
              onViewDispute={handleViewDispute}
            />
          )}
        </Box>
      )}

      {/* Dispute Response Modal */}
      <DisputeResponseModal
        open={disputeResponseModal.open}
        onClose={closeDisputeResponseModal}
        disputeData={disputeResponseModal.disputeData}
        onSubmitResponse={handleDisputeResponseSubmit}
      />
    </Box>
  );
}

export default IntegratedAgreementsDisputes;
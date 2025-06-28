import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import { formatDate } from "../lib/utils";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import ChatPopup from "./ChatPopup";
import DisputeFormModal from "./DisputeFormModal";
import DisputeResponseModal from "./DisputeResponseModal";
import DisputeCreatorView from "./DisputeCreatorView";

function AgreementsTable({
  agreements = [],
  onView,
  currentWalletAddress,
  onStatusUpdate,
}) {
  const navigate = useNavigate();

  // ✅ ALL STATE DECLARATIONS
  const [loadingStates, setLoadingStates] = useState({});
  const [depositModal, setDepositModal] = useState({
    open: false,
    agreement: null,
    loading: false,
    error: null,
  });

  const [withdrawModal, setWithdrawModal] = useState({
    open: false,
    agreement: null,
  });

  const [chatPopup, setChatPopup] = useState({
    open: false,
    otherUserWallet: null,
    otherUserAvatar: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [disputeModal, setDisputeModal] = useState({
    open: false,
    agreement: null,
  });

  const [disputeResponseModal, setDisputeResponseModal] = useState({
    open: false,
    disputeData: null,
  });

  // ✅ CRITICAL: disputeViewModal state declaration
  const [disputeViewModal, setDisputeViewModal] = useState({
    open: false,
    disputeData: null,
  });

  const [disputeDetailsLoading, setDisputeDetailsLoading] = useState(false);

  // Backend integration - Add disputes state
  const [disputes, setDisputes] = useState([]);

  // Backend integration - Add useEffect to fetch disputes
  useEffect(() => {
    if (currentWalletAddress) {
      fetchDisputes();
    }
  }, [currentWalletAddress]);

  // Backend integration - Add fetchDisputes function
  const fetchDisputes = async () => {
    try {
      console.log('Fetching disputes for wallet:', currentWalletAddress);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/dispute/wallet/all/disputes?connectedWalletId=${currentWalletAddress}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Disputes API response:', result);

      if (result.success && result.data && Array.isArray(result.data.disputes)) {
        const formattedDisputes = result.data.disputes.map((d, i) => ({
          id: d.disputeId || i + 1,
          status: d.status,
          reason: d.reasons?.payerReason || d.reasons?.receiverReason || "N/A",
          raisedOn: d.createdAt || new Date().toISOString(),
          ...d,
        }));
        setDisputes(formattedDisputes);
        console.log('Set disputes to state:', formattedDisputes);
      } else {
        console.warn('Dispute data not found or invalid format');
        setDisputes([]);
      }
    } catch (error) {
      console.error('Error fetching disputes:', error);
      setDisputes([]);
    }
  };


  // Backend integration - Updated helper function to determine who raised the dispute
  const getDisputeRaiser = (agreement) => {
    // First check if we have dispute data from backend with safety check
    if (disputes && disputes.length > 0) {
      const dispute = disputes.find(d => d.agreementId === agreement.agreementId);
      if (dispute) {
        // Use backend data to determine who raised the dispute
        if (dispute.disputeCreator === 'Payer') {
          return dispute.payerWalletAddress;
        } else if (dispute.disputeCreator === 'Receiver') {
          return dispute.receiverWalletAddress;
        }
      }
    }

    // Fallback to your existing logic
    return agreement.disputeRaisedBy || agreement.payerWallet;
  };

  // ✅ FIXED: Helper function to check if current user raised the dispute
  const didCurrentUserRaiseDispute = (agreement) => {
    if (!currentWalletAddress || !agreement) return false;

    const dispute = disputes.find(d => d.agreementId === agreement.agreementId);
    const current = currentWalletAddress.toLowerCase();

    if (dispute) {
      const creator = dispute.disputeCreator;
      const payer = dispute.payerWalletAddress?.toLowerCase();
      const receiver = dispute.receiverWalletAddress?.toLowerCase();

      if (creator === 'Payer' && current === payer) return true;
      if (creator === 'Receiver' && current === receiver) return true;

      return false;
    }

    // fallback
    const fallbackRaiser = agreement.disputeRaisedBy?.toLowerCase();
    return fallbackRaiser && current === fallbackRaiser;
  };


  console.log(didCurrentUserRaiseDispute, "==============Hello World================")

  // ✅ NEW: Helper function to check if a dispute already exists for an agreement
  const doesDisputeExistForAgreement = (agreement) => {
    return disputes && disputes.length > 0 &&
      disputes.some(d => d.agreementId === agreement.agreementId);
  };

  // ✅ NEW: Add evidence submission handler function
  const handleEvidenceSubmitted = async () => {
    try {
      console.log('🔄 Evidence submitted, refreshing disputes...');

      // Refresh disputes data
      await fetchDisputes();

      // Show success message
      setSnackbar({
        open: true,
        message: "Evidence submitted successfully!",
        severity: "success",
      });

      // Close the modal
      closeDisputeViewModal();

    } catch (error) {
      console.error('❌ Error handling evidence submission:', error);
      setSnackbar({
        open: true,
        message: "Evidence submitted but failed to refresh data.",
        severity: "warning",
      });
    }
  };

  // ✅ UPDATED: Fixed openDisputeViewModal function
  const openDisputeViewModal = (agreement) => {
    console.log('🚀 Opening dispute view modal for agreement:', agreement.agreementId);

    // Get dispute data from backend with safety check
    const dispute = disputes && disputes.length > 0
      ? disputes.find(d => d.agreementId === agreement.agreementId)
      : null;

    console.log('🔍 Found dispute data:', dispute);

    let disputeData;

    if (dispute) {
      // ✅ Use backend dispute data - preserve structure with ALL required fields
      disputeData = {
        disputeId: dispute.disputeId,
        agreementId: dispute.agreementId,
        projectTitle: dispute.projectTitle || agreement.projectTitle,
        disputeCategory: dispute.disputeCategory,
        raisedOn: dispute.createdAt,
        status: dispute.status,

        // ✅ ADD MISSING disputeCreator field - THIS WAS THE MAIN ISSUE
        disputeCreator: dispute.disputeCreator,

        disputeRaisedBy: dispute.disputeCreator === 'Payer' ? dispute.payerWalletAddress : dispute.receiverWalletAddress,
        responseSubmittedAt: dispute.updatedAt,

        // ✅ Preserve the full reasons object
        reasons: dispute.reasons,

        // ✅ Backwards compatibility fields for DisputeCreatorView
        disputeReason: dispute.reasons?.payerReason || dispute.reasons?.receiverReason,
        disputeResponse: dispute.reasons?.receiverReason || dispute.reasons?.payerReason,

        // ✅ Handle evidence structure properly
        evidence: dispute.evidence,

        // ✅ Add agreement status for modal logic
        agreementStatus: agreement.status,

        // ✅ Add wallet addresses for evidence submission
        payerWalletAddress: dispute.payerWalletAddress,
        receiverWalletAddress: dispute.receiverWalletAddress,

        // ✅ Add created and updated timestamps
        createdAt: dispute.createdAt,
        updatedAt: dispute.updatedAt,
      };

      console.log('✅ Opening DisputeCreatorView with complete disputeData:', disputeData);
    } else {
      console.log('⚠️ No dispute found in backend data, using fallback');

      // ✅ Fallback with proper structure including disputeCreator
      disputeData = {
        disputeId: agreement.disputeId || "#456723",
        agreementId: agreement.agreementId,
        projectTitle: agreement.projectTitle,
        disputeCategory: agreement.disputeCategory || "Work Quality",
        raisedOn: agreement.disputedAt || new Date().toISOString(),
        status: agreement.disputeStatus || "Waiting for Response",

        // ✅ ADD MISSING disputeCreator field for fallback
        disputeCreator: currentWalletAddress?.toLowerCase() === agreement.payerWallet?.toLowerCase() ? 'Payer' : 'Receiver',

        disputeRaisedBy: agreement.disputeRaisedBy,
        responseSubmittedAt: agreement.responseSubmittedAt,

        // ✅ Create fallback reasons structure
        reasons: {
          payerReason: agreement.disputeReason || "Loading dispute details...",
          receiverReason: agreement.disputeResponse || null,
          autoCreatedReason: null
        },

        // ✅ Backwards compatibility for DisputeCreatorView
        disputeReason: agreement.disputeReason || "Loading dispute details...",
        disputeResponse: agreement.disputeResponse || "",

        // ✅ Create fallback evidence structure
        evidence: {
          payerEvidence: agreement.disputeEvidence || [],
          receiverEvidence: agreement.disputeResponseAttachments || []
        },

        // ✅ Add agreement status for modal logic
        agreementStatus: agreement.status,

        // ✅ Add wallet addresses for evidence submission
        payerWalletAddress: agreement.payerWallet,
        receiverWalletAddress: agreement.receiverWallet,

        // ✅ Add fallback timestamps
        createdAt: agreement.disputedAt || new Date().toISOString(),
        updatedAt: agreement.responseSubmittedAt || new Date().toISOString(),
      };

      console.log('⚠️ Using fallback disputeData:', disputeData);
    }

    setDisputeViewModal({
      open: true,
      disputeData,
    });
  };

  // ✅ Add closeDisputeViewModal function
  const closeDisputeViewModal = () => {
    setDisputeViewModal({
      open: false,
      disputeData: null,
    });
  };

  // ✅ CORRECTED: openDisputeResponseModal function - Only allow OTHER party to respond
  const openDisputeResponseModal = async (agreement) => {
    console.log('🚀 Respond to Dispute clicked for agreement:', agreement.agreementId);

    // ✅ FIXED: Check if current user is NOT the one who raised the dispute
    if (!didCurrentUserRaiseDispute(agreement)) {
      console.log('✅ User can respond to dispute (they did not create it), fetching details...');

      // Show loading state
      setDisputeDetailsLoading(true);

      try {
        // ✅ Call the dispute details API
        console.log('🔍 Calling dispute details API...');
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/dispute/details?agreementId=${agreement.agreementId}`;
        console.log('📍 API URL:', apiUrl);

        const response = await fetch(apiUrl);
        console.log('📍 Response status:', response.status);
        console.log('📍 Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error:', errorText);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data1 = await response.json();
        const data = data1.data;
        console.log('✅ Dispute details API response:', data.dispute);
        console.log('************')

        if (data1.success && data.dispute) {
          console.log("asdasda*********************")

          // ✅ Map backend data to modal structure
          const disputeData = {
            disputeId: data.dispute.disputeId,
            agreementId: data.dispute.agreementId,
            projectTitle: data.dispute.projectTitle || agreement.projectTitle,
            disputeCategory: data.dispute.disputeCategory,
            raisedOn: data.dispute.createdAt,
            status: data.dispute.status === "DisputeRaised" ? "Waiting for Response" : data.dispute.status,
            disputeCreator: data.dispute.disputeCreator,

            // ✅ Map reasons properly
            reasons: data.dispute.reasons,

            // ✅ Map evidence properly  
            attachedEvidence: [
              ...(data.dispute.evidence?.payerEvidence || []),
              ...(data.dispute.evidence?.receiverEvidence || [])
            ],

            // ✅ Additional fields for modal
            disputeRaisedBy: data.dispute.disputeCreator === 'Payer'
              ? data.dispute.payerWalletAddress
              : data.dispute.receiverWalletAddress,
          };

          console.log('✅ Mapped disputeData for modal:', disputeData);

          // ✅ Open modal with fetched data
          setDisputeResponseModal({
            open: true,
            disputeData,
          });

        } else {
          console.error('❌ API returned no dispute data:', data);
          throw new Error(data.message || 'No dispute data found');
        }

      } catch (error) {
        console.error('❌ Error fetching dispute details:', error);

        // Show error to user
        setSnackbar({
          open: true,
          message: `Failed to load dispute details: ${error.message}`,
          severity: "error",
        });

        // ✅ Fallback: Create basic disputeData structure
        const fallbackDisputeData = {
          disputeId: "Loading...",
          agreementId: agreement.agreementId,
          projectTitle: agreement.projectTitle,
          disputeCategory: "Unknown",
          raisedOn: new Date().toISOString(),
          status: "Error Loading",
          reasons: {
            payerReason: "Error loading dispute details. Please try again.",
            receiverReason: null,
            autoCreatedReason: null
          },
          attachedEvidence: [],
          disputeRaisedBy: "Unknown",
        };

        console.log('⚠️ Using fallback disputeData:', fallbackDisputeData);

        // Still open modal with fallback data so user can retry
        setDisputeResponseModal({
          open: true,
          disputeData: fallbackDisputeData,
        });

      } finally {
        setDisputeDetailsLoading(false);
      }

    } else {
      console.log('❌ User created this dispute, cannot respond to own dispute');
      setSnackbar({
        open: true,
        message: "You cannot respond to your own dispute.",
        severity: "info",
      });
    }
  };

  // Helper function to close modal
  const closeDisputeResponseModal = () => {
    setDisputeResponseModal({
      open: false,
      disputeData: null,
    });
  };

  // Backend integration - Updated dispute response submission
  const handleDisputeResponseSubmit = async (responseData) => {
    try {
      // Get agreementId directly from modal data
      const agreementId = disputeResponseModal.disputeData?.agreementId;

      if (!agreementId) {
        throw new Error('Agreement ID not found');
      }

      console.log('Submitting response for agreementId:', agreementId);

      // Call your backend API directly with agreementId
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

      // Success handling...
      setSnackbar({
        open: true,
        message: 'Dispute response submitted successfully!',
        severity: 'success',
      });

      // Refresh data
      await fetchDisputes();
      closeDisputeResponseModal();

      console.log("✅ Response submitted successfully:", result);

    } catch (error) {
      console.error("❌ Error submitting response:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to submit response",
        severity: 'error',
      });
      throw error;
    }
  };

  const openDisputeModal = (agreement) => {
    setDisputeModal({
      open: true,
      agreement,
    });
  };

  const closeDisputeModal = () => {
    setDisputeModal({
      open: false,
      agreement: null,
    });
  };

  // ✅ FIXED: Helper function to determine the other user's wallet address (case-insensitive)
  const getOtherUserWallet = (agreement) => {
    const { payerWallet, receiverWallet } = agreement;
    if (!currentWalletAddress) return null;

    const currentWalletLower = currentWalletAddress.toLowerCase();

    if (payerWallet && payerWallet.toLowerCase() === currentWalletLower) {
      return receiverWallet;
    } else if (receiverWallet && receiverWallet.toLowerCase() === currentWalletLower) {
      return payerWallet;
    }

    return null;
  };

  // Helper function to open chat popup
  const openChatPopup = (agreement) => {
    const otherUserWallet = getOtherUserWallet(agreement);
    if (otherUserWallet) {
      setChatPopup({
        open: true,
        otherUserWallet,
        otherUserAvatar: null, // You can add avatar logic here if you have user avatars
      });
    }
  };

  // Helper function to close chat popup
  const closeChatPopup = () => {
    setChatPopup({
      open: false,
      otherUserWallet: null,
      otherUserAvatar: null,
    });
  };

  // Helper function to check if chat should be available
  const shouldShowChatButton = (status) => {
    const chatEnabledStatuses = [
      "Accepted",
      "Negotiated",
      "EscrowFunded",
      "WorkSubmitted",
      "FundsReleased",
      "Completed",
      "AgreementUpdated",
      "RequestedDeposit",
      "Disputed",
      "InProcess" // Add InProcess to chat enabled statuses
    ];
    return chatEnabledStatuses.includes(status);
  };

  // Helper function to open deposit modal
  const openDepositModal = (agreement) => {
    setDepositModal({
      open: true,
      agreement,
      loading: false,
      error: null,
    });
  };

  // Helper function to close deposit modal
  const closeDepositModal = () => {
    setDepositModal({
      open: false,
      agreement: null,
      loading: false,
      error: null,
    });
  };

  // Helper functions for withdraw modal
  const openWithdrawModal = (agreement) => {
    setWithdrawModal({
      open: true,
      agreement,
    });
  };

  const closeWithdrawModal = () => {
    setWithdrawModal({
      open: false,
      agreement: null,
    });
  };

  // Handle withdraw success callback
  const handleWithdrawSuccess = async (withdrawalData) => {
    try {
      const { txHash, amount, agreementId, receipt } = withdrawalData;

      // Show success message
      setSnackbar({
        open: true,
        message: `Successfully withdrew ${amount} USDT! Transaction: ${txHash.slice(0, 10)}...`,
        severity: "success",
      });

      // Update agreement status if needed (optional - depends on your backend logic)
      if (onStatusUpdate) {
        // You might want to fetch the updated agreement from backend
        // or update the status locally to "Completed"
        const updatedAgreement = {
          ...withdrawModal.agreement,
          status: "Completed", // or whatever status indicates withdrawal is complete
        };
        onStatusUpdate(updatedAgreement);
      }

      console.log("✅ Withdrawal completed successfully:", {
        agreementId,
        amount,
        txHash,
        blockNumber: receipt?.blockNumber,
      });

    } catch (error) {
      console.error("Error in withdrawal success handler:", error);
      setSnackbar({
        open: true,
        message: `Withdrawal successful but error updating status: ${error.message}`,
        severity: "warning",
      });
    }
  };

  // Add this function to handle edit agreement navigation
  const handleEditAgreement = (agreementId) => {
    navigate(`/edit-agreement/${agreementId}`);
  };

  const handleTransferFunds = async (transferData) => {
    const { agreement, chainId, amount, txHash, receipt, selectedChain } =
      transferData;

    try {
      // Get network name for success message
      const chainMap = {
        1: "Ethereum",
        56: "BSC",
        137: "Polygon",
      };

      const networkName =
        chainMap[chainId] || selectedChain?.name || "Unknown Network";

      console.log("Transfer completed successfully:", {
        agreementId: agreement.agreementId,
        amount,
        networkName,
        txHash,
      });

      // Show success message - webhook will handle status update
      setSnackbar({
        open: true,
        message: `Funds successfully deposited via ${networkName}! Transaction: ${txHash.slice(
          0,
          10
        )}... (Webhook will update status automatically)`,
        severity: "success",
      });

      // Close modal
      closeDepositModal();

      // Refresh balances after successful transfer
      if (typeof fetchStoredUSDTBalances === 'function') {
        await fetchStoredUSDTBalances();
      }

      console.log(`✅ Transfer completed: ${amount} USDT via ${networkName}`, {
        txHash,
        receipt,
        note: "Webhook will automatically update agreement status to EscrowFunded",
      });
    } catch (error) {
      console.error("❌ Error in handleTransferFunds:", error);

      setSnackbar({
        open: true,
        message: `Transaction successful but error processing: ${error.message}`,
        severity: "warning",
      });
    }
  };

  // Helper function to handle deposit funds (opens modal)
  const handleDepositFunds = async (agreement) => {
    openDepositModal(agreement);
  };

  // New function to handle work submission
  const handleWorkSubmitted = async (agreementId) => {
    setLoadingStates((prev) => ({ ...prev, [agreementId]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement/work/submitted`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agreementId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit work");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Work submission failed");
      }

      setSnackbar({
        open: true,
        message: result.message || "Work successfully submitted!",
        severity: "success",
      });

      // Update the parent component with the new agreement data
      if (onStatusUpdate) {
        onStatusUpdate(result.updatedAgreement);
      }
    } catch (error) {
      console.error("Error submitting work:", error);
      setSnackbar({
        open: true,
        message: error.message || "Error submitting work",
        severity: "error",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [agreementId]: false }));
    }
  };

  // Enhanced handleFundsReleased function
  const handleFundsReleased = async (agreementId) => {
    // Prevent double-clicks and concurrent executions
    if (loadingStates[agreementId]) {
      console.log("⚠️ Release already in progress for agreement:", agreementId);
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [agreementId]: true }));

    try {
      // Find the agreement to get required data
      const agreement = agreements.find(ag => ag.agreementId === agreementId);
      if (!agreement) {
        throw new Error("Agreement not found");
      }

      // Extract required data
      const {
        receiverWallet,
        amountDetails: { amount, chain },
        projectTitle
      } = agreement;

      if (!receiverWallet || !amount || !chain) {
        throw new Error("Missing required agreement data (wallet, amount, or chain)");
      }

      console.log(`🚀 Releasing ${amount} USDT to ${receiverWallet} on ${chain}`);

      // Show immediate feedback
      setSnackbar({
        open: true,
        message: `Processing fund release for ${projectTitle}...`,
        severity: "info",
      });

      // Call backend API
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement/fund/released`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agreementId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Release funds operation failed");
      }

      // Success! Show detailed success message with transaction info
      const { transactionHashes } = result;
      let successMessage = `✅ Funds released successfully to ${receiverWallet}!`;

      if (transactionHashes?.recordWithdrawal) {
        successMessage += ` Tx: ${transactionHashes.recordWithdrawal.slice(0, 10)}...`;
      }

      setSnackbar({
        open: true,
        message: successMessage,
        severity: "success",
      });

      // Log detailed success info for debugging
      console.log("✅ Fund release completed:", {
        agreementId,
        amount,
        chain,
        freelancer: receiverWallet,
        transactions: transactionHashes,
      });

      // Update agreement status if callback provided
      if (onStatusUpdate) {
        // Create updated agreement object
        const updatedAgreement = {
          ...agreement,
          status: "FundsReleased",
          withdrawableAmount: amount, // Set withdrawable amount
          releasedAt: new Date().toISOString(),
          transactionHashes,
        };
        onStatusUpdate(updatedAgreement);
      }

    } catch (error) {
      console.error("❌ Error releasing funds:", error);

      // Enhanced error handling with specific messages
      let errorMessage = "Failed to release funds. Please try again.";

      if (error.message.includes("network") || error.message.includes("connection")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message.includes("Insufficient")) {
        errorMessage = "Insufficient funds in admin wallet. Please contact support.";
      } else if (error.message.includes("Contract")) {
        errorMessage = "Smart contract error. Please contact support.";
      } else if (error.message.includes("Agreement not found")) {
        errorMessage = "Agreement data not found. Please refresh the page.";
      } else if (error.message.includes("Missing required")) {
        errorMessage = "Invalid agreement data. Please contact support.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });

      // Log error details for debugging
      console.error("Fund release error details:", {
        agreementId,
        errorType: error.constructor.name,
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
      });

    } finally {
      // Always clear loading state
      setLoadingStates((prev) => ({ ...prev, [agreementId]: false }));
    }
  };

  const columns = [
    { field: "payerWallet", headerName: "Payer Wallet Address", width: 220 },
    {
      field: "receiverWallet",
      headerName: "Receiver Wallet Address",
      width: 220,
    },
    { field: "projectTitle", headerName: "Project Title", width: 280 },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 160,
      renderCell: (params) => formatDate(params.value),
    },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const {
          status,
          payerWallet,
          receiverWallet,
          projectTitle,
          agreementId,
          role,
        } = params.row;

        // ✅ FIXED: Case-insensitive wallet comparisons
        const isPayer =
          currentWalletAddress &&
          payerWallet &&
          currentWalletAddress.toLowerCase() === payerWallet.toLowerCase();
        const isReceiver =
          currentWalletAddress &&
          receiverWallet &&
          currentWalletAddress.toLowerCase() === receiverWallet.toLowerCase();
        
         const isCurrentUserInvolved = isPayer || isReceiver;
        const isLoading = loadingStates[agreementId] || false;
        const showChatButton = shouldShowChatButton(status) && isCurrentUserInvolved;

        const renderButtons = () => {
          // Always show view button as a fallback
          const viewButton = (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onView(params.row)}
              disabled={isLoading}
            >
              View
            </Button>
          );

          // Chat button - only show if conditions are met
          const chatButton = showChatButton ? (
            <Button
              variant="outlined"
              size="small"
              startIcon={<ChatIcon />}
              onClick={() => openChatPopup(params.row)}
              disabled={isLoading}
              sx={{
                color: '#8B5CF6',
                borderColor: '#8B5CF6',
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderColor: '#7C3AED',
                },
              }}
            >
              Chat
            </Button>
          ) : null;

          // If user is not involved, only show view
          if (!isCurrentUserInvolved) {
            return (
              <Box sx={{ display: "flex", gap: 1 }}>
                {viewButton}
              </Box>
            );
          }

          // Handle different statuses
          let actionButton = null;

          switch (status) {
            case "Created":
            case "Rejected":
              actionButton = (
                <Button variant="outlined" color="error" size="small" disabled>
                  Cancelled
                </Button>
              );
              break;

            case "Accepted":
              // ✅ UPDATED: Enhanced logic for both parties to raise disputes
              const disputeExists = doesDisputeExistForAgreement(params.row);

              if (isPayer) {
                // Payer gets deposit button + conditional dispute button
                const buttons = [
                  <Button
                    key="deposit"
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleDepositFunds(params.row)}
                    disabled={isLoading}
                    startIcon={
                      isLoading ? <CircularProgress size={16} /> : null
                    }
                  >
                    {isLoading ? "Processing..." : "Deposit USDT"}
                  </Button>
                ];

                // Only show dispute button if no dispute exists yet
                if (!disputeExists) {
                  buttons.push(
                    <Button
                      key="dispute"
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={() => openDisputeModal(params.row)}
                      disabled={isLoading}
                      sx={{
                        color: '#f44336',
                        borderColor: '#f44336',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          borderColor: '#d32f2f',
                        },
                      }}
                    >
                      Raise Dispute
                    </Button>
                  );
                }

                actionButton = (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {buttons}
                  </Box>
                );
              } else if (isReceiver) {
                // Receiver gets dispute button only if no dispute exists
                if (!disputeExists) {
                  actionButton = (
                    <Button
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={() => openDisputeModal(params.row)}
                      disabled={isLoading}
                      sx={{
                        color: '#f44336',
                        borderColor: '#f44336',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          borderColor: '#d32f2f',
                        },
                      }}
                    >
                      Raise Dispute
                    </Button>
                  );
                } else {
                  // If dispute exists, show a disabled status indicator
                  actionButton = (
                    <Button
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{
                        color: '#9CA3AF',
                        borderColor: '#6B7280',
                      }}
                    >
                      Dispute Exists
                    </Button>
                  );
                }
              }
              break;

            case "FundsReleased":
              // Only receiver can withdraw funds
              if (isReceiver) {
                actionButton = (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => openWithdrawModal(params.row)}
                    disabled={isLoading}
                  >
                    Withdraw USDT
                  </Button>
                );
              }
              break;

            case "EscrowFunded":
              if (isReceiver) {
                actionButton = (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleWorkSubmitted(agreementId)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Mark as Completed"}
                  </Button>
                );
              }
              break;

            case "WorkSubmitted":
              if (isPayer) {
                actionButton = (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleFundsReleased(agreementId)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Releasing..." : "Release Funds"}
                  </Button>
                );
              }
              break;


            case "Completed":
              // Status is now final - no action buttons needed
              break;

            case "AgreementUpdated":
              // Show View button to the party who didn't send the update
              const isUpdateSender =
                (role === "Payer" && isPayer) ||
                (role === "Receiver" && isReceiver);
              if (!isUpdateSender) {
                actionButton = (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => onView(params.row)}
                    disabled={isLoading}
                  >
                    View Updated Agreement
                  </Button>
                );
              }
              break;

            case "RequestedDeposit":
              // Show loading state while deposit is being processed
              if (isPayer) {
                actionButton = (
                  <Button variant="outlined" color="info" size="small" disabled>
                    Processing Deposit...
                  </Button>
                );
              }
              break;

            // Add new InProcess case for dispute viewing
            case "InProcess":
              // Show "View Dispute" button for both parties
              actionButton = (
                <Button
                  variant="outlined"
                  color="info"
                  size="small"
                  onClick={() => openDisputeViewModal(params.row)}
                  disabled={isLoading}
                  sx={{
                    color: '#2196f3',
                    borderColor: '#2196f3',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  View Dispute
                </Button>
              );
              break;

            // ✅ FIXED: Updated "Disputed" case - Only NON-CREATOR can respond

            // case "Disputed":
            //   const disputeDataForRow = disputes.find(d => d.agreementId === String(params.row.agreementId));

            //   const creator = disputeDataForRow?.disputeCreator;
            //   const current = currentWalletAddress?.toLowerCase();
            //   const payer = params.row.payerWallet?.toLowerCase();
            //   const receiver = params.row.receiverWallet?.toLowerCase();

            //   const isCreator =
            //     (creator === 'Payer' && current === payer) ||
            //     (creator === 'Receiver' && current === receiver);

            //   console.log('🔍 Dispute Button Debug:', {
            //     agreementId: params.row.agreementId,
            //     disputeCreator: creator,
            //     currentWallet: currentWalletAddress,
            //     isCreator,
            //     payer,
            //     receiver,
            //   });

            //   if (!isCreator && (current === payer || current === receiver)) {
            //     actionButton = (
            //       <Button
            //         variant="outlined"
            //         color="warning"
            //         size="small"
            //         onClick={() => openDisputeResponseModal(params.row)}
            //         disabled={isLoading}
            //         startIcon={disputeDetailsLoading ? <CircularProgress size={16} /> : null}
            //         sx={{
            //           color: '#ff9800',
            //           borderColor: '#ff9800',
            //           '&:hover': {
            //             backgroundColor: 'rgba(255, 152, 0, 0.1)',
            //             borderColor: '#f57c00',
            //           },
            //         }}
            //       >
            //         {disputeDetailsLoading ? "Loading..." : "Respond to Dispute"}
            //       </Button>
            //     );
            //   } else if (isCreator) {
            //     actionButton = (
            //       <Box sx={{ display: "flex", gap: 1 }}>
            //         <Button
            //           variant="outlined"
            //           color="info"
            //           size="small"
            //           onClick={() => openDisputeViewModal(params.row)}
            //           disabled={isLoading}
            //         >
            //           View Dispute
            //         </Button>
            //         <Button
            //           variant="outlined"
            //           size="small"
            //           disabled
            //           sx={{
            //             color: '#9CA3AF',
            //             borderColor: '#6B7280',
            //           }}
            //         >
            //           Awaiting Response
            //         </Button>
            //       </Box>
            //     );
            //   } else {
            //     actionButton = (
            //       <Button
            //         variant="outlined"
            //         size="small"
            //         disabled
            //         sx={{
            //           color: '#9CA3AF',
            //           borderColor: '#6B7280',
            //         }}
            //       >
            //         Not Authorized
            //       </Button>
            //     );
            //   }

            //   break;

            case "Disputed":
              // Both parties can view dispute details
              actionButton = (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => openDisputeViewModal(params.row)}
                    disabled={isLoading}
                  >
                    View Dispute
                  </Button>
                  <Chip
                    label="Under Review"
                    size="small"
                    sx={{
                      backgroundColor: '#ff9800',
                      color: '#fff',
                    }}
                  />
                </Box>
              );
              break;
          }

          // Return buttons in order: View, Chat (if available), Action Button(s)
          return (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {viewButton}
              {chatButton}
              {actionButton}
            </Box>
          );
        };

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {renderButtons()}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={agreements}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id || row.agreementId}
        disableSelectionOnClick
        sx={{
          cursor: "pointer",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333",
          },
          "& .MuiDataGrid-cell": {
            color: "#fff",
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#1a1f2e",
          },
        }}
      />

      {/* Enhanced Deposit Modal */}
      <DepositModal
        open={depositModal.open}
        onClose={closeDepositModal}
        agreement={depositModal.agreement}
        walletAddress={currentWalletAddress}
        onTransferFunds={handleTransferFunds}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        open={withdrawModal.open}
        onClose={closeWithdrawModal}
        agreement={withdrawModal.agreement}
        walletAddress={currentWalletAddress}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      {/* Chat Popup */}
      <ChatPopup
        open={chatPopup.open}
        onClose={closeChatPopup}
        userAvatar={chatPopup.otherUserAvatar}
        walletAddress={chatPopup.otherUserWallet}
        currentUserWallet={currentWalletAddress}
      />

      {/* Dispute Form Modal */}
      <DisputeFormModal
        open={disputeModal.open}
        onClose={closeDisputeModal}
        agreement={disputeModal.agreement}
        currentWalletAddress={currentWalletAddress}
      />

      {/* Dispute Response Modal */}
      <DisputeResponseModal
        open={disputeResponseModal.open}
        onClose={closeDisputeResponseModal}
        disputeData={disputeResponseModal.disputeData}
        onSubmitResponse={handleDisputeResponseSubmit}
      />

      {/* ✅ FIXED: Dispute View Modal - Using only existing components */}
      {disputeViewModal.open && disputeViewModal.disputeData && (
        <DisputeCreatorView
          open={disputeViewModal.open}
          onClose={closeDisputeViewModal}
          disputeData={disputeViewModal.disputeData}
          connectedWallet={currentWalletAddress}
          onEvidenceSubmitted={handleEvidenceSubmitted}
        />
      )}

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgreementsTable;
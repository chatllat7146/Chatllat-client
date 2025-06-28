import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Skeleton
} from '@mui/material';
import {
  Close as CloseIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const DisputeOppositeView = ({
  open,
  onClose,
  disputeData,
  connectedWallet,
  onEvidenceSubmitted
}) => {
  const [error, setError] = useState('');
  const [oppositeReason, setOppositeReason] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setError('');
      setOppositeReason('');
      setDisputeReason('');
      setEvidenceList([]);
      setLoading(false);
    }
  }, [open]);

  // Fetch all data when modal opens
  useEffect(() => {
    if (open && disputeData) {
      console.log('🚀 Modal opened with disputeData:', disputeData);
      console.log('🚀 Connected wallet prop:', connectedWallet);
      console.log('🚀 Wallet from localStorage:', localStorage.getItem("walletAddress"));
      fetchAllData();
    }
  }, [open, disputeData]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [reason, opposite, evidence] = await Promise.all([
        getDisputeReason(),
        getOppositeResponse(),
        getAllEvidence()
      ]);
      
      setDisputeReason(reason);
      setOppositeReason(opposite);
      setEvidenceList(evidence);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dispute details');
    } finally {
      setLoading(false);
    }
  };

  const getOppositeResponse = async () => {
    try {
      // Try multiple sources for current wallet address
      const currentWallet = localStorage.getItem("walletAddress") || connectedWallet;
      
      console.log('🔍 Debug - Current wallet from localStorage:', localStorage.getItem("walletAddress"));
      console.log('🔍 Debug - Current wallet from props:', connectedWallet);
      console.log('🔍 Debug - Using wallet:', currentWallet);
      console.log('🔍 Debug - DisputeData:', disputeData);
      
      if (!currentWallet || !disputeData) return 'No response provided';

      // Always fetch fresh data from API to ensure we have the latest reasons
      const dispute = await getDisputeDetails();
      console.log('🔍 Debug - Full dispute data from API:', dispute);
      
      if (!dispute?.reasons) {
        console.log('🔍 Debug - No reasons found in dispute');
        return 'No response provided';
      }

      // Get wallet addresses - try different possible field names
      const payerWalletAddress = dispute.payerWalletAddress || disputeData.payerWalletAddress;
      const receiverWalletAddress = dispute.receiverWalletAddress || disputeData.receiverWalletAddress;
      
      console.log('🔍 Debug - Payer wallet:', payerWalletAddress);
      console.log('🔍 Debug - Receiver wallet:', receiverWalletAddress);
      console.log('🔍 Debug - Reasons object:', dispute.reasons);

      // Determine if current user is payer or receiver (check exact match and case-insensitive)
      const isCurrentUserPayer = currentWallet === payerWalletAddress || 
                                 currentWallet?.toLowerCase() === payerWalletAddress?.toLowerCase();
      const isCurrentUserReceiver = currentWallet === receiverWalletAddress || 
                                   currentWallet?.toLowerCase() === receiverWalletAddress?.toLowerCase();
      
      console.log('🔍 Debug - Is current user payer?', isCurrentUserPayer);
      console.log('🔍 Debug - Is current user receiver?', isCurrentUserReceiver);

      // Get the opposite party's reason
      let oppositeReason;
      if (isCurrentUserPayer) {
        oppositeReason = dispute.reasons.receiverReason;
        console.log('🔍 Debug - Current user is payer, getting receiver reason:', oppositeReason);
      } else if (isCurrentUserReceiver) {
        oppositeReason = dispute.reasons.payerReason;
        console.log('🔍 Debug - Current user is receiver, getting payer reason:', oppositeReason);
      } else {
        console.log('🔍 Debug - Current user is neither payer nor receiver');
        return 'Unable to determine user role';
      }

      console.log('🔍 Debug - Final opposite reason:', oppositeReason);
      return oppositeReason || 'No response provided';
    } catch (error) {
      console.error('Error fetching opposite response:', error);
      return 'Error loading response';
    }
  };

  const getDisputeDetails = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/dispute/details?agreementId=${disputeData.agreementId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dispute details');
    }

    const data = await response.json();
    return data.data.dispute;
  };

  // Determine which reason to show based on dispute creator
  const getDisputeReason = async () => {
    try {
      const dispute = await getDisputeDetails();
      console.log('📝 Debug - Getting dispute reason, full dispute:', dispute);
      
      if (!dispute?.reasons) {
        console.log('📝 Debug - No reasons found');
        return 'No reason provided';
      }

      const { disputeCreator, reasons } = dispute;
      console.log('📝 Debug - Dispute creator:', disputeCreator);
      console.log('📝 Debug - Available reasons:', reasons);

      if (disputeCreator === 'Payer' && reasons.payerReason) {
        console.log('📝 Debug - Returning payer reason:', reasons.payerReason);
        return reasons.payerReason;
      } else if (disputeCreator === 'Receiver' && reasons.receiverReason) {
        console.log('📝 Debug - Returning receiver reason:', reasons.receiverReason);
        return reasons.receiverReason;
      } else if (reasons.autoCreatedReason) {
        console.log('📝 Debug - Returning auto-created reason:', reasons.autoCreatedReason);
        return reasons.autoCreatedReason;
      }

      console.log('📝 Debug - No matching reason found');
      return 'No reason provided';
    } catch (error) {
      console.error('Error fetching dispute reason:', error);
      return 'Error loading reason';
    }
  };

  // Get only receiver's evidence files
  const getAllEvidence = async () => {
    try {
      const dispute = await getDisputeDetails();

      if (!dispute?.evidence) return [];

      const receiverEvidence = dispute.evidence.receiverEvidence || [];
      console.log('📎 Debug - Receiver evidence:', receiverEvidence);

      return receiverEvidence.map(url => ({ url, type: 'receiver' }));
    } catch (error) {
      console.error('Error fetching evidence:', error);
      return [];
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'DisputeRaised': return 'error';
      case 'InProcess': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  if (!disputeData) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="dispute-opposite-view-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white'
          }}
        >
          <Typography id="dispute-opposite-view-title" variant="h5" fontWeight="bold">
            Dispute Details - Receiver View
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: 'white' }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Alert Messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Dispute Information */}
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Dispute Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Project Title
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {disputeData.projectTitle || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Agreement ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {disputeData.agreementId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={disputeData.status}
                      color={getStatusColor(disputeData.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {disputeData.disputeCategory}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Raised On
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formatDate(disputeData.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Created By
                    </Typography>
                    <Chip
                      label={disputeData.disputeCreator}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Dispute Reason */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Dispute Reason
                </Typography>
                {loading ? (
                  <Skeleton variant="text" width="100%" height={60} />
                ) : (
                  <Typography variant="body1">
                    {disputeReason}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Opposite Party Response */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Opposite Party Response
                </Typography>
                {loading ? (
                  <Skeleton variant="text" width="100%" height={60} />
                ) : (
                  <Typography variant="body1">
                    {oppositeReason}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Receiver Evidence */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Receiver Evidence
                </Typography>
                {loading ? (
                  <Box>
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} />
                  </Box>
                ) : evidenceList.length > 0 ? (
                  <List dense>
                    {evidenceList.map((evidence, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          {evidence.url.includes('.pdf') ? (
                            <PdfIcon color="error" />
                          ) : (
                            <ImageIcon color="primary" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={`Evidence ${index + 1}`}
                          secondary="Uploaded by: Receiver"
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="view"
                            onClick={() => window.open(evidence.url, '_blank')}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No evidence files uploaded by receiver yet.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* Action Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default DisputeOppositeView;
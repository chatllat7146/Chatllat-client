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
  Skeleton,
  Fade,
  Grow
} from '@mui/material';
import {
  Close as CloseIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const DisputeCreatorView = ({
  open,
  onClose,
  disputeData,
  connectedWallet,
  onEvidenceSubmitted
}) => {
  const [error, setError] = useState('');
  const [payerReason, setPayerReason] = useState('');
  const [receiverReason, setReceiverReason] = useState('');
  const [payerEvidenceList, setPayerEvidenceList] = useState([]);
  const [receiverEvidenceList, setReceiverEvidenceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creator, setCreator] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setError('');
      setPayerReason('');
      setReceiverReason('');
      setPayerEvidenceList([]);
      setReceiverEvidenceList([]);
      setLoading(false);
    }
  }, [open]);

  // Fetch all data when modal opens
  useEffect(() => {
    if (open && disputeData) {
      console.log('🚀 Modal opened with disputeData:', disputeData);
      fetchAllData();
    }
  }, [open, disputeData]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [payerReasonData, receiverReasonData, payerEvidence, receiverEvidence] = await Promise.all([
        getPayerReason(),
        getReceiverReason(),
        getPayerEvidence(),
        getReceiverEvidence()
      ]);

      setPayerReason(payerReasonData);
      setReceiverReason(receiverReasonData);
      setPayerEvidenceList(payerEvidence);
      setReceiverEvidenceList(receiverEvidence);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dispute details');
    } finally {
      setLoading(false);
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
    setCreator(data.data.dispute.disputeCreator)
    return data.data.dispute;
  };

  // ✅ NEW: Get payer's reason (neutral approach)
  const getPayerReason = async () => {
    try {
      const dispute = await getDisputeDetails();
      console.log('📝 Debug - Getting payer reason, full dispute:', dispute);

      if (!dispute?.reasons) {
        console.log('📝 Debug - No reasons found');
        return 'No reason provided by payer';
      }

      const payerReason = dispute.reasons.payerReason;
      console.log('📝 Debug - Payer reason:', payerReason);

      return payerReason || 'No reason provided by payer';
    } catch (error) {
      console.error('Error fetching payer reason:', error);
      return 'Error loading payer reason';
    }
  };

  // ✅ NEW: Get receiver's reason (neutral approach)
  const getReceiverReason = async () => {
    try {
      const dispute = await getDisputeDetails();
      console.log('📝 Debug - Getting receiver reason, full dispute:', dispute);

      if (!dispute?.reasons) {
        console.log('📝 Debug - No reasons found');
        return 'No response provided by receiver';
      }

      const receiverReason = dispute.reasons.receiverReason;
      console.log('📝 Debug - Receiver reason:', receiverReason);

      return receiverReason || 'No response provided by receiver';
    } catch (error) {
      console.error('Error fetching receiver reason:', error);
      return 'Error loading receiver response';
    }
  };

  // Get payer's evidence files
  const getPayerEvidence = async () => {
    try {
      const dispute = await getDisputeDetails();

      if (!dispute?.evidence) return [];

      const payerEvidence = dispute.evidence.payerEvidence || [];
      console.log('📎 Debug - Payer evidence:', payerEvidence);

      return payerEvidence.map(url => ({ url, type: 'payer' }));
    } catch (error) {
      console.error('Error fetching payer evidence:', error);
      return [];
    }
  };

  // Get receiver's evidence files
  const getReceiverEvidence = async () => {
    try {
      const dispute = await getDisputeDetails();

      if (!dispute?.evidence) return [];

      const receiverEvidence = dispute.evidence.receiverEvidence || [];
      console.log('📎 Debug - Receiver evidence:', receiverEvidence);

      return receiverEvidence.map(url => ({ url, type: 'receiver' }));
    } catch (error) {
      console.error('Error fetching receiver evidence:', error);
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
      closeAfterTransition
      aria-labelledby="dispute-view-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        border: '1px solid #4B515A'
      }}
    >
      <Grow in={open} timeout={300} >
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
          <Box
            sx={{
              p: 3,
              borderBottom: 2,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#0E1218',
              color: 'white',
            }}
          >
            <Typography id="dispute-view-title" variant="h5" fontWeight="bold">
              Dispute Details
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
              <Grid item size={{ xs: 12 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Dispute Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Project Title
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {disputeData.projectTitle || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Agreement ID
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {disputeData.agreementId}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={disputeData.status}
                        color={getStatusColor(disputeData.status)}
                        size="small"
                      />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Category
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {disputeData.disputeCategory}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Raised On
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDate(disputeData.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Created By
                      </Typography>
                      <Chip
                        label={creator}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* ✅ UPDATED: Payer's Statement/Reason */}
              <Grid item size={{ xs: 12 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Payer's Statement
                  </Typography>
                  {loading ? (
                    <Skeleton variant="text" width="100%" height={60} />
                  ) : (
                    <Typography variant="body1">
                      {payerReason}
                    </Typography>
                  )}
                </Paper>
              </Grid>

              {/* ✅ UPDATED: Receiver's Response */}
              <Grid item size={{ xs: 12 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Receiver's Statement
                  </Typography>
                  {loading ? (
                    <Skeleton variant="text" width="100%" height={60} />
                  ) : (
                    <Typography variant="body1">
                      {receiverReason}
                    </Typography>
                  )}
                </Paper>
              </Grid>

              {/* Payer Evidence Section */}
              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Payer Evidence
                  </Typography>
                  {loading ? (
                    <Box>
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" width="100%" height={40} />
                    </Box>
                  ) : payerEvidenceList.length > 0 ? (
                    <List dense>
                      {payerEvidenceList.map((evidence, index) => (
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
                            secondary="Uploaded by: Payer"
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
                      No evidence files uploaded by payer.
                    </Typography>
                  )}
                </Paper>
              </Grid>

              {/* Receiver Evidence Section */}
              <Grid item size={{ xs: 12, md: 6 }}>
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
                  ) : receiverEvidenceList.length > 0 ? (
                    <List dense>
                      {receiverEvidenceList.map((evidence, index) => (
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
                      No evidence files uploaded by receiver.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grow>
    </Modal>
  );
};

export default DisputeCreatorView;
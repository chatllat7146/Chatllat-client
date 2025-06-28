import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Button from '@mui/material/Button';
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Skeleton
} from '@mui/material'
import {
  Image as ImageIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0E1218',
      paper: '#0E1218',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

export default function DisputeDetailView({ dispute, onClose }) {
  if (!dispute) return null;
  const payer_evidence = dispute.evidence.payerEvidence || [];
  const payerEvidence = payer_evidence.map(url => ({ url, type: 'payer' }));
  const receiver_evidence = dispute.evidence.receiverEvidence || [];
  const receiverEvidence = receiver_evidence.map(url => ({ url, type: 'payer' }));

  const timelineItems = [
    { status: 'Dispute Raised', date: dispute.createdAt || 'N/A', color: 'error' },
    { status: 'Receiver Responded', date: dispute.freelancerRespondedOn || 'N/A', color: 'primary' },
    { status: 'Payer Submitted Proof', date: dispute.clientProofSubmittedOn || 'N/A', color: 'secondary' },
    { status: 'Receiver Submitted Proof', date: dispute.freelancerProofSubmittedOn || 'N/A', color: 'secondary' },
    { status: 'Dispute Escalated', date: dispute.escalatedOn || 'N/A', color: 'warning' },
    { status: 'Resolved', date: dispute.resolvedOn || 'N/A', color: 'success' },
  ];

  // const statusTimeline = [
  //   { status: 'Awaiting Response', date: dispute.raisedOn || 'N/A' },
  //   { status: 'In Discussion', date: dispute.freelancerRespondedOn || 'N/A' },
  //   { status: 'Resolved', date: dispute.resolvedOn || 'N/A' }
  // ];

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'Awaiting Response':
  //       return 'error';
  //     case 'In Discussion':
  //       return 'warning';
  //     case 'Resolved':
  //       return 'success';
  //     default:
  //       return 'grey';
  //   }
  // };

  const resolutionOutcome = dispute.supportDecision || 'No resolution outcome available';
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: '100%', bgcolor: '#0E1218', color: '#FFFFFF', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">Dispute Details</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            disableRipple
            disableFocusRipple
            sx={{
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent' },
              '&:active': { backgroundColor: 'transparent' },
              '&:focus': { backgroundColor: 'transparent', outline: 'none', boxShadow: 'none' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Dispute ID"
                  value={dispute.id || 'N/A'}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Status"
                  value={dispute.status || 'N/A'}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 12 }}>
                <TextField
                  fullWidth
                  label="Dispute Category"
                  value={dispute.disputeCategory || 'N/A'}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>

              {/* <Grid item size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Proof Submitted by Payer</Typography>
                <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 1 }}>
                  {dispute.evidence.payerEvidence && dispute.evidence.payerEvidence.length > 0 ? (
                    dispute.evidence.payerEvidence.map((file, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#90caf9', textDecoration: 'none' }}
                        >
                          {file.name}
                        </a>
                      </Box>
                    ))
                  ) : (
                    <Typography>No proof submitted by client</Typography>
                  )}
                </Box>
              </Grid> */}

              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Proof Submitted by Payer
                  </Typography>
                  {payerEvidence.length > 0 ? (
                    <List dense>
                      {payerEvidence.map((evidence, index) => (
                        <ListItem key={index} divider>
                          <ListItemIcon>
                            {evidence?.url?.includes('.pdf') ? (
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
                      No proof submitted by client
                    </Typography>
                  )}
                </Paper>
              </Grid>


              {/* <Grid item size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Proof Submitted by Receiver</Typography>
                <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 1 }}>
                  {dispute.freelancerProofs && dispute.freelancerProofs.length > 0 ? (
                    dispute.freelancerProofs.map((file, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#90caf9', textDecoration: 'none' }}
                        >
                          {file.name}
                        </a>
                      </Box>
                    ))
                  ) : (
                    <Typography>No proof submitted by receiver</Typography>
                  )}
                </Box>
              </Grid> */}

              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Proof Submitted by Receiver
                  </Typography>
                  {receiverEvidence.length > 0 ? (
                    <List dense>
                      {receiverEvidence.map((evidence, index) => (
                        <ListItem key={index} divider>
                          <ListItemIcon>
                            {evidence?.url?.includes('.pdf') ? (
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
                      No proof submitted by receiver
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 4, md: 4 }}>
                    <Button variant="contained" fullWidth>
                      Submit Proof
                    </Button>
                  </Grid>
                  <Grid item size={{ xs: 4, md: 4 }}>
                    <Button variant="contained" color="success" fullWidth>
                      Accept Resolution
                    </Button>
                  </Grid>
                  <Grid item size={{ xs: 4, md: 4 }}>
                    <Button variant="outlined" color="warning" fullWidth>
                      Raise Escalation
                    </Button>
                  </Grid>
                  <Grid item size={{ xs: 4, md: 4 }}>
                    <Button variant="outlined" color="error" fullWidth>
                      Close Dispute
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Resolution Outcome</Typography>
                <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 1 }}>
                  <Typography>{resolutionOutcome}</Typography>
                </Box>
              </Grid>

              {/* <Grid item size={{ xs: 12, md: 12 }}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ mb: 2 }}>Status Timeline</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {statusTimeline.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimelineDot color={getStatusColor(item.status)} />
                        <Box sx={{ mx: 1 }}>
                          <Typography>{item.status}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                        </Box>
                        {index < statusTimeline.length - 1 && (
                          <TimelineConnector sx={{ width: 40, height: 2, bgcolor: 'grey.500', mx: 1 }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ borderRadius: 2, height: '100%', width: '100%' }}>
              <Timeline position="right">
                {timelineItems.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="text.secondary">
                      {item.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={item.color} />
                      {index < timelineItems.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.status}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

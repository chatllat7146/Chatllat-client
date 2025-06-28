import React from 'react';
import {
  Popover,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const notifications = [
  {
    id: '1',
    avatar: { bgcolor: '#e91e63', initial: 'F' },
    message: 'Freelancer agreement created.',
    time: '2m',
    type: 'agreement'
  },
  {
    id: '2',
    avatar: { bgcolor: '#ff9800', initial: 'W' },
    message: '5264****67 This wallet address cancelled your agreement.',
    time: '1hr',
    type: 'cancellation'
  },
  {
    id: '3',
    avatar: { bgcolor: '#2196f3', initial: 'A' },
    message: '4536****74 This wallet address accept you agreement.',
    time: '12h',
    type: 'acceptance'
  },
  {
    id: '4',
    avatar: { bgcolor: '#4caf50', initial: 'W' },
    message: 'Withdraw your balance',
    time: '12h',
    type: 'withdrawal',
    amount: '₹ 500'
  },
  {
    id: '5',
    avatar: { bgcolor: '#2196f3', initial: 'F' },
    message: 'Freelancer agreement created.',
    time: '2d',
    type: 'agreement'
  },
  {
    id: '6',
    avatar: { bgcolor: '#9c27b0', initial: 'C' },
    message: '5264****67 This wallet address cancelled your agreement.',
    time: '3d',
    type: 'cancellation'
  },
  {
    id: '7',
    avatar: { bgcolor: '#e91e63', initial: 'F' },
    message: 'Freelancer agreement created.',
    time: '5d',
    type: 'agreement'
  }
];

const groupNotifications = () => {
  const today = notifications.filter((n) => 
    n.time.includes('m') || n.time.includes('hr')
  );
  
  const yesterday = notifications.filter((n) => 
    n.time.includes('12h')
  );
  
  const lastFiveDays = notifications.filter((n) => 
    n.time.includes('d') && !n.time.includes('12h')
  );

  return {
    Today: today,
    Yesterday: yesterday,
    'Last 5 days': lastFiveDays
  };
};

// Format message with highlighted keywords
const formatMessage = (message) => {
  const highlights = [
    { word: 'Freelancer', color: '#e91e63' },
    { word: 'Withdraw', color: '#4caf50' },
    { word: 'accept', color: '#2196f3' },
    { word: 'cancelled', color: '#ff9800' }
  ];

  let formattedMessage = message;
  highlights.forEach(({ word, color }) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    formattedMessage = formattedMessage.replace(
      regex, 
      `<span style="color: ${color}; font-weight: bold;">${word}</span>`
    );
  });

  return formattedMessage;
};

export default function NotificationPopover({ anchorEl, onClose }) {
  const open = Boolean(anchorEl);
  const groups = groupNotifications();

  console.log('NotificationPopover render:', { open, anchorEl }); // Debug log

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ 
        vertical: 'bottom', 
        horizontal: 'center' 
      }}
      transformOrigin={{ 
        vertical: 'top', 
        horizontal: 'center' 
      }}
      PaperProps={{
        sx: {
          backgroundColor: '#0E1218',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(5, 8, 12, 0.6), 0 10px 10px -5px rgba(5, 8, 12, 0.3)',
          width: 400,
          maxWidth: '100%',
          border: '1px solid #4B515A',
          maxHeight: '600px',
          overflow: 'hidden',
          marginTop: 2,
          marginLeft: 24,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: "14px 18px",
          borderBottom: '1px solid #4B515A',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '20px',
            color: 'white'
          }}
        >
          Notification
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          sx={{
            color: 'white',
            p: 1,
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)' 
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Notifications List */}
      <Box sx={{ 
        maxHeight: '500px', 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#1a1a1a',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#444',
          borderRadius: '3px',
        },
      }}>
        {Object.entries(groups).map(([group, items], groupIndex) =>
          items.length > 0 ? (
            <Box key={group}>
              {/* Section Header */}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#b3b3b3',
                  textTransform: 'uppercase',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  display: 'block',
                  px: 3,
                  py: 2,
                  pt: groupIndex === 0 ? 2 : 3,
                  backgroundColor: '#0E1218',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              >
                {group}
              </Typography>
              
              {/* Notifications */}
              <List disablePadding sx={{ px: 3 }}>
                {items.map((notification, index) => (
                  <ListItem
                    key={notification.id}
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderBottom: index < items.length - 1 ? '1px solid #4B515A' : 'none',
                      cursor: 'pointer',
                      borderRadius: 1,
                      transition: 'background-color 0.2s',
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)' 
                      },
                    }}
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: notification.avatar.bgcolor,
                          width: 48,
                          height: 48,
                          fontSize: '18px',
                          fontWeight: 600,
                          color: 'white'
                        }}
                      >
                        {notification.avatar.initial}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                      sx={{ flex: 1, minWidth: 0 }}
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'white',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            mb: 0.5,
                            wordBreak: 'break-word'
                          }}
                          dangerouslySetInnerHTML={{ 
                            __html: formatMessage(notification.message) 
                          }}
                        />
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#b3b3b3',
                            fontSize: '12px'
                          }}
                        >
                          {notification.time}
                        </Typography>
                      }
                    />
                    
                    {notification.amount && (
                      <Box sx={{ ml: 1, alignSelf: 'center' }}>
                        <Chip
                          label={notification.amount}
                          size="small"
                          sx={{
                            backgroundColor: '#4caf50',
                            color: 'white',
                            fontSize: '12px',
                            height: 28,
                            fontWeight: 600,
                            '& .MuiChip-label': {
                              px: 1.5
                            }
                          }}
                        />
                      </Box>
                    )}
                  </ListItem>
                ))}
              </List>
              
              {/* Section Divider */}
              {groupIndex < Object.keys(groups).length - 1 && items.length > 0 && (
                <Box sx={{ 
                  height: 3,
                  width: "87%",
                  margin: "0 auto", 
                  backgroundColor: '#4B515A' 
                }} />
              )}
            </Box>
          ) : null
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 1.5, 
        px: 3,
        borderTop: '1px solid #4B515A',
        backgroundColor: '#0E1218'
      }}>
      </Box>
    </Popover>
  );
}
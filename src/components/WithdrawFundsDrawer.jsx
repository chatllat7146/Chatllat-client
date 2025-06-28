import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Divider
} from '@mui/material';
import {
    Close as CloseIcon,
    AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';

const WithdrawFundsDrawer = ({ open, onClose }) => {
    // Dummy withdrawal data
    const withdrawalItems = [
        {
            id: 1,
            projectTitle: "Project Title",
            walletAddress: "2432****34",
            date: "22 May",
            amount: "500"
        },
        {
            id: 2,
            projectTitle: "Project Title",
            walletAddress: "2432****34", 
            date: "22 May",
            amount: "500"
        },
        {
            id: 3,
            projectTitle: "Project Title",
            walletAddress: "2432****34",
            date: "22 May", 
            amount: "500"
        }
    ];

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 380, // Same width as ProfileDrawer
                    backgroundColor: '#0E1218',
                    color: 'white',
                    borderLeft: '1px solid #4B515A',
                    zIndex: 1400, // Higher than the profile drawer
                }
            }}
        >
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid #4B515A'
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}>
                    Withdraw Funds
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#9CA3AF',
                        '&:hover': {
                            color: 'white'
                        }
                    }}
                >
                    <CloseIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
            </Box>

            {/* Withdrawal Items List */}
            <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                p: 2
            }}>
                {withdrawalItems.map((item, index) => (
                    <Box key={item.id}>
                        {/* Withdrawal Item */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 2.5,
                            px: 0
                        }}>
                            {/* Left side - Project info */}
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    mb: 0.5
                                }}>
                                    {item.projectTitle} - {item.walletAddress}
                                </Typography>
                                <Typography sx={{
                                    color: '#6B7280',
                                    fontSize: '0.875rem'
                                }}>
                                    {item.date}
                                </Typography>
                            </Box>

                            {/* Right side - Amount Button */}
                            <Button
                                variant="contained"
                                disabled
                                sx={{
                                    backgroundColor: '#059669',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    px: 2.5,
                                    py: 1,
                                    minWidth: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&.Mui-disabled': {
                                        backgroundColor: '#059669',
                                        color: 'white'
                                    },
                                    '&:hover': {
                                        backgroundColor: '#059669'
                                    }
                                }}
                            >
                                <WalletIcon sx={{ 
                                    fontSize: '1rem',
                                    color: 'white'
                                }} />
                                {item.amount}
                            </Button>
                        </Box>

                        {/* Divider between items (not after last item) */}
                        {index < withdrawalItems.length - 1 && (
                            <Divider sx={{ 
                                borderColor: '#4B515A',
                                mx: 0
                            }} />
                        )}
                    </Box>
                ))}

                {/* Empty state if no items */}
                {withdrawalItems.length === 0 && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px',
                        gap: 2
                    }}>
                        <WalletIcon sx={{ 
                            fontSize: '3rem',
                            color: '#6B7280'
                        }} />
                        <Typography sx={{
                            color: '#6B7280',
                            fontSize: '1rem',
                            textAlign: 'center'
                        }}>
                            No pending withdrawals
                        </Typography>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default WithdrawFundsDrawer;
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Rating,
    TextField,
    Button
} from '@mui/material';
import {
    Close as CloseIcon,
    Edit as EditIcon,
    ChevronRight as ChevronRightIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import WithdrawFundsDrawer from './WithdrawFundsDrawer'; // Import the WithdrawFundsDrawer

const ProfileDrawer = ({ open, onClose, userAvatar, account, walletBalance, profileData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [withdrawDrawerOpen, setWithdrawDrawerOpen] = useState(false); // Add state for withdraw drawer
    const [formData, setFormData] = useState({
        name: formatWalletAddress(account),
        email: '',
        contact: '',
        description: '',
        profileImage: userAvatar || ''
    });

    const menuItems = [
        { text: 'Withdraw Funds' },
        { text: 'Term and conditions' },
        { text: 'Privacy policy' },
        { text: 'Help and support' },
        { text: 'FAQs' }
    ];

    // Format phone number from wallet address
    function formatWalletAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}****${address.slice(-2)}`;
    }

    // Add useEffect to populate form with profile data
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || formatWalletAddress(account),
                email: profileData.email || '',
                contact: profileData.contact || '',
                description: profileData.description || '',
                profileImage: profileData.profileImage || userAvatar || ''
            });
        } else {
            // Fallback to default values
            setFormData({
                name: formatWalletAddress(account),
                email: '',
                contact: '',
                description: '',
                profileImage: userAvatar || ''
            });
        }
    }, [profileData, userAvatar, account]);

    // Get balance display value
    const getBalanceDisplay = () => {
        if (walletBalance?.usdtEquivalent) {
            return Math.round(walletBalance.usdtEquivalent);
        }
        return "500"; // Default fallback
    };

    // Handle menu item clicks
    const handleMenuItemClick = (itemText) => {
        if (itemText === 'Withdraw Funds') {
            setWithdrawDrawerOpen(true);
        }
        // Add other menu item handlers here as needed
    };

    // Handle withdraw drawer close
    const handleWithdrawDrawerClose = () => {
        setWithdrawDrawerOpen(false);
    };

    const handleEditClick = async () => {
        setIsEditing(true);
        
        // Fetch fresh profile data when edit is clicked
        if (account) {
            try {
                const profileResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${account}`);
                const profileResult = await profileResponse.json();
                
                if (profileResponse.ok && profileResult.success && profileResult.data?.user) {
                    // Update formData with fresh data from API
                    setFormData({
                        name: profileResult.data.user.name || formatWalletAddress(account),
                        email: profileResult.data.user.email || '',
                        contact: profileResult.data.user.contact || '',
                        description: profileResult.data.user.description || '',
                        profileImage: profileResult.data.user.profileImage || userAvatar || ''
                    });
                    console.log('Fresh profile data loaded for editing:', profileResult.data.user);
                } else {
                    // If no profile found, use current formData
                    setFormData(prev => ({ ...prev }));
                }
            } catch (error) {
                console.error('Error fetching profile data for editing:', error);
                // Fallback to current formData if fetch fails
                setFormData(prev => ({ ...prev }));
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to original profile data
        if (profileData) {
            setFormData({
                name: profileData.name || formatWalletAddress(account),
                email: profileData.email || '',
                contact: profileData.contact || '',
                description: profileData.description || '',
                profileImage: profileData.profileImage || userAvatar || ''
            });
        } else {
            setFormData({
                name: formatWalletAddress(account),
                email: '',
                contact: '',
                description: '',
                profileImage: userAvatar || ''
            });
        }
    };

    const handleSave = async () => {
        try {
            // Prepare the data for the API call
            const updateData = {
                walletId: account,
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                description: formData.description,
                profileImage: formData.profileImage
            };

            console.log('Updating profile with data:', updateData);

            // Call the PATCH API to update profile
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log('Profile updated successfully:', result);
                setIsEditing(false);
                // Optionally, you can trigger a refresh of profile data in the parent component
                // or show a success message
            } else {
                console.error('Failed to update profile:', result.message || 'Unknown error');
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please check your connection and try again.');
        }
    };

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleProfilePicUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    profileImage: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: 380,
                        backgroundColor: '#0E1218',
                        color: 'white',
                        borderLeft: '1px solid #4B515A',
                    }
                }}
            >
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '2rem'
                    }}>
                        Profile
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
                <Box sx={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: '#4B515A'
                }} />
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                    {/* Profile Section */}
                    <Box sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid #4B515A',
                        borderRadius: '10px',
                        p: 3,
                        mb: 4.5,
                        minHeight: isEditing ? '490px' : "120px"
                    }}>
                        {!isEditing ? (
                            // Display Mode
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 2
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {/* Avatar - Using actual user avatar from Header */}
                                    <Box sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f3f4f6'
                                    }}>
                                        {userAvatar ? (
                                            <img 
                                                src={userAvatar} 
                                                alt="User avatar"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        ) : (
                                            <Avatar sx={{
                                                width: 64,
                                                height: 64,
                                                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #3B82F6 100%)',
                                                fontSize: '1.5rem'
                                            }}>
                                                {account ? account.slice(2, 4).toUpperCase() : '👤'}
                                            </Avatar>
                                        )}
                                    </Box>

                                    {/* Phone and Rating */}
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            color: 'white',
                                            fontWeight: '500',
                                            fontSize: '1.25rem',
                                            mb: 0.5
                                        }}>
                                            {formData.name || formatWalletAddress(account)}
                                        </Typography>

                                        <Rating
                                            value={4}
                                            readOnly
                                            sx={{
                                                '& .MuiRating-iconFilled': {
                                                    color: '#FCD34D'
                                                },
                                                '& .MuiRating-iconEmpty': {
                                                    color: '#6B7280'
                                                },
                                                fontSize: '1.125rem'
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Edit Icon */}
                                <IconButton
                                    size="small"
                                    onClick={handleEditClick}
                                    sx={{
                                        color: '#9CA3AF',
                                        '&:hover': {
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ) : (
                            // Edit Mode
                            <Box>
                                {/* Profile Picture Section */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2, 
                                    mb: 3 
                                }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicUpload}
                                        style={{ display: 'none' }}
                                        id="profile-pic-upload"
                                    />
                                    <Box sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#374151',
                                        border: '2px dashed #6B7280',
                                    }}>
                                        {formData.profileImage ? (
                                            <img 
                                                src={formData.profileImage} 
                                                alt="Profile"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        ) : (
                                            <PhotoCameraIcon sx={{ 
                                                color: '#9CA3AF', 
                                                fontSize: '1.5rem' 
                                            }} />
                                        )}
                                    </Box>
                                    <Button
                                        component="label"
                                        htmlFor="profile-pic-upload"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            borderColor: '#4B515A',
                                            color: '#9CA3AF',
                                            '&:hover': {
                                                borderColor: '#6B7280',
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        Change Profile Pic
                                    </Button>
                                </Box>

                                {/* Form Fields */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                    <TextField
                                        label="Name"
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        fullWidth
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: '#4B515A',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#6B7280',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#059669',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#9CA3AF',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#059669',
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Email"
                                        value={formData.email}
                                        onChange={handleInputChange('email')}
                                        type="email"
                                        fullWidth
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: '#4B515A',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#6B7280',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#059669',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#9CA3AF',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#059669',
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Contact"
                                        value={formData.contact}
                                        onChange={handleInputChange('contact')}
                                        fullWidth
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: '#4B515A',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#6B7280',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#059669',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#9CA3AF',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#059669',
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Description"
                                        value={formData.description}
                                        onChange={handleInputChange('description')}
                                        fullWidth
                                        multiline
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                '& fieldset': {
                                                    borderColor: '#4B515A',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#6B7280',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#059669',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#9CA3AF',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#059669',
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 2, 
                                    justifyContent: 'flex-end' 
                                }}>
                                    <Button
                                        onClick={handleCancel}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            borderColor: '#4B515A',
                                            color: '#9CA3AF',
                                            '&:hover': {
                                                borderColor: '#6B7280',
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#059669',
                                            '&:hover': {
                                                backgroundColor: '#047857'
                                            }
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Balance Section */}
                    <Box sx={{ mb: 3, position: 'absolute', width: '80%', top: isEditing ? '560px' : '200px', left: '38px', transition: 'top 0.3s ease' }}>
                        <Box sx={{
                            backgroundColor: '#059669',
                            borderRadius: '10px',
                            p: '10px 15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{
                                color: 'white',
                                fontSize: '1.1rem',
                                fontWeight: '500'
                            }}>
                                Total balance
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{
                                    color: '#BBF7D0',
                                    fontSize: '0.875rem'
                                }}>
                                    ₹
                                </Typography>
                                <Typography variant="h5" sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>
                                    {getBalanceDisplay()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Menu Items */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {menuItems.map((item, index) => (
                                <Box
                                    key={item.text}
                                    onClick={() => handleMenuItemClick(item.text)} // Add click handler
                                    sx={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #4B515A',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#2D3748'
                                        },
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <Box sx={{
                                        p: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography sx={{
                                            color: 'white',
                                            fontSize: '1.125rem',
                                            fontWeight: '500'
                                        }}>
                                            {item.text}
                                        </Typography>
                                        <ChevronRightIcon sx={{
                                            color: '#9CA3AF',
                                            fontSize: '1.25rem'
                                        }} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Drawer>

            {/* Withdraw Funds Drawer */}
            <WithdrawFundsDrawer 
                open={withdrawDrawerOpen}
                onClose={handleWithdrawDrawerClose}
            />
        </>
    );
};

export default ProfileDrawer;
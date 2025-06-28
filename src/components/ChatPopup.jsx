import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Avatar,
    InputAdornment,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
    Send as SendIcon,
    Close as CloseIcon,
    AttachFile as AttachFileIcon,
    Image as ImageIcon,
    Description as DocumentIcon
} from '@mui/icons-material';
import { io } from 'socket.io-client'; // ADD THIS IMPORT

const ChatPopup = ({ open, onClose, userAvatar, walletAddress, currentUserWallet }) => {
    // ===== MODIFIED STATE MANAGEMENT =====
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);
    const fileInputRef = useRef(null); // ADD SOCKET REF
    const [fileCaption, setFileCaption] = useState('');


    // ===== SOCKET.IO CONNECTION SETUP =====
    useEffect(() => {
        if (open && currentUserWallet) {
            try {
                // Use environment variable or fallback - UPDATE THIS TO YOUR BACKEND URL
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
                console.log('🔗 Connecting to Socket.IO server:', backendUrl);

                // Initialize socket connection with error handling
                socketRef.current = io(backendUrl, {
                    transports: ['websocket', 'polling'], // Fallback transports
                    timeout: 10000, // 10 second timeout
                    forceNew: true, // Force new connection
                });

                // Connection event handlers
                socketRef.current.on('connect', () => {
                    console.log('✅ Connected to Socket.IO server:', socketRef.current.id);
                    // Connect user to socket after successful connection
                    socketRef.current.emit('connect_user', currentUserWallet);
                });

                socketRef.current.on('connect_error', (error) => {
                    console.error('❌ Socket.IO connection error:', error);
                    console.error('Make sure your backend server is running on:', backendUrl);
                });

                socketRef.current.on('disconnect', (reason) => {
                    console.log('🔌 Socket.IO disconnected:', reason);
                });

                socketRef.current.on('error', (error) => {
                    console.error('🚨 Socket.IO error:', error);
                });

                // Listen for incoming messages
                socketRef.current.on('receiveMessage', (messageData) => {
                    console.log('📨 Received message:', messageData);
                    // Only add message if it's between current users
                    if ((messageData.sender === walletAddress && messageData.receiver === currentUserWallet) ||
                        (messageData.sender === currentUserWallet && messageData.receiver === walletAddress)) {
                        setMessages(prev => [...prev, {
                            id: Date.now(),
                            text: messageData.msg || '',
                            image: messageData.image || '',
                            document: messageData.document || '',
                            sender: messageData.sender === currentUserWallet ? 'me' : 'other',
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }]);
                    }
                });

            } catch (error) {
                console.error('❌ Error setting up Socket.IO:', error);
            }

            // Cleanup on component unmount or close
            return () => {
                if (socketRef.current) {
                    console.log('🧹 Cleaning up socket connection');
                    socketRef.current.disconnect();
                    socketRef.current = null;
                }
            };
        }
    }, [open, currentUserWallet, walletAddress]);

    // ===== FETCH MESSAGES ON OPEN =====
    useEffect(() => {
        if (open && currentUserWallet && walletAddress) {
            fetchMessages();
        }
    }, [open, currentUserWallet, walletAddress]);

    // Fetch messages from backend
    const fetchMessages = async () => {
        setLoading(true);
        try {
            // Use full backend URL - UPDATE THIS TO YOUR BACKEND URL
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(
                `${backendUrl}/api/chat/allMsg?sender=${currentUserWallet}&receiver=${walletAddress}`
            );

            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const textResponse = await response.text();
                console.error('Non-JSON response received:', textResponse.slice(0, 200));
                throw new Error('Server returned HTML instead of JSON. Check if the API endpoint exists.');
            }

            const data = await response.json();

            if (data.success && data.data && data.data.messages) {
                const formattedMessages = data.data.messages.map((msg, index) => ({
                    id: msg._id || index,
                    text: msg.msg || '',
                    image: msg.image || '',
                    document: msg.document || '',
                    sender: msg.sender === currentUserWallet ? 'me' : 'other',
                    timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }));
                setMessages(formattedMessages);
                console.log(`✅ Loaded ${formattedMessages.length} messages`);
            } else {
                console.log('No messages found or invalid response structure');
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Don't show error to user for empty chats, just log it
            if (!error.message.includes('404')) {
                setMessages([]);
            }
        } finally {
            setLoading(false);
        }
    };

    // Auto scroll to bottom when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setNotification({
                    open: true,
                    message: 'File size must be less than 10MB',
                    severity: 'error'
                });
                return;
            }
            setSelectedFile(file);
            setFileCaption(''); // Reset caption when new file is selected
        }
        // Reset input
        event.target.value = '';
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/upload/file`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const result = await response.json();

            if (!result.success || !result.data?.imgUrls || result.data.imgUrls.length === 0) {
                throw new Error('Upload failed: No file URL returned');
            }

            return result.data.imgUrls[0]; // Return the first uploaded file URL
        } catch (error) {
            console.error('File upload error:', error);
            throw error;
        }
    };

    const sendFileMessage = async (fileUrl, fileName, fileType) => {
        if (!socketRef.current || !socketRef.current.connected) {
            throw new Error('Not connected to chat server');
        }

        const messageData = {
            sender: currentUserWallet,
            receiver: walletAddress,
            msg: fileType.startsWith('image/') ? (fileCaption || fileName) : (fileName || 'File attachment'),
            image: fileType.startsWith('image/') ? fileUrl : '',
            document: !fileType.startsWith('image/') ? fileUrl : ''
        };

        console.log('📤 Sending file message:', messageData);
        socketRef.current.emit('sendMessage', messageData);
    };

    const handleSendFile = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            // Upload file
            const fileUrl = await uploadFile(selectedFile);

            // Complete progress
            clearInterval(progressInterval);
            setUploadProgress(100);

            // Send message with file
            await sendFileMessage(fileUrl, selectedFile.name, selectedFile.type);

            // Success
            setNotification({
                open: true,
                message: 'File sent successfully!',
                severity: 'success'
            });

            // Reset state
            setSelectedFile(null);
            setFileCaption(''); // Reset caption
            setUploadProgress(0);

        } catch (error) {
            console.error('Error sending file:', error);
            setNotification({
                open: true,
                message: `Failed to send file: ${error.message}`,
                severity: 'error'
            });
        } finally {
            setIsUploading(false);
        }
    };

    // ===== MESSAGE RENDERING FUNCTIONS =====
    const getFileIcon = (fileName) => {
        if (!fileName) return '📎';
        const extension = fileName.split('.').pop()?.toLowerCase();
        const iconMap = {
            pdf: '📄', doc: '📝', docx: '📝', txt: '📄',
            xls: '📊', xlsx: '📊', csv: '📊',
            zip: '🗜️', rar: '🗜️', '7z': '🗜️',
            mp4: '🎥', avi: '🎥', mov: '🎥',
            mp3: '🎵', wav: '🎵', flac: '🎵'
        };
        return iconMap[extension] || '📎';
    };

    const renderMessageContent = (message) => {
        if (message.image) {
            return (
                <Box sx={{ maxWidth: 200 }}>
                    <img
                        src={message.image}
                        alt="Shared image"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setPreviewFile({ url: message.image, type: 'image' })}
                    />
                    {message.text && (
                        <Typography sx={{ mt: 1, fontSize: '0.9rem' }}>
                            {message.text}
                        </Typography>
                    )}
                </Box>
            );
        }

        if (message.document) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                    onClick={() => window.open(message.document, '_blank')}
                >
                    <Typography sx={{ fontSize: '1.2rem' }}>
                        {getFileIcon(message.text)}
                    </Typography>
                    <Box>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            {message.text || 'Document'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#aaa' }}>
                            Click to download
                        </Typography>
                    </Box>
                </Box>
            );
        }

        return (
            <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                {message.text}
            </Typography>
        );
    };

    // ===== MODIFIED SEND MESSAGE FUNCTION =====
    const handleSendMessage = () => {
        if (inputText.trim() && currentUserWallet && walletAddress) {
            // Check if socket is connected
            if (!socketRef.current || !socketRef.current.connected) {
                console.error('❌ Socket not connected. Cannot send message.');
                // Optionally show user notification
                alert('Connection lost. Please refresh the page.');
                return;
            }

            const messageData = {
                sender: currentUserWallet,
                receiver: walletAddress,
                msg: inputText.trim()
            };

            console.log('📤 Sending message:', messageData);

            // Emit message via Socket.IO
            socketRef.current.emit('sendMessage', messageData);

            // Clear input
            setInputText('');
        } else {
            console.error('❌ Cannot send message: missing data', {
                inputText: inputText.trim(),
                currentUserWallet,
                walletAddress,
                socketConnected: socketRef.current?.connected
            });
        }
    };

    // Handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    // Format wallet address for display
    const formatWalletAddress = (address) => {
        if (!address) return "Wallet Address";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (!open) return null;

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 380,
            height: 500,
            backgroundColor: '#0E1218',
            borderRadius: '5px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
            border: '1px solid #4B515A'
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid #4B515A',
                backgroundColor: '#0E1218',
                borderRadius: '5px 5px 0 0'
            }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        mr: 1,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Avatar
                    src={userAvatar}
                    sx={{
                        width: 40,
                        height: 40,
                        mr: 2,
                        backgroundColor: '#4F46E5'
                    }}
                >
                    {!userAvatar && walletAddress ? walletAddress.slice(2, 4).toUpperCase() : '👤'}
                </Avatar>

                <Typography sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }}>
                    {formatWalletAddress(walletAddress)}
                </Typography>
            </Box>

            {/* Chat Messages */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#4A5568',
                    borderRadius: '3px',
                },
            }}>
                {/* ===== LOADING STATE ===== */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Typography sx={{ color: '#9CA3AF' }}>Loading messages...</Typography>
                    </Box>
                ) : messages.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Typography sx={{ color: '#9CA3AF' }}>No messages yet. Start the conversation!</Typography>
                    </Box>
                ) : (
                    messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
                                mb: 1
                            }}
                        >
                            {/* Message Bubble */}
                            <Box sx={{
                                maxWidth: '75%',
                                backgroundColor: message.sender === 'me' ? '#EC4899' : '#059669',
                                color: 'white',
                                borderRadius: message.sender === 'me'
                                    ? '18px 18px 4px 18px'
                                    : '18px 18px 18px 4px',
                                px: 2,
                                py: 1.5,
                                wordBreak: 'break-word'
                            }}>
                                {renderMessageContent(message)}
                            </Box>

                            {/* Timestamp */}
                            <Typography sx={{
                                fontSize: '0.75rem',
                                color: '#9CA3AF',
                                mt: 0.5,
                                alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start'
                            }}>
                                {message.timestamp}
                            </Typography>
                        </Box>
                    ))
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{
                p: 2,
                borderTop: '1px solid #4B515A',
                backgroundColor: '#0E1218',
                borderRadius: '0 0 5px 5px'
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'flex-end'
                }}>
                    {/* File Upload Button */}
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'rgba(249, 212, 65, 0.2)',
                            border: '1px solid rgba(249, 212, 65, 0.2)',
                            borderRadius: '25px',
                            minWidth: '40px',
                            height: '40px',
                            '&:hover': {
                                color: 'rgb(249, 212, 65)',
                                border: '1px solid rgb(249, 212, 65)',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#4A5568',
                                color: '#9CA3AF',
                            }
                        }}>
                        <AttachFileIcon fontSize="small" />
                    </Button>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,application/pdf,.doc,.docx,.txt,.zip,.rar"
                        style={{ display: 'none' }}
                    />

                    <TextField
                        fullWidth
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Write a text..."
                        variant="outlined"
                        size="small"
                        disabled={isUploading}
                        InputProps={{
                            sx: {
                                color: 'white',
                                backgroundColor: '#0E1218',
                                borderRadius: '25px',
                                height: '40px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4A5568',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6B7280',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#8B5CF6',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '14px 16px',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#9CA3AF',
                                    opacity: 1,
                                },
                            }
                        }}
                    />

                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || loading || isUploading}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'rgba(123, 58, 237, 0.3)',
                            border: '1px solid rgba(123, 58, 237, 0.3)',
                            borderRadius: '25px',
                            minWidth: '60px',
                            height: '40px',
                            '&:hover': {
                                color: 'rgb(123, 58, 237)',
                                border: '1px solid rgb(123, 58, 237)'
                            },
                            '&.Mui-disabled': {
                                color: '#4B515A',
                                border: '1px solid #4B515A'
                            }
                        }}
                    >
                        <SendIcon fontSize="small" />
                    </Button>
                </Box>

                {/* File Upload Progress */}
                {selectedFile && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: '#1a1a1a', borderRadius: 1 }}>
                        {/* Image Preview */}
                        {selectedFile.type.startsWith('image/') && (
                            <Box sx={{ mb: 2 }}>
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '150px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        backgroundColor: '#333'
                                    }}
                                />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Box sx={{ fontSize: '1.2rem' }}>
                                {selectedFile.type.startsWith('image/') ? '🖼️' : getFileIcon(selectedFile.name)}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                                    {selectedFile.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#aaa' }}>
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </Box>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setFileCaption('');
                                }}
                                sx={{ color: '#fff' }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Caption Input for Images */}
                        {selectedFile.type.startsWith('image/') && (
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    value={fileCaption}
                                    onChange={(e) => setFileCaption(e.target.value)}
                                    placeholder="Add a caption..."
                                    variant="outlined"
                                    size="small"
                                    disabled={isUploading}
                                    InputProps={{
                                        sx: {
                                            color: 'white',
                                            backgroundColor: '#333',
                                            borderRadius: '8px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#555',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#777',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#8B5CF6',
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#aaa',
                                                opacity: 1,
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        )}

                        {isUploading && (
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CircularProgress size={16} />
                                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                                        Uploading... {uploadProgress}%
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleSendFile}
                                disabled={isUploading}
                                sx={{
                                    backgroundColor: '#059669',
                                    '&:hover': { backgroundColor: '#047857' }
                                }}
                            >
                                {isUploading ? 'Sending...' : 'Send File'}
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setFileCaption('');
                                }}
                                disabled={isUploading}
                                sx={{ color: '#aaa', borderColor: '#555' }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* File Preview Modal */}
            <Dialog
                open={Boolean(previewFile)}
                onClose={() => setPreviewFile(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                    },
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography variant="h6">File Preview</Typography>
                    <IconButton
                        onClick={() => setPreviewFile(null)}
                        sx={{ color: '#fff' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {previewFile && previewFile.type === 'image' && (
                        <img
                            src={previewFile.url}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '70vh',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChatPopup;
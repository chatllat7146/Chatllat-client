import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

function CodeSnippet() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [copied, setCopied] = useState(false);

    const code = `https://chatllat/agreement/2ug32g3923923y9279247`; // Example code to be copied

    // Handle the copy action
    const handleCopy = async () => {
        try {
            const input = document.getElementById('code-input'); // Get the TextField by ID
            input.select(); // Select the text inside the TextField
            input.setSelectionRange(0, 99999); // For mobile devices

            // Copy the selected text to clipboard
            await navigator.clipboard.writeText(input.value);

            setCopied(true);
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error copying to clipboard: ', err);
        }
    };

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Code Snippet TextField */}
                    <TextField
                        id="code-input"
                        label="Agreement Link"
                        variant="outlined"
                        value={code}
                        fullWidth
                        disabled
                        sx={{
                            width: "100%"
                        }}
                    />

                    {/* Copy Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCopy}
                        sx={{
                            height: '56px', // Same height as the TextField
                            padding: '0 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginLeft: '10px',
                        }}
                    >
                        Copy
                    </Button>
                </Box>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ backgroundColor: "#fff", color: "#000"}}>
                        {copied ? 'Copied to clipboard!' : 'Failed to copy'}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default CodeSnippet;

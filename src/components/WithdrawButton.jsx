// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import contractABI from '../abi/SignatureUSDTWithdrawal.json';

// const WithdrawButton = () => {
//     const [account, setAccount] = useState('');
//     const [isConnected, setIsConnected] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState(''); // 'success' or 'error'
//     const [hasWithdrawn, setHasWithdrawn] = useState(false);
//     const [isAllowed, setIsAllowed] = useState(false);

//     // Contract configuration (update these with your deployed contract details)
//     const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE';
//     const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

//     useEffect(() => {
//         checkIfWalletIsConnected();
//     }, []);

//     useEffect(() => {
//         if (account) {
//             checkAllowlistStatus();
//             checkWithdrawalStatus();
//         }
//     }, [account]);

//     const checkIfWalletIsConnected = async () => {
//         try {
//             if (window.ethereum) {
//                 const accounts = await window.ethereum.request({
//                     method: 'eth_accounts'
//                 });
                
//                 if (accounts.length > 0) {
//                     setAccount(accounts[0]);
//                     setIsConnected(true);
//                 }
//             }
//         } catch (error) {
//             console.error('Error checking wallet connection:', error);
//         }
//     };

//     const connectWallet = async () => {
//         try {
//             if (!window.ethereum) {
//                 setMessage('Please install MetaMask!');
//                 setMessageType('error');
//                 return;
//             }

//             const accounts = await window.ethereum.request({
//                 method: 'eth_requestAccounts'
//             });

//             setAccount(accounts[0]);
//             setIsConnected(true);
//             setMessage('Wallet connected successfully!');
//             setMessageType('success');
            
//         } catch (error) {
//             console.error('Error connecting wallet:', error);
//             setMessage('Failed to connect wallet');
//             setMessageType('error');
//         }
//     };

//     const checkAllowlistStatus = async () => {
//         try {
//             const response = await fetch(`${BACKEND_URL}/api/check-allowlist/${account}`);
//             const data = await response.json();
//             setIsAllowed(data.isAllowed);
//         } catch (error) {
//             console.error('Error checking allowlist:', error);
//         }
//     };

//     const checkWithdrawalStatus = async () => {
//         try {
//             if (!window.ethereum) return;
            
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
            
//             const withdrawn = await contract.checkWithdrawalStatus(account);
//             setHasWithdrawn(withdrawn);
//         } catch (error) {
//             console.error('Error checking withdrawal status:', error);
//         }
//     };

//     const handleWithdraw = async () => {
//         if (!isConnected) {
//             setMessage('Please connect your wallet first');
//             setMessageType('error');
//             return;
//         }

//         if (!isAllowed) {
//             setMessage('Your address is not authorized for withdrawal');
//             setMessageType('error');
//             return;
//         }

//         if (hasWithdrawn) {
//             setMessage('You have already withdrawn USDT');
//             setMessageType('error');
//             return;
//         }

//         setIsLoading(true);
//         setMessage('');

//         try {
//             // Step 1: Get signature from backend
//             setMessage('Getting withdrawal signature...');
//             const response = await fetch(`${BACKEND_URL}/api/get-signature`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ address: account }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Failed to get signature');
//             }

//             const { amount, signature } = await response.json();

//             // Step 2: Call smart contract
//             setMessage('Processing withdrawal...');
            
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const signer = await provider.getSigner();
//             const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

//             // Call withdraw function
//             const tx = await contract.withdraw(amount, signature);
            
//             setMessage('Transaction submitted! Waiting for confirmation...');
            
//             // Wait for transaction confirmation
//             const receipt = await tx.wait();
            
//             if (receipt.status === 1) {
//                 // Format amount for display (assuming 6 decimals for USDT)
//                 const formattedAmount = ethers.formatUnits(amount, 6);
//                 setMessage(`Successfully withdrew ${formattedAmount} USDT! Transaction hash: ${receipt.hash}`);
//                 setMessageType('success');
//                 setHasWithdrawn(true);
//             } else {
//                 throw new Error('Transaction failed');
//             }
            
//         } catch (error) {
//             console.error('Withdrawal error:', error);
            
//             let errorMessage = 'Withdrawal failed';
            
//             if (error.message.includes('User has already withdrawn')) {
//                 errorMessage = 'You have already withdrawn USDT';
//                 setHasWithdrawn(true);
//             } else if (error.message.includes('Invalid signature')) {
//                 errorMessage = 'Invalid signature - please try again';
//             } else if (error.message.includes('Transfer failed')) {
//                 errorMessage = 'Transfer failed - admin may need to approve more USDT';
//             } else if (error.message.includes('user rejected')) {
//                 errorMessage = 'Transaction cancelled by user';
//             } else if (error.message) {
//                 errorMessage = error.message;
//             }
            
//             setMessage(errorMessage);
//             setMessageType('error');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const formatAddress = (address) => {
//         if (!address) return '';
//         return `${address.slice(0, 6)}...${address.slice(-4)}`;
//     };

//     return (
//         <div style={{ 
//             maxWidth: '600px', 
//             margin: '0 auto', 
//             padding: '20px', 
//             fontFamily: 'Arial, sans-serif' 
//         }}>
//             <h2>USDT Withdrawal</h2>
            
//             {!isConnected ? (
//                 <div>
//                     <p>Connect your wallet to check eligibility and withdraw USDT</p>
//                     <button 
//                         onClick={connectWallet}
//                         style={{
//                             backgroundColor: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             padding: '12px 24px',
//                             borderRadius: '6px',
//                             cursor: 'pointer',
//                             fontSize: '16px'
//                         }}
//                     >
//                         Connect MetaMask
//                     </button>
//                 </div>
//             ) : (
//                 <div>
//                     <div style={{ marginBottom: '20px' }}>
//                         <p><strong>Connected Account:</strong> {formatAddress(account)}</p>
//                         <p><strong>Eligible for Withdrawal:</strong> {isAllowed ? '✅ Yes' : '❌ No'}</p>
//                         <p><strong>Already Withdrawn:</strong> {hasWithdrawn ? '✅ Yes' : '❌ No'}</p>
//                     </div>

//                     <button 
//                         onClick={handleWithdraw}
//                         disabled={isLoading || !isAllowed || hasWithdrawn}
//                         style={{
//                             backgroundColor: isLoading || !isAllowed || hasWithdrawn ? '#ccc' : '#28a745',
//                             color: 'white',
//                             border: 'none',
//                             padding: '12px 24px',
//                             borderRadius: '6px',
//                             cursor: isLoading || !isAllowed || hasWithdrawn ? 'not-allowed' : 'pointer',
//                             fontSize: '16px',
//                             marginRight: '10px'
//                         }}
//                     >
//                         {isLoading ? 'Processing...' : 'Withdraw USDT'}
//                     </button>

//                     <button 
//                         onClick={() => window.location.reload()}
//                         style={{
//                             backgroundColor: '#6c757d',
//                             color: 'white',
//                             border: 'none',
//                             padding: '12px 24px',
//                             borderRadius: '6px',
//                             cursor: 'pointer',
//                             fontSize: '16px'
//                         }}
//                     >
//                         Refresh Status
//                     </button>
//                 </div>
//             )}

//             {message && (
//                 <div style={{
//                     marginTop: '20px',
//                     padding: '12px',
//                     borderRadius: '6px',
//                     backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
//                     color: messageType === 'success' ? '#155724' : '#721c24',
//                     border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
//                     wordBreak: 'break-word'
//                 }}>
//                     {message}
//                 </div>
//             )}

//             <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
//                 <h4>Instructions:</h4>
//                 <ol>
//                     <li>Connect your MetaMask wallet</li>
//                     <li>Ensure your address is in the allowlist</li>
//                     <li>Click "Withdraw USDT" to get your tokens</li>
//                     <li>Each address can only withdraw once</li>
//                 </ol>
                
//                 <p><strong>Note:</strong> Make sure you're connected to the correct network and the contract is deployed.</p>
//             </div>
//         </div>
//     );
// };

// export default WithdrawButton;
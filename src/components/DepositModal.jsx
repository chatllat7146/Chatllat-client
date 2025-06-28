import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const DepositModal = ({
  open,
  onClose,
  agreement,
  walletAddress,
  onTransferFunds,
}) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // Chatllat's main wallet address
  const CHATLLAT_WALLET = "0xE3E3c73bC1EED1945f66f2aEb153C8833380A5d8";

  // USDT ABI for the functions we need
  const USDT_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)"
  ];

  // Chain configurations - Updated with correct USDT addresses
  const chainConfigs = {
    ethereum: {
      chainId: 1,
      name: "Ethereum Mainnet",
      usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
    },
    binance: {
      chainId: 56,
      name: "BNB Smart Chain",
      usdt: "0x55d398326f99059fF775485246999027B3197955", // USDT on BSC
    },
    bsc: {
      chainId: 56,
      name: "BNB Smart Chain", 
      usdt: "0x55d398326f99059fF775485246999027B3197955", // USDT on BSC
    },
    polygon: {
      chainId: 137,
      name: "Polygon",
      usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT on Polygon
    },
    avalanche: {
      chainId: 43114,
      name: "Avalanche",
      usdt: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", // USDT on Polygon
    },
    arbitrum: {
      chainId: 42161,
      name: "Arbitrum",
      usdt: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // USDT on Arbitrum
    },
    teeshat: {
      chainId: 56,
      name: "BNB Smart Chain",
      usdt: "0x2939A22EBddf8bf0CB2F90420aDd5Aa59228d20c",
    } 
  };

  // Chain mapping with labels and styling
  const chainMap = {
    ethereum: {
      id: 1,
      label: "USDT ERC20",
      badgeClass: "bg-green-700",
      icon: "/src/assets/icons/USDT ERC20.png",
    },
    binance: {
      id: 56,
      label: "USDT BEP20",
      badgeClass: "bg-yellow-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    },
    bsc: {
      id: 56,
      label: "USDT BEP20",
      badgeClass: "bg-yellow-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    },
    polygon: {
      id: 137,
      label: "USDT EIP20",
      badgeClass: "bg-purple-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    },
    avalanche: {
      id: 43114,
      label: "USDT ARC20",
      badgeClass: "bg-red-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    },
    arbitrum: {
      id: 42161,
      label: "USDT ARB20",
      badgeClass: "bg-white-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    },
    teeshat: {
      id: 56,
      label: "Teesha BEP20",
      badgeClass: "bg-white-500",
      icon: "/src/assets/icons/USDT BEP20.png",
    }
  };

  // Get selected chain details
  const selectedChain = agreement?.amountDetails?.chain?.toLowerCase();
  const chainInfo = selectedChain ? chainMap[selectedChain] : null;
  const depositAmount = parseFloat(agreement?.amountDetails?.amount) || 0;
  const userBalance = balance ? parseFloat(balance.balance) : 0;
  const hasSufficientBalance = userBalance >= depositAmount;

  // Check if MetaMask is connected
  const checkMetaMaskConnection = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      
      if (accounts.length === 0) {
        throw new Error("Please connect your MetaMask wallet");
      }

      return accounts[0];
    } catch (error) {
      console.error("MetaMask connection check failed:", error);
      throw error;
    }
  };

  // Check and switch network if needed
  const ensureCorrectNetwork = async (targetChainId) => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId'
      });
      
      const currentChainIdDecimal = parseInt(currentChainId, 16);
      
      if (currentChainIdDecimal !== targetChainId) {
        console.log(`Current network: ${currentChainIdDecimal}, Target: ${targetChainId}`);
        
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${targetChainId.toString(16)}` }],
          });
          
          // Wait a bit for network switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (switchError) {
          console.error("Failed to switch network:", switchError);
          throw new Error(`Please manually switch to ${chainConfigs[selectedChain]?.name} network in MetaMask`);
        }
      }
    } catch (error) {
      console.error("Network check failed:", error);
      throw error;
    }
  };

  // Fetch balance using MetaMask provider
  const fetchBalance = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching balance for:", { walletAddress, selectedChain });

      // Check MetaMask connection first
      const connectedAccount = await checkMetaMaskConnection();
      
      console.log("Connected account:", connectedAccount);
      console.log("Expected wallet address:", walletAddress);
      
      // Use the currently connected account for balance checking
      const accountToCheck = connectedAccount;
      
      if (connectedAccount.toLowerCase() !== walletAddress.toLowerCase()) {
        console.warn("Account mismatch detected:", {
          connected: connectedAccount.toLowerCase(),
          expected: walletAddress.toLowerCase()
        });
        
        // Show a warning but continue with connected account
        setError(`Using connected account ${connectedAccount.slice(0,6)}...${connectedAccount.slice(-4)} instead of ${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`);
      }

      const chainConfig = chainConfigs[selectedChain];
      if (!chainConfig) {
        throw new Error(`Unsupported chain: ${selectedChain}`);
      }

      // Ensure we're on the correct network
      await ensureCorrectNetwork(chainConfig.chainId);

      // Create provider using MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Verify network one more time
      const network = await provider.getNetwork();
      console.log("Current network:", network.chainId.toString(), "Target:", chainConfig.chainId);
      
      if (network.chainId !== BigInt(chainConfig.chainId)) {
        throw new Error(`Network mismatch. Please switch to ${chainConfig.name}`);
      }

      // Create USDT contract instance (read-only, no signer needed)
      const usdtContract = new ethers.Contract(
        chainConfig.usdt,
        USDT_ABI,
        provider
      );

      console.log("USDT Contract Address:", chainConfig.usdt);

      // Get decimals and balance for the connected account
      const [decimals, balanceWei] = await Promise.all([
        usdtContract.decimals(),
        usdtContract.balanceOf(accountToCheck)
      ]);

      console.log("Raw balance (wei):", balanceWei.toString());
      console.log("Decimals:", decimals.toString());

      // Format balance
      const balanceFormatted = ethers.formatUnits(balanceWei, decimals);
      const balanceNumber = parseFloat(balanceFormatted);

      console.log("Formatted balance:", balanceFormatted, "USDT");

      setBalance({
        chainId: chainConfig.chainId,
        network: chainConfig.name,
        balance: balanceNumber,
        decimals: Number(decimals),
        success: true,
        raw: balanceWei.toString(),
        accountUsed: accountToCheck
      });

      // Clear any previous account mismatch error if balance loaded successfully
      if (connectedAccount.toLowerCase() === walletAddress.toLowerCase()) {
        setError(null);
      }

    } catch (err) {
      console.error("Error fetching balance:", err);
      setError(err.message);
      setBalance({ 
        balance: 0, 
        chainId: chainInfo?.id,
        success: false,
        error: err.message 
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch balance when modal opens
  useEffect(() => {
    if (open && walletAddress && selectedChain) {
      console.log("Modal opened, fetching balance...");
      fetchBalance();
    }
  }, [open, walletAddress, selectedChain]);

  // Listen for account or network changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      console.log("MetaMask accounts changed:", accounts);
      if (accounts.length === 0) {
        setError("MetaMask disconnected");
        setBalance({ balance: 0 });
      } else if (open && walletAddress && selectedChain) {
        fetchBalance();
      }
    };

    const handleChainChanged = (chainId) => {
      console.log("MetaMask network changed:", chainId);
      if (open && walletAddress && selectedChain) {
        fetchBalance();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [open, walletAddress, selectedChain]);

  // ✅ STEP 1: Call existing API to notify backend and set status to "RequestedDeposit"
  const notifyDepositRequest = async () => {
    try {
      console.log('Step 1: Calling existing /api/agreement/request/deposit endpoint...');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agreement/request/deposit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agreementId: agreement.agreementId }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to notify deposit request');
      }

      console.log('✅ Step 1 completed: Status set to RequestedDeposit');
      return result;
    } catch (error) {
      console.error('❌ Step 1 failed:', error);
      throw error;
    }
  };

  // Main deposit handler following the exact 6-step process
  const handleDeposit = async () => {
    if (!hasSufficientBalance || !chainInfo) {
      return;
    }

    setTransferLoading(true);
    setIsLocked(true);
    setTransferError(null);

    try {
      // ✅ STEP 1: Call existing backend API to set status to "RequestedDeposit"
      await notifyDepositRequest();

      // ✅ STEP 2: Modal is already locked via setIsLocked(true)
      console.log('✅ Step 2: Modal locked, processing transaction...');

      // ✅ STEP 3: Initiate the on-chain transfer using ethers.js
      console.log('✅ Step 3: Initiating blockchain transfer...');

      // Check MetaMask connection
      const connectedAccount = await checkMetaMaskConnection();
      
      const chainConfig = chainConfigs[selectedChain];
      if (!chainConfig) {
        throw new Error(`Unsupported chain: ${selectedChain}`);
      }

      // Ensure correct network
      await ensureCorrectNetwork(chainConfig.chainId);

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Verify we're on the correct network
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(chainConfig.chainId)) {
        throw new Error(`Please switch to ${chainConfig.name} network`);
      }

      // Create USDT contract instance
      const usdtContract = new ethers.Contract(
        chainConfig.usdt,
        USDT_ABI,
        signer
      );

      // Get token decimals
      const decimals = await usdtContract.decimals();
      console.log(`USDT decimals on ${chainConfig.name}:`, decimals);

      // Convert deposit amount to token units
      const amountInWei = ethers.parseUnits(depositAmount.toString(), decimals);
      console.log(`Transfer amount: ${depositAmount} USDT = ${amountInWei.toString()} wei`);

      // Final balance check
      const contractBalance = await usdtContract.balanceOf(walletAddress);
      const contractBalanceFormatted = ethers.formatUnits(contractBalance, decimals);
      console.log(`Contract balance: ${contractBalanceFormatted} USDT`);

      if (contractBalance < amountInWei) {
        throw new Error(`Insufficient balance. You have ${contractBalanceFormatted} USDT but need ${depositAmount} USDT`);
      }

      // Execute the transfer to the fixed Chatllat wallet
      console.log(`Transferring ${depositAmount} USDT to ${CHATLLAT_WALLET}...`);
      const tx = await usdtContract.transfer(CHATLLAT_WALLET, amountInWei);
      
      console.log("Transaction sent:", tx.hash);

      // ✅ STEP 4: Wait for transaction confirmation
      console.log('✅ Step 4: Waiting for transaction confirmation...');
      const receipt = await tx.wait();
      
      console.log("✅ Transaction confirmed:", receipt);

      // ✅ STEP 5: Let the existing webhook handle status update to "EscrowFunded"
      console.log('✅ Step 5: Transaction complete, webhook will handle status update...');
      
      // ✅ STEP 6: Call parent callback and close modal
      console.log('✅ Step 6: Notifying parent component...');
      if (onTransferFunds) {
        await onTransferFunds({
          chainId: chainInfo.id,
          amount: depositAmount,
          agreement: agreement,
          txHash: tx.hash,
          receipt: receipt,
          selectedChain: chainConfig,
          paymentMethod: chainInfo.label
        });
      }

      // Refresh balance after successful transfer
      await fetchBalance();

      // Close modal (success message handled by parent)
      setIsLocked(false);
      onClose();

    } catch (err) {
      console.error("❌ Transfer error:", err);
      
      // Handle specific error types
      if (err.code === 4001) {
        setTransferError("Transaction rejected by user");
      } else if (err.code === -32603) {
        setTransferError("Transaction failed. Please try again.");
      } else if (err.message.includes("insufficient funds")) {
        setTransferError("Insufficient ETH/BNB/MATIC for gas fees");
      } else if (err.message.includes("switch to")) {
        setTransferError(err.message);
      } else {
        setTransferError(err.message || "Transaction failed");
      }
      
      setIsLocked(false);
    } finally {
      setTransferLoading(false);
    }
  };

  // Rest of the component remains the same...
  const handleClose = () => {
    if (!isLocked) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatBalance = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K`;
    }
    return amount.toFixed(2);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0e1218] rounded-xl max-w-lg w-full h-fit border border-[#4b515a] shadow-2xl mt-25">
        {/* Header */}
        <div className="border-b border-[#4b515a] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Deposit Funds</h2>
            <button
              onClick={handleClose}
              disabled={isLocked}
              className={`text-gray-400 hover:text-white transition-colors ${
                isLocked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Processing Deposit</h3>
              <p className="text-gray-300 text-sm max-w-xs px-4">
                ✅ Backend notified<br/>
                ⏳ Confirming MetaMask transaction<br/>
                ⏳ Waiting for blockchain confirmation<br/>
                ⏳ Webhook will update status automatically<br/>
                <br/>
                <strong>Do not close this window.</strong>
              </p>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="space-y-4">
            {/* Agreement Details Section */}
            <div className="border border-[#4b515a] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">
                Agreement Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400 text-sm">Project:</span>
                  <span className="text-white font-medium text-right max-w-[300px] break-words">
                    {agreement?.projectTitle || "Untitled Project"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Chain:</span>
                  <div className="flex items-center gap-2">
                    {chainInfo && (
                      <>
                        <img
                          src={chainInfo.icon}
                          alt="USDT"
                          className="w-4 h-4"
                        />
                        <span
                          className={`text-white text-xs px-2 py-1 rounded-full font-medium ${chainInfo.badgeClass}`}
                        >
                          {chainInfo.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Deadline:</span>
                  <span className="text-white text-sm">
                    {formatDate(agreement?.deadline)}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="border border-[#4b515a] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">
                Your Balance
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Available:</span>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-white text-sm">Loading...</span>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-end">
                    <span className="text-red-400 text-sm">
                      {error.includes("Using connected account") ? "Account Mismatch" : "Error loading balance"}
                    </span>
                    <button 
                      onClick={fetchBalance}
                      className="text-blue-400 text-xs hover:underline mt-1"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <img src={chainInfo?.icon} alt="USDT" className="w-4 h-4" />
                    <span className="text-green-400 font-semibold">
                      {formatBalance(userBalance)} USDT
                    </span>
                  </div>
                )}
              </div>
              
              {/* Account info */}
              {balance?.accountUsed && (
                <div className="mt-2 text-xs text-gray-500">
                  Account: {balance.accountUsed.slice(0,6)}...{balance.accountUsed.slice(-4)}
                  {balance.accountUsed.toLowerCase() !== walletAddress.toLowerCase() && 
                    <span className="text-yellow-400 ml-1">(Different from expected)</span>
                  }
                </div>
              )}
              
              {/* Debug info - remove in production */}
              {balance && (
                <div className="mt-1 text-xs text-gray-500">
                  Network: {balance.network} | Chain ID: {balance.chainId}
                </div>
              )}
            </div>

            {/* Amount Section */}
            <div className="border border-[#4b515a] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">
                Deposit Amount
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={depositAmount}
                  disabled
                  className="w-full bg-gray-800 border border-[#4b515a] rounded-lg px-4 py-3 text-white font-semibold text-lg pr-20 cursor-not-allowed opacity-75"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <img src={chainInfo?.icon} alt="USDT" className="w-5 h-5" />
                  <span className="text-gray-400 font-medium">USDT</span>
                </div>
              </div>

              {/* Chain badge below input */}
              {chainInfo && (
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-white text-xs px-2 py-1 rounded-full font-medium ${chainInfo.badgeClass}`}
                  >
                    {chainInfo.label}
                  </span>
                  <span className="text-gray-500 text-xs">
                    Network:{" "}
                    {selectedChain.charAt(0).toUpperCase() +
                      selectedChain.slice(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Status Messages */}
            {!loading && !error && !hasSufficientBalance && (
              <div className="border border-red-600 bg-red-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-400 font-medium text-sm">
                    Insufficient Balance
                  </span>
                </div>
                <p className="text-red-300 text-sm">
                  You need {depositAmount.toFixed(2)} USDT but only have{" "}
                  {userBalance.toFixed(2)} USDT available.
                </p>
              </div>
            )}

            {/* Transfer Error Message */}
            {transferError && (
              <div className="border border-red-600 bg-red-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-400 font-medium text-sm">
                    Transaction Failed
                  </span>
                </div>
                <p className="text-red-300 text-sm">{transferError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#4b515a] p-6">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isLocked}
              className={`flex-1 px-4 py-3 text-gray-300 hover:text-white transition-colors border border-[#4b515a] rounded-lg hover:bg-gray-800 ${
                isLocked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={!hasSufficientBalance || loading || error || transferLoading || isLocked}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                hasSufficientBalance && !loading && !error && !transferLoading && !isLocked
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {transferLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Processing...
                </>
              ) : loading ? (
                "Loading..."
              ) : (
                `Deposit ${depositAmount} USDT`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
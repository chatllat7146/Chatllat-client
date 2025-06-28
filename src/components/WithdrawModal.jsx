// Updated WithdrawModal.jsx with robust network switching and error handling
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Updated ABI for the new smart contract
const SIGNATURE_WITHDRAWAL_ABI = [{ "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }, { "internalType": "address", "name": "_usdtToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ECDSAInvalidSignature", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "name": "ECDSAInvalidSignatureLength", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "ECDSAInvalidSignatureS", "type": "error" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }], "name": "getEthSignedMessageHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getMessageHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "recoverSigner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "verifySignature", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

const WithdrawModal = ({
  open,
  onClose,
  agreement,
  walletAddress,
  onWithdrawSuccess,
}) => {
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hasWithdrawn, setHasWithdrawn] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [withdrawalStatus, setWithdrawalStatus] = useState("Idle");

  // Multi-chain contract addresses
  const CONTRACT_ADDRESSES = {
    ethereum: '0xb8345698d79a9e3b641e70b17abb7c6631a9a76e',
    binance: '0x22f14c9013657f1a59d6d595e1cca1d11c7b30b5',
    bsc: '0x22f14c9013657f1a59d6d595e1cca1d11c7b30b5',
    polygon: '0xc7760da2450864ab22bf0d181c70e507e76a7366',
    avalanche: '0x1c46047afeb8cf5497ff87d4594c4420c1fdf400',
    arbitrum: '0x1c46047afeb8cf5497ff87d4594c4420c1fdf400',
    teeshat: '0x5452a78b39b50f53065ba9b74bfe8b64f6e16386',
  };

  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  // Chain mapping with labels and styling
  const chainMap = {
    ethereum: {
      id: 1,
      label: "USDT ERC20",
      badgeClass: "bg-green-700",
      icon: "/src/assets/icons/USDT ERC20.png",
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
      id: 43114,
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

  // Enhanced chain configurations with complete network details
  const chainConfigs = {
    ethereum: {
      chainId: 1,
      name: "Ethereum",
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 6,
      },
      rpcUrls: [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
        "https://ethereum.publicnode.com"
      ],
      blockExplorerUrls: ["https://etherscan.io"],
    },
    bsc: {
      chainId: 56,
      name: "BSC",
      chainName: "BNB Smart Chain",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed.binance.org",
        "https://rpc.ankr.com/bsc",
        "https://bsc.publicnode.com"
      ],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    polygon: {
      chainId: 137,
      name: "Polygon",
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: [
        "https://polygon-rpc.com",
        "https://rpc.ankr.com/polygon",
        "https://polygon.publicnode.com"
      ],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
    avalanche: {
      chainId: 43114,
      name: "Avalanche",
      chainName: "Avalanche Mainnet C-Chain",
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
      blockExplorerUrls: ['https://snowtrace.io'],
    },
    arbitrum: {
      chainId: 42161,
      name: "Arbitrum",
      chainName: "Arbitrum One",
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://arbiscan.io'],
    },
    teeshat: {
      chainId: 56,
      name: "BSC",
      chainName: "BNB Smart Chain",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed.binance.org",
        "https://rpc.ankr.com/bsc",
        "https://bsc.publicnode.com"
      ],
      blockExplorerUrls: ["https://bscscan.com"],
    }
  };

  // Get selected chain details
  const selectedChain = agreement?.amountDetails?.chain?.toLowerCase() || 'bsc';
  const chainInfo = chainMap[selectedChain];
  const chainConfig = chainConfigs[selectedChain];

  // Get dynamic contract address based on selected chain
  const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[selectedChain] || CONTRACT_ADDRESSES.bsc;

  // Get the final withdrawable amount
  const withdrawAmount = parseFloat(agreement?.withdrawableAmount || agreement?.amountDetails?.amount) || 0;

  useEffect(() => {
    if (open) {
      checkWalletConnection();
    }
  }, [open]);

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });

        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const getExplorerUrl = (txHash, chainName) => {
    const explorers = {
      'BSC': `https://bscscan.com/tx/${txHash}`,
      'Polygon': `https://polygonscan.com/tx/${txHash}`,
      'Ethereum': `https://etherscan.io/tx/${txHash}`
    };
    return explorers[chainName] || `#${txHash}`;
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Enhanced network switching function
  const switchToNetwork = async (targetChainConfig) => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const chainIdHex = `0x${targetChainConfig.chainId.toString(16)}`;
    console.log(`🔄 Attempting to switch to ${targetChainConfig.name} (Chain ID: ${targetChainConfig.chainId}, Hex: ${chainIdHex})`);

    try {
      // First, try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });

      console.log(`✅ Switch request sent for ${targetChainConfig.name}`);
      return true;

    } catch (switchError) {
      console.log(`⚠️ Switch failed with error:`, switchError);

      // Handle different error cases
      if (switchError.code === 4001) {
        // User rejected the request
        throw new Error(`Please approve the network switch to ${targetChainConfig.name} in MetaMask to continue.`);
      }
      else if (switchError.code === 4902 || switchError.message?.includes('Unrecognized chain ID') || switchError.message?.includes('does not match')) {
        // Network not added to MetaMask, try to add it
        console.log(`🔧 Network not found, attempting to add ${targetChainConfig.name}...`);

        try {
          // For Ethereum mainnet, we cannot add it via wallet_addEthereumChain
          if (targetChainConfig.chainId === 1) {
            throw new Error(`Please manually switch to ${targetChainConfig.name} network in MetaMask. It should already be available as a default network.`);
          }

          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: targetChainConfig.chainName,
              nativeCurrency: targetChainConfig.nativeCurrency,
              rpcUrls: targetChainConfig.rpcUrls,
              blockExplorerUrls: targetChainConfig.blockExplorerUrls,
            }],
          });

          console.log(`✅ Successfully added and switched to ${targetChainConfig.name}`);
          return true;

        } catch (addError) {
          console.error(`❌ Failed to add network:`, addError);
          if (addError.code === 4001) {
            throw new Error(`Please manually add and switch to ${targetChainConfig.name} network in MetaMask.`);
          }
          throw new Error(`Failed to add ${targetChainConfig.name} network. Please add it manually in MetaMask settings.`);
        }
      }
      else if (switchError.code === -32603) {
        // Internal JSON-RPC error - common with Ethereum mainnet
        if (targetChainConfig.chainId === 1) {
          throw new Error(`Please manually switch to ${targetChainConfig.name} network in MetaMask. This is required for Ethereum mainnet.`);
        }
        throw new Error(`MetaMask internal error. Please try switching to ${targetChainConfig.name} manually.`);
      }
      else {
        // Other unknown errors
        console.error(`❌ Unknown switch error:`, switchError);
        throw new Error(`Failed to switch to ${targetChainConfig.name}. Please switch manually in MetaMask and try again.`);
      }
    }
  };

  // Enhanced network verification with retry logic
  const verifyNetworkSwitch = async (targetChainId, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        // Progressive delay: 1s, 1.5s, 2s, 2.5s, 3s
        await new Promise(resolve => setTimeout(resolve, 1000 + (i * 500)));

        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();

        console.log(`🔍 Verification attempt ${i + 1}: Current chain ID: ${network.chainId}, Target: ${targetChainId}`);

        if (network.chainId === BigInt(targetChainId)) {
          console.log(`✅ Network switch verified successfully`);
          return true;
        }

        if (i === maxRetries - 1) {
          console.log(`❌ Network verification failed after ${maxRetries} attempts`);
        }
      } catch (error) {
        console.warn(`⚠️ Network verification attempt ${i + 1} failed:`, error.message);
      }
    }

    return false;
  };

  // Main withdrawal function with enhanced error handling
  const handleWithdraw = async () => {
    if (!chainInfo || !chainConfig) {
      setWithdrawError("Chain configuration not found");
      return;
    }

    setWithdrawLoading(true);
    setIsLocked(true);
    setWithdrawError(null);
    setWithdrawalStatus("🔄 Starting withdrawal process...");

    try {
      // STEP 1: Check MetaMask availability
      setWithdrawalStatus("🔌 Connecting wallet...");
      console.log('🔌 Step 1: Checking MetaMask availability...');
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      // STEP 2: Setup wallet connection
      console.log('👛 Step 2: Setting up wallet connection...');
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const connectedWallet = await signer.getAddress();

      console.log(`👤 Using connected wallet: ${connectedWallet}`);

      // STEP 3: Enhanced Network switching
      const network = await provider.getNetwork();
      console.log(`🌐 Current network: ${network.chainId}, Required: ${chainConfig.chainId}`);

      if (network.chainId !== BigInt(chainConfig.chainId)) {
        setWithdrawalStatus(`🔄 Switching to ${chainConfig.name} network...`);
        console.log(`🔄 Switching to ${chainConfig.name}...`);

        try {
          await switchToNetwork(chainConfig);

          // Verify the switch was successful
          setWithdrawalStatus(`🔍 Verifying network switch...`);
          const switchVerified = await verifyNetworkSwitch(chainConfig.chainId);

          if (!switchVerified) {
            throw new Error(`Network switch verification failed. Please manually switch to ${chainConfig.name} in MetaMask and try again.`);
          }

          console.log(`✅ Successfully switched and verified ${chainConfig.name} network`);

        } catch (networkError) {
          console.error('❌ Network switch error:', networkError);
          throw networkError; // Re-throw the detailed error message
        }
      }

      // STEP 4: Check withdrawal status
      if (hasWithdrawn) {
        throw new Error('You have already withdrawn USDT');
      }

      // STEP 5: Contract setup and verification with fresh provider
      setWithdrawalStatus("📜 Setting up smart contract...");
      console.log('📜 Step 5: Setting up signature withdrawal contract...');
      console.log(`🔗 Using contract address: ${CONTRACT_ADDRESS} on ${chainConfig.name}`);

      // Get fresh provider and signer after network switch
      const freshProvider = new ethers.BrowserProvider(window.ethereum);
      const freshSigner = await freshProvider.getSigner();
      const withdrawalContract = new ethers.Contract(CONTRACT_ADDRESS, SIGNATURE_WITHDRAWAL_ABI, freshSigner);

      // Verify contract exists
      const code = await freshProvider.getCode(CONTRACT_ADDRESS);
      if (code === "0x") {
        throw new Error(`No contract found at ${CONTRACT_ADDRESS} on ${chainConfig.name}. Please contact support.`);
      }

      console.log('✅ Contract verification passed');

      // STEP 6: Get signature from backend
      setWithdrawalStatus("📡 Fetching signature from backend...");
      console.log('🔐 Step 6: Getting withdrawal signature from backend...');

      const response = await fetch(`${BACKEND_URL}/api/withdraw/get-signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: connectedWallet,
          agreementId: agreement.agreementId,
          // chain: selectedChain // Include chain information
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get signature from backend');
      }

      const data = await response.json()
      const { amount, signature } = data.data;
      console.log(`✅ Retrieved signature for amount: ${ethers.formatUnits(amount, 6)} USDT`);

      // STEP 7: Check contract USDT balance
      setWithdrawalStatus("💰 Verifying contract balance...");
      console.log('💰 Step 7: Checking contract balance...');
      try {
        const usdtAddress = await withdrawalContract.usdtToken();
        const usdtContract = new ethers.Contract(usdtAddress, [
          "function balanceOf(address account) external view returns (uint256)"
        ], freshProvider);

        const contractBalance = await usdtContract.balanceOf(CONTRACT_ADDRESS);
        const balanceFormatted = ethers.formatUnits(contractBalance, 6);
        const requiredAmount = ethers.formatUnits(amount, 6);

        console.log(`📊 Contract USDT balance: ${balanceFormatted} USDT`);
        console.log(`📊 Required amount: ${requiredAmount} USDT`);

      } catch (balanceError) {
        if (balanceError.message.includes('Insufficient contract balance')) {
          throw balanceError;
        }
        console.warn('⚠️ Could not check contract balance:', balanceError.message);
      }

      // STEP 8: Gas estimation
      setWithdrawalStatus("⛽ Estimating gas fees...");
      console.log('⛽ Step 8: Estimating gas...');
      let gasEstimate;
      try {
        gasEstimate = await withdrawalContract.withdraw.estimateGas(amount, signature);
        console.log('⛽ Estimated gas:', gasEstimate.toString());

        // Check user's balance for gas
        const userBalance = await freshProvider.getBalance(connectedWallet);
        const feeData = await freshProvider.getFeeData();
        const estimatedGasCost = gasEstimate * (feeData.gasPrice || feeData.maxFeePerGas || BigInt("20000000000"));

        console.log('👛 User balance:', ethers.formatEther(userBalance));
        console.log('⛽ Estimated gas cost:', ethers.formatEther(estimatedGasCost));

        if (userBalance < estimatedGasCost) {
          throw new Error(`Insufficient ${chainConfig.name === 'BSC' ? 'BNB' : chainConfig.name === 'Polygon' ? 'MATIC' : 'ETH'} for gas fees. Need approximately ${ethers.formatEther(estimatedGasCost)}.`);
        }

        // Add 30% buffer to gas estimate
        gasEstimate = gasEstimate * 130n / 100n;

      } catch (gasError) {
        console.log('⚠️ Gas estimation failed, using default gas limit:', gasError.message);
        gasEstimate = BigInt(350000);
      }

      // STEP 9: Execute signature-based withdrawal transaction
      setWithdrawalStatus("🚀 Sending withdrawal transaction...");
      console.log('🚀 Step 9: Executing signature-based withdrawal...');
      console.log(`📝 Calling withdraw(${ethers.formatUnits(amount, 6)} USDT, signature) on contract ${CONTRACT_ADDRESS}`);

      const tx = await withdrawalContract.withdraw(amount, signature, {
        gasLimit: gasEstimate
      });

      console.log(`📝 Transaction sent: ${tx.hash}`);
      console.log(`🌐 View on explorer: ${getExplorerUrl(tx.hash, chainConfig.name)}`);

      // STEP 10: Wait for confirmation
      setWithdrawalStatus("⏳ Waiting for blockchain confirmation...");
      console.log('⏳ Step 10: Waiting for blockchain confirmation...');

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error('Transaction failed during execution');
      }

      console.log(`✅ Withdrawal confirmed! Block: ${receipt.blockNumber}`);
      console.log(`⛽ Gas used: ${receipt.gasUsed.toString()}`);

      const formattedAmount = ethers.formatUnits(amount, 6);
      console.log(`🎉 Successfully withdrew ${formattedAmount} USDT!`);

      setWithdrawalStatus("✅ Withdrawal successful!");

      // STEP 11: Success callback
      if (onWithdrawSuccess) {
        await onWithdrawSuccess({
          txHash: tx.hash,
          amount: parseFloat(formattedAmount),
          agreementId: agreement.agreementId,
          receipt: receipt
        });
      }

      // Update local state
      setHasWithdrawn(true);

      // Close modal after a short delay to show success message
      setTimeout(() => {
        setIsLocked(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error("❌ Withdrawal error:", err);

      // Enhanced error handling with more specific messages
      let errorMessage = `❌ Error: ${err.message}`;

      if (err.code === 4001) {
        errorMessage = "❌ Transaction cancelled by user";
      } else if (err.code === -32603 || err.code === -32000) {
        if (err.message.includes("execution reverted")) {
          errorMessage = "❌ Smart contract rejected the transaction. You may have already withdrawn, or the contract may not have sufficient balance.";
        } else {
          errorMessage = "❌ Network error. Please try again.";
        }
      } else if (err.message.includes("insufficient funds for intrinsic transaction cost")) {
        errorMessage = `❌ Insufficient ${chainConfig?.name === 'BSC' ? 'BNB' : chainConfig?.name === 'Polygon' ? 'MATIC' : 'ETH'} for gas fees`;
      } else if (err.message.includes("manually switch") || err.message.includes("Please approve") || err.message.includes("Please manually")) {
        errorMessage = `❌ ${err.message}`; // Use the detailed switch error message
      } else if (err.message.includes("already withdrawn")) {
        errorMessage = "❌ You have already withdrawn funds for this agreement.";
      } else if (err.message.includes("Invalid signature")) {
        errorMessage = "❌ Invalid signature - please try again";
      } else if (err.message.includes("Transfer failed")) {
        errorMessage = "❌ Transfer failed - admin may need to approve more USDT";
      } else if (err.message.includes("Failed to get signature")) {
        errorMessage = "❌ Failed to get withdrawal signature from backend. Please try again.";
      } else if (err.message.includes("Insufficient contract balance")) {
        errorMessage = `❌ ${err.message}`;
      } else if (err.message.includes("not found") || err.message.includes("No contract")) {
        errorMessage = "❌ Smart contract not found. Please contact support.";
      } else if (err.message.includes("timeout")) {
        errorMessage = "❌ Transaction confirmation timeout. Please check the blockchain explorer.";
      } else if (err.message.includes("Network switch verification failed")) {
        errorMessage = `❌ ${err.message}`;
      } else if (err.message) {
        errorMessage = err.message.startsWith('❌') ? err.message : `❌ Error: ${err.message}`;
      }

      setWithdrawError(errorMessage);
      setWithdrawalStatus(errorMessage);
      setIsLocked(false);
    } finally {
      setWithdrawLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLocked) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0e1218] rounded-xl max-w-lg w-full h-fit border border-[#4b515a] shadow-2xl mt-25">
        {/* Header */}
        <div className="border-b border-[#4b515a] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Withdraw Funds</h2>
            <button
              onClick={handleClose}
              disabled={isLocked}
              className={`text-gray-400 hover:text-white transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Processing Withdrawal</h3>
              <p className="text-gray-300 text-sm max-w-xs px-4 mb-4">
                {withdrawalStatus}
              </p>
              <p className="text-gray-400 text-xs max-w-xs px-4">
                <strong>You will pay gas fees for this transaction.</strong>
              </p>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="space-y-4">
            {/* Agreement Details Section */}
            <div className="border border-[#4b515a] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">Agreement Details</h3>
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
                        <img src={chainInfo.icon} alt="USDT" className="w-4 h-4" />
                        <span className={`text-white text-xs px-2 py-1 rounded-full font-medium ${chainInfo.badgeClass}`}>
                          {chainInfo.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-medium">
                      {agreement?.status || "Ready for Withdrawal"}
                    </span>
                    {connectedAccount && (
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${hasWithdrawn ? 'bg-orange-800 text-orange-200' : 'bg-blue-800 text-blue-200'
                          }`}>
                          {hasWithdrawn ? '✅ Withdrawn' : '❌ Pending'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Contract:</span>
                  <span className="text-blue-400 text-xs font-mono">
                    {formatAddress(CONTRACT_ADDRESS)}
                  </span>
                </div>

                {connectedAccount && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Wallet:</span>
                    <span className="text-blue-400 text-xs font-mono">
                      {formatAddress(connectedAccount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Withdrawal Amount Section */}
            <div className="border border-[#4b515a] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">Your Withdrawable Amount</h3>
              <div className="relative">
                <input
                  type="text"
                  value={withdrawAmount.toFixed(2)}
                  disabled
                  className="w-full bg-gray-800 border border-[#4b515a] rounded-lg px-4 py-3 text-white font-semibold text-lg pr-20 cursor-not-allowed opacity-75"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <img src={chainInfo?.icon} alt="USDT" className="w-5 h-5" />
                  <span className="text-gray-400 font-medium">USDT</span>
                </div>
              </div>

              {chainInfo && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-white text-xs px-2 py-1 rounded-full font-medium ${chainInfo.badgeClass}`}>
                    {chainInfo.label}
                  </span>
                  <span className="text-gray-500 text-xs">
                    Network: {selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)}
                  </span>
                </div>
              )}

              <div className="mt-2 text-xs text-gray-400">
                💡 Amount will be fetched from backend during withdrawal process.
              </div>
            </div>

            {/* Network Switch Helper */}
            {chainConfig && (
              <div className="border border-blue-600 bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-400 font-medium text-sm">Network Information</span>
                </div>
                <p className="text-blue-300 text-sm mb-2">
                  This withdrawal requires the <strong>{chainConfig.name}</strong> network.
                  {chainConfig.chainId === 1 && " If network switching fails, please manually switch to Ethereum Mainnet in MetaMask."}
                </p>
                <div className="text-xs text-blue-200 space-y-1">
                  <div>• Network: {chainConfig.chainName}</div>
                  <div>• Chain ID: {chainConfig.chainId}</div>
                  <div>• Gas Token: {chainConfig.nativeCurrency.symbol}</div>
                </div>
              </div>
            )}

            {/* Signature-based Withdrawal Notice */}
            <div className="border border-purple-600 bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-purple-400 font-medium text-sm">Signature-based Withdrawal</span>
              </div>
              <p className="text-purple-300 text-sm">
                This withdrawal uses cryptographic signatures for enhanced security. The exact amount and signature
                will be fetched from the backend. You will pay a small gas fee
                ({chainConfig?.nativeCurrency?.symbol || 'ETH'})
                to process this withdrawal. Each address can only withdraw once.
              </p>
            </div>

            {/* Status Message */}
            {withdrawalStatus !== "Idle" && (
              <div className={`border rounded-lg p-4 ${withdrawalStatus.includes('✅')
                ? 'border-green-600 bg-green-900/20'
                : withdrawalStatus.includes('❌')
                  ? 'border-red-600 bg-red-900/20'
                  : 'border-blue-600 bg-blue-900/20'
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className={`w-5 h-5 ${withdrawalStatus.includes('✅')
                    ? 'text-green-400'
                    : withdrawalStatus.includes('❌')
                      ? 'text-red-400'
                      : 'text-blue-400'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-medium text-sm ${withdrawalStatus.includes('✅')
                    ? 'text-green-400'
                    : withdrawalStatus.includes('❌')
                      ? 'text-red-400'
                      : 'text-blue-400'
                    }`}>
                    {withdrawalStatus.includes('✅') ? 'Success' : withdrawalStatus.includes('❌') ? 'Error' : 'Status'}
                  </span>
                </div>
                <p className={`text-sm ${withdrawalStatus.includes('✅')
                  ? 'text-green-300'
                  : withdrawalStatus.includes('❌')
                    ? 'text-red-300'
                    : 'text-blue-300'
                  }`}>{withdrawalStatus}</p>
              </div>
            )}

            {/* Error Message */}
            {withdrawError && withdrawError !== withdrawalStatus && (
              <div className="border border-red-600 bg-red-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-400 font-medium text-sm">Withdrawal Failed</span>
                </div>
                <p className="text-red-300 text-sm">{withdrawError}</p>
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
              className={`flex-1 px-4 py-3 text-gray-300 hover:text-white transition-colors border border-[#4b515a] rounded-lg hover:bg-gray-800 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={withdrawLoading || isLocked || hasWithdrawn}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${!withdrawLoading && !isLocked && !hasWithdrawn
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
            >
              {withdrawLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Processing...
                </>
              ) : hasWithdrawn ? (
                "Already Withdrawn"
              ) : (
                "Withdraw USDT"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
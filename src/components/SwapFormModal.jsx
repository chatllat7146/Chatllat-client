import React, { useState, useEffect } from 'react';

// ✅ CORRECTED ABI - MATCHES YOUR ACTUAL SMART CONTRACT
const SWAP_CONTRACT_ABI = [{ "inputs": [{ "internalType": "address", "name": "_usdt", "type": "address" }, { "internalType": "address", "name": "_clat", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "usdtAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "clatAmount", "type": "uint256" }], "name": "Swapped", "type": "event" }, { "inputs": [], "name": "clatToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "usdtAmount", "type": "uint256" }], "name": "swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "clatAmount", "type": "uint256" }], "name": "swapReverse", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newRate", "type": "uint256" }], "name": "updateRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

// ✅ ERC20 ABI
const ERC20_ABI = [
  { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }
];

// ✅ CONTRACT CONFIGURATION - UPDATE WITH YOUR ACTUAL CONTRACT ADDRESS
const SWAP_CONTRACT_ADDRESS = '0x929b15c75bdd54572a3b697e16bc91684aeb2ef0'; // Replace with your deployed contract address

// ✅ ENHANCED BSC RPC ENDPOINTS
const BSC_RPC_ENDPOINTS = [
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed2.defibit.io'
];

const SwapFormModal = ({ isOpen = true, onClose, walletAddress, isEmbedded = false }) => {
  // ✅ STATE MANAGEMENT
  const [swapDirection, setSwapDirection] = useState('USDT_TO_CLAT');
  const [swapAmount, setSwapAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Contract data
  const [contractBalances, setContractBalances] = useState({ usdt: '0', clat: '0' });
  const [userBalances, setUserBalances] = useState({ usdt: '0', clat: '0' });
  const [tokenDecimals, setTokenDecimals] = useState({ usdt: 6, clat: 18 });
  const [tokenAddresses, setTokenAddresses] = useState({ usdt: '', clat: '' });
  const [swapRate, setSwapRate] = useState('1'); // New: swap rate from contract

  // Owner controls
  const [isOwner, setIsOwner] = useState(false);
  const [newRate, setNewRate] = useState('');
  const [withdrawTokenAddress, setWithdrawTokenAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // ✅ ENHANCED WEB3 UTILITIES WITH RETRY LOGIC
  const getWeb3 = () => {
    if (typeof window.Web3 !== 'undefined' && window.ethereum) {
      return new window.Web3(window.ethereum);
    }
    return null;
  };

  const getContract = (address, abi) => {
    const web3 = getWeb3();
    if (!web3) return null;
    return new web3.eth.Contract(abi, address);
  };

  // ✅ ENHANCED UTILITY FUNCTIONS
  const toWei = (value, decimals) => {
    try {
      if (!value || value === '0') return '0';
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) return '0';

      const multiplier = Math.pow(10, decimals);
      const result = Math.floor(amount * multiplier);
      return result.toString();
    } catch (error) {
      console.error('Error in toWei:', error);
      return '0';
    }
  };

  const fromWei = (value, decimals) => {
    try {
      if (!value || value === '0') return '0.000000';
      const amount = parseFloat(value);
      const divisor = Math.pow(10, decimals);
      const result = (amount / divisor).toFixed(6);
      return result;
    } catch (error) {
      console.error('Error in fromWei:', error);
      return '0.000000';
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  // ✅ ENHANCED RETRY LOGIC WITH RPC ERROR HANDLING
  const retryOperation = async (operation, maxRetries = 5, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        console.warn(`Operation failed (attempt ${i + 1}/${maxRetries}):`, error.message);

        // For RPC errors, try switching to a different endpoint or wait longer
        if (error.message.includes('Internal JSON-RPC error') ||
          error.message.includes('network error') ||
          error.message.includes('timeout')) {
          console.log(`🔄 RPC error detected, increasing retry delay...`);
          await new Promise(resolve => setTimeout(resolve, delay * (i + 2))); // Exponential backoff
        } else if (error.message.includes('execution reverted') ||
          error.message.includes('revert')) {
          // Don't retry revert errors - they won't succeed
          console.error('🚫 Transaction would revert, not retrying');
          throw error;
        } else {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }

        if (i === maxRetries - 1) throw error;
      }
    }
  };

  // ✅ ENHANCED METAMASK CONNECTION CHECK
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

  // ✅ ENHANCED BSC NETWORK MANAGEMENT
  const ensureBSCNetwork = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      const currentChainIdDecimal = parseInt(currentChainId, 16);
      console.log('🔗 Current chain ID check:', currentChainId, '(decimal:', currentChainIdDecimal, ')');

      if (currentChainIdDecimal !== 56) {
        setStatus('Switching to BSC network...');
        console.log('🔄 Switching from chain', currentChainIdDecimal, 'to BSC (56)');

        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });

          console.log('✅ Network switch requested, waiting...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (switchError) {
          console.log('⚠️ Switch failed, attempting to add network:', switchError.code);
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x38',
                chainName: 'BNB Smart Chain Mainnet',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: BSC_RPC_ENDPOINTS,
                blockExplorerUrls: ['https://bscscan.com']
              }]
            });
            console.log('✅ BSC network added successfully');
          } else {
            throw new Error('Please manually switch to BSC network in MetaMask');
          }
        }
      } else {
        console.log('✅ Already on BSC network');
      }
    } catch (error) {
      console.error("Network management failed:", error);
      throw error;
    }
  };

  // ✅ ENHANCED GAS ESTIMATION WITH RETRY AND FALLBACK
  const estimateGasWithBuffer = async (contract, method, params, from, buffer = 1.2) => {
    // Try multiple times with different approaches
    const attempts = [
      // Attempt 1: Normal gas estimation
      async () => {
        const gasEstimate = await contract.methods[method](...params).estimateGas({ from });
        return Math.floor(gasEstimate * buffer);
      },
      // Attempt 2: Try with higher gas limit for estimation
      async () => {
        const gasEstimate = await contract.methods[method](...params).estimateGas({
          from,
          gas: 5000000 // Higher gas limit for estimation
        });
        return Math.floor(gasEstimate * buffer);
      },
      // Attempt 3: Use call to simulate, then estimate based on success
      async () => {
        // First check if the call would succeed
        await contract.methods[method](...params).call({ from });
        // If it succeeds, return a reasonable gas estimate
        if (method.includes('approve')) return 100000;
        if (method.includes('swap')) return 400000;
        return 300000;
      }
    ];

    for (let i = 0; i < attempts.length; i++) {
      try {
        console.log(`⛽ Gas estimation attempt ${i + 1}/${attempts.length} for ${method}...`);
        const gas = await attempts[i]();
        console.log(`✅ Gas estimation successful: ${gas}`);
        return gas;
      } catch (error) {
        console.warn(`❌ Gas estimation attempt ${i + 1} failed:`, error.message);

        // Decode and check for specific revert reasons
        const decodedError = decodeErrorMessage(error);
        console.log(`🔍 Decoded error: ${decodedError}`);

        // If this is the last attempt, throw a more descriptive error
        if (i === attempts.length - 1) {
          // Check if it's a revert error with specific reason
          if (error.message.includes('revert') || error.message.includes('execution reverted')) {
            if (decodedError.includes('Not enough CLAT tokens in contract')) {
              throw new Error(`❌ Contract Error: Not enough CLAT tokens in contract. Please contact the owner to fund the contract with CLAT tokens.`);
            } else if (decodedError.includes('Not enough USDT tokens in contract')) {
              throw new Error(`❌ Contract Error: Not enough USDT tokens in contract. Please contact the owner to fund the contract with USDT tokens.`);
            } else {
              throw new Error(`❌ Transaction would fail: ${decodedError}`);
            }
          } else if (error.message.includes('Internal JSON-RPC error')) {
            console.warn('RPC error during gas estimation, using fallback gas values');
            // Return fallback values for RPC errors
            if (method.includes('approve')) return 120000;
            if (method.includes('swap')) return 450000;
            return 350000;
          } else {
            throw new Error(`❌ Gas estimation failed: ${decodedError}`);
          }
        }

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // ✅ ERROR MESSAGE DECODER (decodes hex revert reasons)
  const decodeErrorMessage = (error) => {
    try {
      // Check if there's a data field with hex-encoded revert reason
      if (error.data && error.data.data) {
        const hexData = error.data.data;
        // Remove '0x08c379a0' prefix (Error(string) signature) and decode
        if (hexData.startsWith('0x08c379a0')) {
          const reason = hexData.slice(138); // Remove signature and length
          // Browser-compatible hex to string conversion
          let decoded = '';
          for (let i = 0; i < reason.length; i += 2) {
            const hex = reason.substr(i, 2);
            if (hex !== '00') { // Skip null bytes
              decoded += String.fromCharCode(parseInt(hex, 16));
            }
          }
          return decoded;
        }
      }

      // Fallback to checking message field
      if (error.message && error.message.includes('execution reverted:')) {
        const match = error.message.match(/execution reverted: (.+)/);
        if (match) return match[1];
      }

      return error.message || 'Unknown error';
    } catch (decodeError) {
      console.warn('Failed to decode error message:', decodeError);
      return error.message || 'Unknown error';
    }
  };
  const validateSwapConditions = async (swapDirection, amount, swapContract) => {
    console.log('🔍 Validating swap conditions...');

    try {
      const amountWei = toWei(amount,
        swapDirection === 'USDT_TO_CLAT' ? tokenDecimals.usdt : tokenDecimals.clat
      );

      // Get current contract balances
      const usdtContract = getContract(tokenAddresses.usdt, ERC20_ABI);
      const clatContract = getContract(tokenAddresses.clat, ERC20_ABI);

      const contractUsdtBalance = await usdtContract.methods.balanceOf(SWAP_CONTRACT_ADDRESS).call();
      const contractClatBalance = await clatContract.methods.balanceOf(SWAP_CONTRACT_ADDRESS).call();

      console.log('📊 Contract balances check:', {
        usdt: fromWei(contractUsdtBalance, tokenDecimals.usdt),
        clat: fromWei(contractClatBalance, tokenDecimals.clat)
      });

      if (swapDirection === 'USDT_TO_CLAT') {
        // Check if contract has enough CLAT tokens
        const rate = parseFloat(swapRate);
        const requiredClatAmount = parseFloat(amount) * rate;
        const requiredClatWei = toWei(requiredClatAmount.toString(), tokenDecimals.clat);

        console.log('🔍 USDT→CLAT validation:', {
          inputAmount: amount,
          rate: rate,
          requiredClat: requiredClatAmount,
          availableClat: fromWei(contractClatBalance, tokenDecimals.clat),
          requiredClatWei: requiredClatWei,
          contractClatBalance: contractClatBalance
        });

        if (parseFloat(contractClatBalance) < parseFloat(requiredClatWei)) {
          const availableClat = fromWei(contractClatBalance, tokenDecimals.clat);
          throw new Error(`❌ Insufficient Contract Liquidity!\n\n` +
            `Required: ${requiredClatAmount.toFixed(6)} CLAT\n` +
            `Available: ${availableClat} CLAT\n` +
            `Shortfall: ${(requiredClatAmount - parseFloat(availableClat)).toFixed(6)} CLAT\n\n` +
            `⚠️ The contract owner needs to deposit more CLAT tokens before this swap can be completed.`);
        }
      } else {
        // Check if contract has enough USDT tokens  
        const rate = parseFloat(swapRate);
        const requiredUsdtAmount = parseFloat(amount) / rate;
        const requiredUsdtWei = toWei(requiredUsdtAmount.toString(), tokenDecimals.usdt);

        console.log('🔍 CLAT→USDT validation:', {
          inputAmount: amount,
          rate: rate,
          requiredUsdt: requiredUsdtAmount,
          availableUsdt: fromWei(contractUsdtBalance, tokenDecimals.usdt),
          requiredUsdtWei: requiredUsdtWei,
          contractUsdtBalance: contractUsdtBalance
        });

        if (parseFloat(contractUsdtBalance) < parseFloat(requiredUsdtWei)) {
          const availableUsdt = fromWei(contractUsdtBalance, tokenDecimals.usdt);
          throw new Error(`❌ Insufficient Contract Liquidity!\n\n` +
            `Required: ${requiredUsdtAmount.toFixed(6)} USDT\n` +
            `Available: ${availableUsdt} USDT\n` +
            `Shortfall: ${(requiredUsdtAmount - parseFloat(availableUsdt)).toFixed(6)} USDT\n\n` +
            `⚠️ The contract owner needs to deposit more USDT tokens before this swap can be completed.`);
        }
      }

      // Test the swap call (dry run)
      console.log('🧪 Testing swap call (dry run)...');
      try {
        if (swapDirection === 'USDT_TO_CLAT') {
          await swapContract.methods.swap(amountWei).call({ from: walletAddress });
        } else {
          await swapContract.methods.swapReverse(amountWei).call({ from: walletAddress });
        }
        console.log('✅ Dry run successful');
      } catch (dryRunError) {
        const decodedError = decodeErrorMessage(dryRunError);
        console.error('❌ Dry run failed:', decodedError);
        throw new Error(`❌ Swap Simulation Failed: ${decodedError}`);
      }

      console.log('✅ Swap validation passed');
      return true;

    } catch (error) {
      console.error('❌ Swap validation failed:', error);
      throw error;
    }
  };
  const waitForTransaction = async (txHash, maxWaitTime = 300000) => { // 5 minutes
    const web3 = getWeb3();
    if (!web3) throw new Error('Web3 not available');

    const startTime = Date.now();
    let receipt = null;

    while (!receipt && (Date.now() - startTime) < maxWaitTime) {
      try {
        receipt = await web3.eth.getTransactionReceipt(txHash);
        if (receipt) {
          if (receipt.status === false) {
            throw new Error('Transaction failed');
          }
          return receipt;
        }
      } catch (error) {
        if (error.message.includes('Transaction failed')) {
          throw error;
        }
        // Continue waiting for other errors
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    if (!receipt) {
      throw new Error('Transaction timeout - please check BSC explorer');
    }

    return receipt;
  };

  // ✅ CORRECTED CONTRACT DATA LOADING
  const loadContractData = async () => {
    console.log('🔄 Starting loadContractData...');
    console.log('📋 Wallet Address:', walletAddress);

    if (!walletAddress) {
      console.warn('❌ No wallet address provided');
      setStatus('Please connect your wallet');
      return;
    }

    try {
      setStatus('Loading contract data...');
      console.log('🌐 Checking Web3 connection...');

      const web3 = getWeb3();
      if (!web3) {
        throw new Error('Web3 not available');
      }

      // Check network first
      console.log('🔗 Checking network...');
      const chainId = await web3.eth.getChainId();
      const chainIdNumber = Number(chainId); // ✅ Convert BigInt to Number
      console.log('📍 Current Chain ID:', chainId, '(as number:', chainIdNumber, ')');

      if (chainIdNumber !== 56) {
        setStatus(`Wrong network detected (Chain ID: ${chainIdNumber}). Please switch to BSC Mainnet (Chain ID: 56)`);
        console.warn('❌ Not on BSC network, current chain:', chainIdNumber);
        return;
      }

      console.log('📋 Initializing swap contract...');
      const swapContract = getContract(SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI);
      if (!swapContract) {
        throw new Error('Failed to initialize swap contract');
      }

      // Step 1: Get token addresses (CORRECTED FUNCTION CALLS)
      console.log('📋 Step 1: Getting token addresses...');
      setStatus('Getting token addresses...');

      let usdtAddress, clatAddress;
      try {
        usdtAddress = await retryOperation(() => {
          console.log('🔄 Calling usdtToken()...');
          return swapContract.methods.usdtToken().call();
        });
        console.log('✅ USDT Address:', usdtAddress);

        clatAddress = await retryOperation(() => {
          console.log('🔄 Calling clatToken()...');
          return swapContract.methods.clatToken().call();
        });
        console.log('✅ CLAT Address:', clatAddress);

        setTokenAddresses({ usdt: usdtAddress, clat: clatAddress });
      } catch (error) {
        console.error('❌ Failed to get token addresses:', error);
        throw new Error(`Failed to get token addresses: ${error.message}`);
      }

      // Step 2: Get swap rate
      console.log('📋 Step 2: Getting swap rate...');
      setStatus('Getting swap rate...');

      try {
        const rate = await retryOperation(() => {
          console.log('🔄 Calling rate()...');
          return swapContract.methods.rate().call();
        });
        console.log('✅ Swap Rate:', rate);
        setSwapRate(rate);
      } catch (error) {
        console.error('❌ Failed to get swap rate:', error);
        setSwapRate('1'); // Default fallback
      }

      // Step 3: Initialize token contracts and get decimals
      console.log('📋 Step 3: Initializing token contracts...');
      setStatus('Initializing token contracts...');

      const usdtContract = getContract(usdtAddress, ERC20_ABI);
      const clatContract = getContract(clatAddress, ERC20_ABI);

      if (!usdtContract || !clatContract) {
        throw new Error('Failed to initialize token contracts');
      }

      // Get token decimals
      try {
        const usdtDecimals = await retryOperation(() =>
          usdtContract.methods.decimals().call()
        );
        const clatDecimals = await retryOperation(() =>
          clatContract.methods.decimals().call()
        );

        console.log('📊 USDT Decimals:', usdtDecimals);
        console.log('📊 CLAT Decimals:', clatDecimals);

        setTokenDecimals({
          usdt: parseInt(usdtDecimals),
          clat: parseInt(clatDecimals)
        });
      } catch (error) {
        console.error('❌ Failed to get decimals:', error);
        // Use defaults
        setTokenDecimals({ usdt: 6, clat: 18 });
      }

      // Step 4: Get contract balances
      console.log('📋 Step 4: Getting contract balances...');
      setStatus('Getting contract balances...');

      try {
        const contractUsdtBalance = await retryOperation(() =>
          usdtContract.methods.balanceOf(SWAP_CONTRACT_ADDRESS).call()
        );
        const contractClatBalance = await retryOperation(() =>
          clatContract.methods.balanceOf(SWAP_CONTRACT_ADDRESS).call()
        );

        console.log('✅ Contract Balances Raw:', { usdt: contractUsdtBalance, clat: contractClatBalance });

        const formattedUsdtBalance = fromWei(contractUsdtBalance, parseInt(tokenDecimals.usdt || 6));
        const formattedClatBalance = fromWei(contractClatBalance, parseInt(tokenDecimals.clat || 18));

        console.log('💰 Contract USDT Balance:', formattedUsdtBalance);
        console.log('💰 Contract CLAT Balance:', formattedClatBalance);

        setContractBalances({
          usdt: formattedUsdtBalance,
          clat: formattedClatBalance
        });
      } catch (error) {
        console.error('❌ Failed to get contract balances:', error);
        console.warn('⚠️ Continuing without contract balances...');
        setContractBalances({ usdt: '0', clat: '0' });
      }

      // Step 5: Get user balances
      console.log('📋 Step 5: Getting user balances...');
      setStatus('Loading your token balances...');

      try {
        console.log('🔄 Getting USDT balance for:', walletAddress);
        const userUsdtBalance = await retryOperation(() =>
          usdtContract.methods.balanceOf(walletAddress).call()
        );
        console.log('✅ Raw USDT Balance:', userUsdtBalance);

        console.log('🔄 Getting CLAT balance for:', walletAddress);
        const userClatBalance = await retryOperation(() =>
          clatContract.methods.balanceOf(walletAddress).call()
        );
        console.log('✅ Raw CLAT Balance:', userClatBalance);

        const formattedUsdtBalance = fromWei(userUsdtBalance, parseInt(tokenDecimals.usdt || 6));
        const formattedClatBalance = fromWei(userClatBalance, parseInt(tokenDecimals.clat || 18));

        console.log('💰 Formatted USDT Balance:', formattedUsdtBalance);
        console.log('💰 Formatted CLAT Balance:', formattedClatBalance);

        setUserBalances({
          usdt: formattedUsdtBalance,
          clat: formattedClatBalance
        });
      } catch (error) {
        console.error('❌ Failed to get user balances:', error);
        console.warn('⚠️ Setting balances to 0...');
        setUserBalances({ usdt: '0.000000', clat: '0.000000' });
        setStatus(`Warning: Could not load balances - ${error.message}`);
      }

      // Step 6: Check owner status
      console.log('📋 Step 6: Checking owner status...');

      try {
        const owner = await retryOperation(() =>
          swapContract.methods.owner().call()
        );

        console.log('👑 Owner:', owner);
        console.log('👤 Current User:', walletAddress);

        const isUserOwner = owner.toLowerCase() === walletAddress.toLowerCase();

        console.log('🔐 Is Owner:', isUserOwner);

        setIsOwner(isUserOwner);
      } catch (error) {
        console.error('❌ Failed to check owner status:', error);
        setIsOwner(false);
      }

      console.log('✅ Contract data loading completed successfully');
      setStatus('Ready to swap');

    } catch (error) {
      console.error('❌ Error loading contract data:', error);
      setStatus(`Failed to load contract data: ${error.message}`);

      // Provide specific guidance based on error type
      if (error.message.includes('network')) {
        setStatus('Please switch to BSC network and try again');
      } else if (error.message.includes('Web3')) {
        setStatus('Please connect your MetaMask wallet');
      } else if (error.message.includes('token addresses')) {
        setStatus('Contract error - invalid token addresses');
      } else {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  // ✅ CORRECTED SWAP EXECUTION (FIXED FUNCTION NAMES)
  const executeSwap = async () => {
    if (!walletAddress || !swapAmount || parseFloat(swapAmount) <= 0) {
      setStatus('Please enter a valid amount');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Checking MetaMask connection...');

      const connectedAccount = await checkMetaMaskConnection();
      await ensureBSCNetwork();

      const swapContract = getContract(SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI);
      if (!swapContract) {
        throw new Error('Failed to initialize swap contract');
      }

      if (swapDirection === 'USDT_TO_CLAT') {
        // USDT → CLAT swap (CORRECTED FUNCTION CALL)
        const usdtContract = getContract(tokenAddresses.usdt, ERC20_ABI);
        const amountWei = toWei(swapAmount, tokenDecimals.usdt);

        setStatus('Checking USDT balance...');
        const userBalance = await retryOperation(() =>
          usdtContract.methods.balanceOf(connectedAccount).call()
        );
        const balanceFormatted = fromWei(userBalance, tokenDecimals.usdt);

        if (parseFloat(balanceFormatted) < parseFloat(swapAmount)) {
          throw new Error(`Insufficient USDT balance. Available: ${balanceFormatted}, Required: ${swapAmount}`);
        }

        setStatus('Checking token allowance...');
        const allowance = await retryOperation(() =>
          usdtContract.methods.allowance(connectedAccount, SWAP_CONTRACT_ADDRESS).call()
        );

        if (parseFloat(allowance) < parseFloat(amountWei)) {
          setStatus('Approving USDT spend...');

          const approveGas = await estimateGasWithBuffer(
            usdtContract, 'approve', [SWAP_CONTRACT_ADDRESS, amountWei], connectedAccount
          );

          const approveTx = await usdtContract.methods.approve(SWAP_CONTRACT_ADDRESS, amountWei).send({
            from: connectedAccount,
            gas: approveGas
          });

          console.log('Approval transaction sent:', approveTx.transactionHash);
          setStatus('Waiting for approval confirmation...');

          await waitForTransaction(approveTx.transactionHash);
          console.log('Approval confirmed');

          setStatus('Approval confirmed, preparing swap...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

        setStatus('Executing USDT → CLAT swap...');

        const swapGas = await estimateGasWithBuffer(
          swapContract, 'swap', [amountWei], connectedAccount // ✅ CORRECTED: using 'swap' instead of 'swapUSDTtoCLAT'
        );

        const tx = await swapContract.methods.swap(amountWei).send({ // ✅ CORRECTED: using 'swap' 
          from: connectedAccount,
          gas: swapGas
        });

        console.log('Swap transaction sent:', tx.transactionHash);
        setStatus('Waiting for swap confirmation...');

        await waitForTransaction(tx.transactionHash);
        console.log('Swap confirmed');

        setStatus(`✅ USDT → CLAT swap completed! TX: ${tx.transactionHash.slice(0, 10)}...`);

      } else {
        // CLAT → USDT swap (CORRECTED FUNCTION CALL)
        const clatContract = getContract(tokenAddresses.clat, ERC20_ABI);
        const amountWei = toWei(swapAmount, tokenDecimals.clat);

        setStatus('Checking CLAT balance...');
        const userBalance = await retryOperation(() =>
          clatContract.methods.balanceOf(connectedAccount).call()
        );
        const balanceFormatted = fromWei(userBalance, tokenDecimals.clat);

        if (parseFloat(balanceFormatted) < parseFloat(swapAmount)) {
          throw new Error(`Insufficient CLAT balance. Available: ${balanceFormatted}, Required: ${swapAmount}`);
        }

        setStatus('Checking token allowance...');
        const allowance = await retryOperation(() =>
          clatContract.methods.allowance(connectedAccount, SWAP_CONTRACT_ADDRESS).call()
        );

        if (parseFloat(allowance) < parseFloat(amountWei)) {
          setStatus('Approving CLAT spend...');

          const approveGas = await estimateGasWithBuffer(
            clatContract, 'approve', [SWAP_CONTRACT_ADDRESS, amountWei], connectedAccount
          );

          const approveTx = await clatContract.methods.approve(SWAP_CONTRACT_ADDRESS, amountWei).send({
            from: connectedAccount,
            gas: approveGas
          });

          console.log('Approval transaction sent:', approveTx.transactionHash);
          setStatus('Waiting for approval confirmation...');

          await waitForTransaction(approveTx.transactionHash);
          console.log('Approval confirmed');

          setStatus('Approval confirmed, preparing swap...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

        setStatus('Executing CLAT → USDT swap...');

        const swapGas = await estimateGasWithBuffer(
          swapContract, 'swapReverse', [amountWei], connectedAccount // ✅ CORRECTED: using 'swapReverse' instead of 'swapCLATtoUSDT'
        );

        const tx = await swapContract.methods.swapReverse(amountWei).send({ // ✅ CORRECTED: using 'swapReverse'
          from: connectedAccount,
          gas: swapGas
        });

        console.log('Swap transaction sent:', tx.transactionHash);
        setStatus('Waiting for swap confirmation...');

        await waitForTransaction(tx.transactionHash);
        console.log('Swap confirmed');

        setStatus(`✅ CLAT → USDT swap completed! TX: ${tx.transactionHash.slice(0, 10)}...`);
      }

      // Reset form and reload data
      setTimeout(() => {
        setSwapAmount('');
        loadContractData();
        setStatus('Ready for next swap');
      }, 5000);

    } catch (error) {
      console.error('Swap failed:', error);

      let errorMessage = 'Swap failed: ';

      if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Transaction timeout - check BSC explorer for status';
      } else if (error.message.includes('insufficient funds')) {
        errorMessage = 'Insufficient BNB for gas fees';
      } else if (error.message.includes('Insufficient') && error.message.includes('balance')) {
        errorMessage = error.message;
      } else if (error.message.includes('execution reverted') || error.message.includes('revert')) {
        errorMessage = 'Transaction would fail - check contract conditions and liquidity';
      } else if (error.message.includes('Internal JSON-RPC error')) {
        errorMessage = 'RPC connection error - please try again in a moment';
      } else if (error.message.includes('Swap validation failed')) {
        errorMessage = error.message; // Use the validation error message directly
      } else if (error.message.includes('Transaction would fail')) {
        errorMessage = error.message; // Use the gas estimation error message
      } else if (error.message.includes('network error')) {
        errorMessage = 'Network connection error - please check your internet and try again';
      } else {
        errorMessage += error.message || 'Unknown error occurred';
      }

      setStatus(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CORRECTED OWNER FUNCTIONS
  const updateRate = async () => {
    if (!newRate || !isOwner) {
      setStatus('Only owner can update rate');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Updating swap rate...');

      const connectedAccount = await checkMetaMaskConnection();
      await ensureBSCNetwork();

      const swapContract = getContract(SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI);

      const gas = await estimateGasWithBuffer(
        swapContract, 'updateRate', [newRate], connectedAccount
      );

      const tx = await swapContract.methods.updateRate(newRate).send({
        from: connectedAccount,
        gas
      });

      setStatus('Waiting for rate update confirmation...');
      await waitForTransaction(tx.transactionHash);

      setStatus(`✅ Rate updated to ${newRate}! TX: ${tx.transactionHash.slice(0, 10)}...`);

      setTimeout(() => {
        setNewRate('');
        loadContractData();
      }, 3000);

    } catch (error) {
      console.error('Rate update failed:', error);
      setStatus('Rate update failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawTokens = async () => {
    if (!withdrawTokenAddress || !withdrawAmount || !isOwner) {
      setStatus('Only owner can withdraw tokens');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Withdrawing tokens...');

      const connectedAccount = await checkMetaMaskConnection();
      await ensureBSCNetwork();

      const swapContract = getContract(SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI);

      let decimals = 18;
      if (withdrawTokenAddress.toLowerCase() === tokenAddresses.usdt.toLowerCase()) {
        decimals = tokenDecimals.usdt;
      } else if (withdrawTokenAddress.toLowerCase() === tokenAddresses.clat.toLowerCase()) {
        decimals = tokenDecimals.clat;
      }

      const amountWei = toWei(withdrawAmount, decimals);

      const gas = await estimateGasWithBuffer(
        swapContract, 'withdrawTokens', [withdrawTokenAddress, amountWei], connectedAccount
      );

      const tx = await swapContract.methods.withdrawTokens(withdrawTokenAddress, amountWei).send({
        from: connectedAccount,
        gas
      });

      setStatus('Waiting for withdrawal confirmation...');
      await waitForTransaction(tx.transactionHash);

      setStatus(`✅ Tokens withdrawn! TX: ${tx.transactionHash.slice(0, 10)}...`);

      setTimeout(() => {
        setWithdrawTokenAddress('');
        setWithdrawAmount('');
        loadContractData();
      }, 3000);

    } catch (error) {
      console.error('Token withdrawal failed:', error);
      setStatus('Token withdrawal failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ COMPONENT INITIALIZATION WITH DEBUG
  useEffect(() => {
    console.log('🔄 SwapFormModal useEffect triggered');
    console.log('📋 Wallet Address in useEffect:', walletAddress);
    console.log('📋 Is Embedded:', isEmbedded);

    if (walletAddress) {
      console.log('✅ Wallet address available, loading contract data...');
      loadContractData();
    } else {
      console.log('⚠️ No wallet address, skipping data load');
      setStatus('Please connect your wallet to continue');
    }
  }, [walletAddress]);

  // ✅ MANUAL REFRESH FUNCTION
  const handleRefresh = async () => {
    console.log('🔄 Manual refresh triggered');
    setStatus('Refreshing data...');
    setUserBalances({ usdt: '0', clat: '0' });
    setContractBalances({ usdt: '0', clat: '0' });

    if (walletAddress) {
      await loadContractData();
    } else {
      setStatus('Please connect your wallet first');
    }
  };

  // ✅ CALCULATE EXPECTED OUTPUT
  const calculateExpectedOutput = () => {
    if (!swapAmount || !swapRate) return '0';

    const amount = parseFloat(swapAmount);
    const rate = parseFloat(swapRate);

    if (swapDirection === 'USDT_TO_CLAT') {
      // USDT * rate = CLAT
      return (amount * rate).toFixed(6);
    } else {
      // CLAT / rate = USDT  
      return (amount / rate).toFixed(6);
    }
  };

  // ✅ UI STATE
  const isSwapEnabled = swapAmount && parseFloat(swapAmount) > 0 && walletAddress && !isLoading;
  const expectedOutput = calculateExpectedOutput();

  // ✅ STYLES - Conditional based on embedded mode
  const styles = {
    container: isEmbedded ? {
      backgroundColor: '#0e1218',
      border: '1px solid #4b515a',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '800px',
      width: '100%',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    } : {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContainer: isEmbedded ? {} : {
      backgroundColor: '#0e1218',
      border: '1px solid #4b515a',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: isEmbedded ? 'center' : 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      paddingBottom: isEmbedded ? '24px' : '16px',
      borderBottom: '1px solid #4b515a'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '4px'
    },
    statusMessage: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      backgroundColor: '#1a1d24',
      border: '1px solid #4b515a',
      fontSize: '14px',
      textAlign: 'center'
    },
    section: {
      backgroundColor: '#1a1d24',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    },
    radioGroup: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
      justifyContent: 'center'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: '#2a2d35',
      border: '2px solid transparent'
    },
    radioOptionSelected: {
      border: '2px solid #F9D442',
      backgroundColor: '#3a3d45'
    },
    input: {
      backgroundColor: '#2a2d35',
      border: '1px solid #4b515a',
      borderRadius: '8px',
      padding: '14px',
      color: 'white',
      fontSize: '16px',
      width: '100%',
      outline: 'none',
      marginBottom: '12px'
    },
    button: {
      backgroundColor: '#F9D442',
      color: '#000',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      width: '100%',
      cursor: 'pointer',
      marginTop: '20px'
    },
    buttonDisabled: {
      backgroundColor: '#2a2d35',
      color: '#666',
      cursor: 'not-allowed'
    },
    ownerButton: {
      backgroundColor: '#7F5EB7',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      marginTop: '12px'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '3px solid #666',
      borderRadius: '50%',
      borderTopColor: '#F9D442',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '8px'
    },
    balanceGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '20px'
    },
    balanceCard: {
      backgroundColor: '#2a2d35',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center'
    }
  };

  // Don't render if not open and not embedded
  if (!isOpen && !isEmbedded) return null;

  const containerContent = (
    <div style={isEmbedded ? styles.container : styles.modalContainer}>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: isEmbedded ? '64px' : '48px',
            height: isEmbedded ? '64px' : '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7F5EB7, #6D9985, #F9D441)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: isEmbedded ? '28px' : '20px'
          }}>
            🔄
          </div>
          <h2 style={{
            margin: 0,
            fontSize: isEmbedded ? '28px' : '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #7F5EB7, #F9D441)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Token Swap Interface
          </h2>
        </div>
        {!isEmbedded && (
          <button style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
      </div>

      {/* Status Message */}
      {status && (
        <div style={styles.statusMessage}>
          {isLoading && <span style={styles.loadingSpinner}></span>}
          {status}
        </div>
      )}

      {/* Contract Info */}
      <div style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#888' }}>
            Contract Information
          </h3>
          <button
            onClick={handleRefresh}
            style={{
              backgroundColor: '#2a2d35',
              color: 'white',
              border: '1px solid #4b515a',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            🔄 Refresh
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          Contract: {truncateAddress(SWAP_CONTRACT_ADDRESS)}
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          Network: BSC Mainnet (Chain ID: 56)
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          Swap Rate: 1 USDT = {swapRate} CLAT
        </div>

        {/* Debug Information */}
        <div style={{ fontSize: '11px', color: '#666', marginTop: '12px' }}>
          <div>USDT Token: {tokenAddresses.usdt ? truncateAddress(tokenAddresses.usdt) : 'Loading...'}</div>
          <div>CLAT Token: {tokenAddresses.clat ? truncateAddress(tokenAddresses.clat) : 'Loading...'}</div>
          <div>Decimals: USDT({tokenDecimals.usdt}), CLAT({tokenDecimals.clat})</div>
        </div>

        {isOwner && (
          <div style={{ fontSize: '12px', color: '#F9D442', marginTop: '8px' }}>
            👑 Owner Access Granted
          </div>
        )}
      </div>

      {/* User Balances */}
      <div style={styles.section}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#888' }}>
          Your Balances
        </h3>
        <div style={styles.balanceGrid}>
          <div style={styles.balanceCard}>
            <div style={{ fontSize: '12px', color: '#888' }}>USDT</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{userBalances.usdt}</div>
          </div>
          <div style={styles.balanceCard}>
            <div style={{ fontSize: '12px', color: '#888' }}>CLAT</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{userBalances.clat}</div>
          </div>
        </div>
      </div>

      {/* Contract Liquidity */}
      <div style={styles.section}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#888' }}>
          Contract Liquidity
        </h3>
        <div style={styles.balanceGrid}>
          <div style={styles.balanceCard}>
            <div style={{ fontSize: '12px', color: '#888' }}>USDT Pool</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>{contractBalances.usdt}</div>
          </div>
          <div style={styles.balanceCard}>
            <div style={{ fontSize: '12px', color: '#888' }}>CLAT Pool</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F9D442' }}>{contractBalances.clat}</div>
          </div>
        </div>
      </div>

      {/* Swap Interface */}
      <div style={styles.section}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>
          Swap Tokens
        </h3>

        {/* Direction Selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>
            Select Direction:
          </div>
          <div style={styles.radioGroup}>
            <div
              style={{
                ...styles.radioOption,
                ...(swapDirection === 'USDT_TO_CLAT' ? styles.radioOptionSelected : {})
              }}
              onClick={() => setSwapDirection('USDT_TO_CLAT')}
            >
              <input
                type="radio"
                checked={swapDirection === 'USDT_TO_CLAT'}
                onChange={() => setSwapDirection('USDT_TO_CLAT')}
                style={{ accentColor: '#F9D442' }}
              />
              <span>💵 USDT → CLAT</span>
            </div>
            <div
              style={{
                ...styles.radioOption,
                ...(swapDirection === 'CLAT_TO_USDT' ? styles.radioOptionSelected : {})
              }}
              onClick={() => setSwapDirection('CLAT_TO_USDT')}
            >
              <input
                type="radio"
                checked={swapDirection === 'CLAT_TO_USDT'}
                onChange={() => setSwapDirection('CLAT_TO_USDT')}
                style={{ accentColor: '#F9D442' }}
              />
              <span>🎯 CLAT → USDT</span>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
            Amount to swap:
          </label>
          <input
            style={styles.input}
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="0.0"
            type="number"
            step="any"
            min="0"
          />
          <div style={{ fontSize: '12px', color: '#888' }}>
            Available: {swapDirection === 'USDT_TO_CLAT' ? userBalances.usdt : userBalances.clat} {swapDirection === 'USDT_TO_CLAT' ? 'USDT' : 'CLAT'}
          </div>

          {/* Expected Output */}
          {swapAmount && (
            <div style={{
              fontSize: '14px',
              color: '#F9D442',
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#2a2d35',
              borderRadius: '6px'
            }}>
              Expected Output: {expectedOutput} {swapDirection === 'USDT_TO_CLAT' ? 'CLAT' : 'USDT'}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <button
          style={{
            ...styles.button,
            ...(isSwapEnabled ? {} : styles.buttonDisabled)
          }}
          disabled={!isSwapEnabled}
          onClick={executeSwap}
        >
          {isLoading && <span style={styles.loadingSpinner}></span>}
          {!walletAddress ? 'Connect Wallet' :
            !isSwapEnabled ? 'Enter amount' :
              isLoading ? 'Processing...' :
                'Swap Now'}
        </button>
      </div>

      {/* Owner Controls */}
      {isOwner && (
        <div style={{ ...styles.section, border: '1px solid #7F5EB7' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#7F5EB7' }}>
            👑 Owner Controls
          </h3>

          {/* Contract Funding Guide */}
          <div style={{
            backgroundColor: '#1a1a24',
            border: '1px solid #F9D442',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#F9D442' }}>
              💡 Contract Funding Guide
            </h4>
            <div style={{ fontSize: '12px', color: '#ccc', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 8px 0' }}>To enable swaps, your contract needs to be funded:</p>
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                <li><strong>For USDT→CLAT swaps:</strong> Contract needs CLAT tokens</li>
                <li><strong>For CLAT→USDT swaps:</strong> Contract needs USDT tokens</li>
                <li><strong>Current liquidity:</strong> {contractBalances.usdt} USDT, {contractBalances.clat} CLAT</li>
              </ul>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#888' }}>
                💡 Transfer tokens directly to contract address: {truncateAddress(SWAP_CONTRACT_ADDRESS)}
              </div>
            </div>
          </div>

          {/* Update Rate */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
              Update Swap Rate (1 USDT = X CLAT):
            </label>
            <input
              style={styles.input}
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              placeholder="Enter new rate..."
              type="number"
              step="any"
              min="0"
            />
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '12px' }}>
              Current rate: 1 USDT = {swapRate} CLAT
            </div>
            <button
              style={{
                ...styles.ownerButton,
                ...(newRate ? {} : styles.buttonDisabled)
              }}
              disabled={!newRate || isLoading}
              onClick={updateRate}
            >
              {isLoading && <span style={styles.loadingSpinner}></span>}
              Update Rate
            </button>
          </div>

          {/* Withdraw Tokens */}
          <div>
            <label style={{ fontSize: '14px', color: '#888', marginBottom: '8px', display: 'block' }}>
              Withdraw Tokens:
            </label>
            <input
              style={styles.input}
              value={withdrawTokenAddress}
              onChange={(e) => setWithdrawTokenAddress(e.target.value)}
              placeholder="Token address (0x...)"
              type="text"
            />
            <input
              style={styles.input}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount"
              type="number"
              step="any"
              min="0"
            />
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '12px' }}>
              Quick fill:
              <span
                style={{ color: '#F9D442', cursor: 'pointer', marginLeft: '8px' }}
                onClick={() => setWithdrawTokenAddress(tokenAddresses.usdt)}
              >
                USDT
              </span>
              <span
                style={{ color: '#F9D442', cursor: 'pointer', marginLeft: '8px' }}
                onClick={() => setWithdrawTokenAddress(tokenAddresses.clat)}
              >
                CLAT
              </span>
            </div>
            <button
              style={{
                ...styles.ownerButton,
                ...(withdrawTokenAddress && withdrawAmount ? {} : styles.buttonDisabled)
              }}
              disabled={!withdrawTokenAddress || !withdrawAmount || isLoading}
              onClick={withdrawTokens}
            >
              {isLoading && <span style={styles.loadingSpinner}></span>}
              Withdraw Tokens
            </button>
          </div>
        </div>
      )}

      {/* Troubleshooting Section */}
      {(!userBalances.usdt || userBalances.usdt === '0.000000') && walletAddress && (
        <div style={{
          ...styles.section,
          backgroundColor: '#1a1a24',
          border: '1px solid #F9D442'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#F9D442' }}>
            💡 Troubleshooting
          </h3>
          <div style={{ fontSize: '12px', color: '#ccc', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 8px 0' }}>If balances aren't loading:</p>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li>Ensure you're connected to <strong>BSC Mainnet (Chain ID: 56)</strong></li>
              <li>Check that MetaMask is unlocked and connected</li>
              <li>Try clicking the "🔄 Refresh" button above</li>
              <li>If you see "Wrong network detected", switch to BSC in MetaMask</li>
              <li>Reload the page if issues persist</li>
              <li>Check browser console for detailed error logs</li>
            </ul>
          </div>
        </div>
      )}

      {/* Contract Liquidity Warning for Non-Owners */}
      {!isOwner && (parseFloat(contractBalances.usdt) === 0 || parseFloat(contractBalances.clat) === 0) && (
        <div style={{
          ...styles.section,
          backgroundColor: '#241a1a',
          border: '1px solid #ff6b6b'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#ff6b6b' }}>
            ⚠️ Limited Liquidity Notice
          </h3>
          <div style={{ fontSize: '12px', color: '#ccc', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 8px 0' }}>The contract has limited liquidity for swaps:</p>
            <div style={{ marginLeft: '16px', marginBottom: '12px' }}>
              • USDT Pool: {contractBalances.usdt}<br />
              • CLAT Pool: {contractBalances.clat}
            </div>
            <p style={{ margin: '0 0 8px 0' }}>
              {parseFloat(contractBalances.clat) === 0 && 'USDT→CLAT swaps are currently unavailable.'}
              {parseFloat(contractBalances.usdt) === 0 && 'CLAT→USDT swaps are currently unavailable.'}
            </p>
            <p style={{ margin: '0', fontSize: '11px', color: '#888' }}>
              📞 Please contact the contract owner to fund the liquidity pools.
            </p>
          </div>
        </div>
      )}

      {/* Swap Issues Troubleshooting */}
      {status && (status.includes('fail') || status.includes('error') || status.includes('revert')) && (
        <div style={{
          ...styles.section,
          backgroundColor: '#241a1a',
          border: '1px solid #ff6b6b'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#ff6b6b' }}>
            🚨 Swap Issues Troubleshooting
          </h3>
          <div style={{ fontSize: '12px', color: '#ccc', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 8px 0' }}>If your swap is failing:</p>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li><strong>Check contract liquidity:</strong> Ensure the contract has enough tokens</li>
              <li><strong>Verify your balance:</strong> Make sure you have enough tokens to swap</li>
              <li><strong>Check BNB balance:</strong> Ensure you have BNB for gas fees</li>
              <li><strong>Try smaller amount:</strong> Large swaps might exceed available liquidity</li>
              <li><strong>Wait and retry:</strong> RPC errors are often temporary</li>
              <li><strong>Check swap rate:</strong> Ensure the rate makes sense (1 USDT = {swapRate} CLAT)</li>
            </ul>
            <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#2a2d35', borderRadius: '4px' }}>
              <strong>Current Contract Liquidity:</strong><br />
              • USDT Pool: {contractBalances.usdt}<br />
              • CLAT Pool: {contractBalances.clat}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Return based on embedded mode
  if (isEmbedded) {
    return containerContent;
  }

  return (
    <div style={styles.container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {containerContent}
      </div>
    </div>
  );
};

export default SwapFormModal;
// import React, { useState } from 'react';

// // Chain configurations with RPC URLs and USDT contract addresses - Only 3 chains
// const CHAIN_CONFIGS = [
//   { chainId: 1, name: 'Ethereum', rpc: 'https://eth.llamarpc.com', usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
//   { chainId: 56, name: 'BSC', rpc: 'https://bsc-dataseed.binance.org', usdt: '0x55d398326f99059fF775485246999027B3197955' },
//   { chainId: 137, name: 'Polygon', rpc: 'https://polygon-rpc.com', usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' }
// ];

// const USDTBalanceFetcher = ({ walletAddress, onBalancesFetched }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [balances, setBalances] = useState([]);

//   // Helper function to pad hex string to 64 characters
//   const padHex = (hex) => {
//     return hex.replace('0x', '').padStart(64, '0');
//   };

//   // Helper function to create eth_call data for balanceOf
//   const createBalanceOfCallData = (walletAddress) => {
//     const methodSignature = '0x70a08231'; // balanceOf(address)
//     const paddedAddress = padHex(walletAddress);
//     return methodSignature + paddedAddress;
//   };

//   // Helper function to create eth_call data for decimals
//   const createDecimalsCallData = () => {
//     return '0x313ce567'; // decimals()
//   };

//   // Helper function to make JSON-RPC call
//   const makeRPCCall = async (rpcUrl, method, params) => {
//     const response = await fetch(rpcUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         jsonrpc: '2.0',
//         id: 1,
//         method,
//         params,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     return data.result;
//   };

//   // Helper function to convert hex to decimal
//   const hexToDecimal = (hex) => {
//     return parseInt(hex, 16);
//   };

//   // Helper function to format balance with decimals
//   const formatBalance = (balanceHex, decimals) => {
//     const balance = BigInt(balanceHex);
//     const divisor = BigInt(10 ** decimals);
//     const wholePart = balance / divisor;
//     const fractionalPart = balance % divisor;
    
//     if (fractionalPart === 0n) {
//       return wholePart.toString();
//     }
    
//     const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
//     const trimmedFractional = fractionalStr.replace(/0+$/, '');
    
//     if (trimmedFractional === '') {
//       return wholePart.toString();
//     }
    
//     return `${wholePart}.${trimmedFractional}`;
//   };

//   // Fetch USDT balance for a single chain
//   const fetchUSDTBalance = async (chainConfig) => {
//     try {
//       const { chainId, name, rpc, usdt } = chainConfig;

//       // Get decimals
//       const decimalsCallData = createDecimalsCallData();
//       const decimalsHex = await makeRPCCall(rpc, 'eth_call', [
//         {
//           to: usdt,
//           data: decimalsCallData,
//         },
//         'latest',
//       ]);
//       const decimals = hexToDecimal(decimalsHex);

//       // Get balance
//       const balanceCallData = createBalanceOfCallData(walletAddress);
//       const balanceHex = await makeRPCCall(rpc, 'eth_call', [
//         {
//           to: usdt,
//           data: balanceCallData,
//         },
//         'latest',
//       ]);

//       const balance = formatBalance(balanceHex, decimals);
      
//       return {
//         chainId,
//         network: name,
//         balance: parseFloat(balance),
//         decimals,
//         success: true,
//       };
//     } catch (error) {
//       console.error(`Error fetching USDT balance for ${chainConfig.name}:`, error);
//       return {
//         chainId: chainConfig.chainId,
//         network: chainConfig.name,
//         balance: 0,
//         decimals: 6,
//         success: false,
//         error: error.message,
//       };
//     }
//   };

//   // Main function to fetch all balances
//   const fetchAllBalances = async () => {
//     if (!walletAddress) {
//       setError('Wallet address is required');
//       return;
//     }

//     setIsLoading(true);
//     setProgress(0);
//     setError(null);

//     try {
//       const results = [];
//       const total = CHAIN_CONFIGS.length;

//       for (let i = 0; i < CHAIN_CONFIGS.length; i++) {
//         const chainConfig = CHAIN_CONFIGS[i];
        
//         // Update progress
//         setProgress(Math.round((i / total) * 100));

//         // Fetch balance
//         const balanceData = await fetchUSDTBalance(chainConfig);
//         results.push(balanceData);

//         // Small delay to prevent rate limiting
//         await new Promise(resolve => setTimeout(resolve, 100));
//       }

//       setProgress(100);
//       setBalances(results);
      
//       if (onBalancesFetched) {
//         onBalancesFetched(results);
//       }

//       console.log('All USDT balances fetched:', results);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching USDT balances:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Format balance display
//   const formatBalanceDisplay = (balance) => {
//     if (balance >= 1000000) {
//       return `${(balance / 1000000).toFixed(2)}M`;
//     } else if (balance >= 1000) {
//       return `${(balance / 1000).toFixed(2)}K`;
//     }
//     return balance.toFixed(2);
//   };

//   // Get chain color
//   const getChainColor = (chainId) => {
//     const colors = {
//       1: 'bg-blue-500',      // Ethereum
//       56: 'bg-yellow-500',   // BSC
//       137: 'bg-purple-500',  // Polygon
//     };
//     return colors[chainId] || 'bg-gray-500';
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
//       <h3 className="text-white text-lg font-semibold mb-4">
//         USDT Balance Fetcher
//       </h3>
      
//       {walletAddress && (
//         <div className="mb-4">
//           <p className="text-gray-300 text-sm">Wallet Address:</p>
//           <p className="text-white font-mono text-xs break-all">
//             {walletAddress}
//           </p>
//         </div>
//       )}

//       {isLoading && (
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-gray-300 text-sm">Fetching balances...</span>
//             <span className="text-white text-sm">{progress}%</span>
//           </div>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {error && (
//         <div className="mb-4 p-3 bg-red-900 border border-red-600 rounded">
//           <p className="text-red-200 text-sm">{error}</p>
//         </div>
//       )}

//       {/* Display fetched balances */}
//       {balances.length > 0 && (
//         <div className="mb-4">
//           <h4 className="text-gray-300 text-sm font-medium mb-3">Current Balances:</h4>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             {balances.map((balance) => (
//               <div
//                 key={balance.chainId}
//                 className={`rounded-lg p-3 border ${
//                   balance.success ? 'bg-gray-700 border-gray-600' : 'bg-red-900 border-red-600'
//                 }`}
//               >
//                 <div className="flex items-center mb-2">
//                   <span className={`text-white text-xs px-2 py-1 rounded-full font-bold ${getChainColor(balance.chainId)}`}>
//                     {balance.network}
//                   </span>
//                 </div>
//                 {balance.success ? (
//                   <>
//                     <div className="text-green-400 text-lg font-bold">
//                       {formatBalanceDisplay(balance.balance)} USDT
//                     </div>
//                     <div className="text-gray-400 text-xs">
//                       {balance.balance.toFixed(2)} USDT
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-red-400 text-sm">
//                     Failed to fetch
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <button
//         onClick={fetchAllBalances}
//         disabled={!walletAddress || isLoading}
//         className={`w-full py-2 px-4 rounded font-medium transition-colors ${
//           !walletAddress || isLoading
//             ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//             : 'bg-blue-600 text-white hover:bg-blue-700'
//         }`}
//       >
//         {isLoading ? 'Fetching...' : 'Fetch USDT Balances'}
//       </button>

//       <p className="text-gray-400 text-xs mt-3 text-center">
//         Fetches USDT balances directly from {CHAIN_CONFIGS.length} supported chains (Ethereum, BSC, Polygon)
//       </p>
//     </div>
//   );
// };

// export default USDTBalanceFetcher;
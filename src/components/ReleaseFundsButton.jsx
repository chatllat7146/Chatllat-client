import React, { useState, useEffect } from "react";

const ReleaseFundsButton = ({ 
  agreementId, 
  freelancerWallet, 
  amount, 
  chain = "bsc",
  onSuccess, 
  onError,
  className = "",
  disabled = false,
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isReleased, setIsReleased] = useState(false);
  const [agreementStatus, setAgreementStatus] = useState(null);

  // Check if funds are already released on component mount
  useEffect(() => {
    if (agreementId && chain) {
      checkAgreementStatus();
    }
  }, [agreementId, chain]);

  // Check current agreement status
  const checkAgreementStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agreement-status/${agreementId}?fundedChain=${chain}`
      );
      
      if (response.ok) {
        const result = await response.json();
        setAgreementStatus(result);
        
        // Check if freelancer already has withdrawal permission
        const freelancerWithdrawal = result.withdrawals?.find(w => 
          w.wallet.toLowerCase() === freelancerWallet?.toLowerCase() && !w.withdrawn
        );
        
        setIsReleased(!!freelancerWithdrawal);
      }
    } catch (err) {
      console.error("Failed to check agreement status:", err);
    }
  };

  // Main release funds function
  const handleReleaseFunds = async () => {
    if (!agreementId || !freelancerWallet || !amount || !chain) {
      setError("Missing required information");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🚀 Releasing funds for agreement ${agreementId}...`);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/release-funds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agreementId,
          freelancerWallet,
          amount: parseFloat(amount),
          fundedChain: chain
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Funds released successfully!`, result);
        
        setIsReleased(true);
        
        // Update agreement status
        await checkAgreementStatus();
        
        // Call success callback
        if (onSuccess) {
          onSuccess({
            agreementId,
            freelancerWallet,
            amount,
            chain,
            transactions: result.transactions,
            message: result.message
          });
        }
      } else {
        throw new Error(result.message || 'Failed to release funds');
      }

    } catch (err) {
      console.error("❌ Release funds error:", err);
      
      // Enhanced error handling
      let errorMessage = "Failed to release funds. Please try again.";
      
      if (err.message.includes("Insufficient USDT")) {
        errorMessage = "Insufficient USDT in admin wallet. Please top up the admin wallet.";
      } else if (err.message.includes("Insufficient ETH") || err.message.includes("Insufficient BNB") || err.message.includes("Insufficient MATIC")) {
        errorMessage = "Insufficient gas fees in admin wallet. Please top up with native token.";
      } else if (err.message.includes("Invalid freelancer wallet")) {
        errorMessage = "Invalid freelancer wallet address.";
      } else if (err.message.includes("execution reverted")) {
        errorMessage = "Smart contract rejected the transaction. Please check the agreement details.";
      } else if (err.message.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine button text and state
  const getButtonText = () => {
    if (isLoading) return "Releasing Funds...";
    if (isReleased) return "✅ Funds Released";
    return children || `Release ${amount} USDT`;
  };

  const isButtonDisabled = disabled || isLoading || isReleased;

  return (
    <div className="w-full">
      <button
        onClick={handleReleaseFunds}
        disabled={isButtonDisabled}
        className={`
          w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 
          flex items-center justify-center gap-2 min-h-[48px]
          ${isButtonDisabled
            ? isReleased 
              ? "bg-green-700 text-green-200 cursor-default"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }
          ${className}
        `}
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
        )}
        {getButtonText()}
      </button>

      {/* Agreement Status Display */}
      {agreementStatus && (
        <div className="mt-3 p-3 bg-gray-800 border border-gray-600 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Contract Status:</span>
            <span className="text-white font-medium">
              {parseFloat(agreementStatus.escrowedBalance) > 0 ? "Funded" : "Not Funded"}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Escrowed Balance:</span>
            <span className="text-white font-medium">
              {agreementStatus.escrowedBalance} USDT
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Pending Withdrawals:</span>
            <span className="text-white font-medium">
              {agreementStatus.summary.totalPendingWithdrawals} USDT
            </span>
          </div>
        </div>
      )}

      {/* Process Steps Display */}
      {isLoading && (
        <div className="mt-3 p-3 bg-blue-900/20 border border-blue-600 rounded-lg">
          <div className="text-blue-400 font-medium text-sm mb-2">
            🔄 Processing Release...
          </div>
          <div className="text-blue-300 text-xs space-y-1">
            <div>• Checking admin wallet balance</div>
            <div>• Approving USDT spending</div>
            <div>• Funding smart contract</div>
            <div>• Recording withdrawal permission</div>
            <div>• Enabling freelancer withdraw button</div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isReleased && !isLoading && (
        <div className="mt-3 p-3 bg-green-900/20 border border-green-600 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>
              Funds released successfully! Freelancer can now withdraw {amount} USDT.
            </span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-3 p-3 bg-red-900/20 border border-red-600 rounded-lg">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Chain Info */}
      <div className="mt-2 text-xs text-gray-400 text-center">
        Chain: {chain.charAt(0).toUpperCase() + chain.slice(1)} • 
        Freelancer: {freelancerWallet?.slice(0, 6)}...{freelancerWallet?.slice(-4)}
      </div>
    </div>
  );
};

export default ReleaseFundsButton;
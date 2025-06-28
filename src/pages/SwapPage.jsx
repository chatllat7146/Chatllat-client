import React from 'react';
import SwapFormModal from '../components/SwapFormModal';

const SwapPage = ({ account, walletAddress, walletBalance }) => {
  // ✅ Helper function to safely format wallet balance
  const formatWalletBalance = (balance) => {
    if (!balance) return 'Loading...';
    
    // If balance is an object with eth property
    if (typeof balance === 'object' && balance.eth !== undefined) {
      return `${parseFloat(balance.eth).toFixed(4)} BNB`;
    }
    
    // If balance is a string or number
    if (typeof balance === 'string' || typeof balance === 'number') {
      return `${parseFloat(balance).toFixed(4)} BNB`;
    }
    
    // Fallback
    return 'N/A';
  };

  // ✅ Helper function to get wallet balance display info
  const getBalanceInfo = (balance) => {
    if (!balance) {
      return {
        main: 'Loading...',
        usd: '',
        showUSD: false
      };
    }
    
    if (typeof balance === 'object') {
      return {
        main: `${parseFloat(balance.eth || 0).toFixed(4)} BNB`,
        usd: balance.usdtEquivalent ? `~$${parseFloat(balance.usdtEquivalent).toFixed(2)} USD` : '',
        showUSD: !!balance.usdtEquivalent
      };
    }
    
    return {
      main: `${parseFloat(balance).toFixed(4)} BNB`,
      usd: '',
      showUSD: false
    };
  };

  const balanceInfo = getBalanceInfo(walletBalance);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0e13',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        gap: '16px'
      }}>
        <button 
          style={{
            backgroundColor: '#1a1d24',
            border: '1px solid #4b515a',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'all 0.3s ease'
          }}
          onClick={() => window.history.back()}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2a2d35';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#1a1d24';
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            margin: 0,
            background: 'linear-gradient(135deg, #7F5EB7, #F9D441)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔄 Token Swap Hub
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#888', 
            margin: '8px 0 0 0' 
          }}>
            Direct USDT ↔ CLAT exchanges on Binance Smart Chain
          </p>
        </div>
      </div>

      {/* Connection Status Bar */}
      {walletAddress ? (
        <div style={{
          backgroundColor: '#0e1218',
          border: '1px solid #10B981',
          borderRadius: '12px',
          padding: '16px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '800px',
          margin: '0 auto 32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10B981'
            }}></div>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10B981' }}>
              Wallet Connected
            </span>
            <span style={{ fontSize: '14px', color: '#888' }}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '14px', color: '#888' }}>
              {balanceInfo.main}
            </div>
            {balanceInfo.showUSD && (
              <div style={{ fontSize: '12px', color: '#666' }}>
                {balanceInfo.usd}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#0e1218',
          border: '1px solid #ff6b6b',
          borderRadius: '12px',
          padding: '16px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto 32px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b'
          }}></div>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b6b' }}>
            Wallet Not Connected
          </span>
          <span style={{ fontSize: '14px', color: '#888' }}>
            Please connect your MetaMask wallet to continue
          </span>
        </div>
      )}

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && walletBalance && (
        <div style={{
          backgroundColor: '#1a1d24',
          border: '1px solid #4b515a',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          maxWidth: '800px',
          margin: '0 auto 20px',
          fontSize: '12px',
          color: '#888'
        }}>
          <strong>Debug - Wallet Balance Object:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '11px' }}>
            {JSON.stringify(walletBalance, null, 2)}
          </pre>
        </div>
      )}

      {/* Embedded SwapFormModal as Page Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 200px)'
      }}>
        <SwapFormModal
          walletAddress={walletAddress}
          isEmbedded={true} // Pass prop to indicate it's embedded, not modal
        />
      </div>
    </div>
  );
};

export default SwapPage;
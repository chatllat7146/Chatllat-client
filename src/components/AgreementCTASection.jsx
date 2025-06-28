import { Box, Button } from '@mui/material';

// Props: agreement (object), currentWalletAddress (string)
function AgreementCTASection({ agreement, currentWalletAddress }) {
  if (!agreement || !currentWalletAddress) return null;

  const isPayer = currentWalletAddress === agreement.payerWallet;
  const { status } = agreement;

  return (
    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
      {/* Show Deposit + Cancel if client and agreement is accepted */}
      {isPayer && status === 'Accepted' && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => alert('Deposit Funds')}
          >
            Deposit Fund
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => alert('Cancel Agreement')}
          >
            Cancel Agreement
          </Button>
        </>
      )}

      {/* Show Edit Agreement if client and agreement is under negotiation */}
      {isPayer && status === 'Negotiation' && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert('Edit Agreement')}
        >
          Edit Agreement
        </Button>
      )}
    </Box>
  );
}

export default AgreementCTASection;

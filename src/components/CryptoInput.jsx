import React, { useState } from 'react';
import { Box, TextField, MenuItem, InputAdornment, Avatar } from '@mui/material';

const cryptoCurrencies = [
  { code: 'USDT', name: 'Tether', icon: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png' },
];

export default function CryptoCurrencyInput() {
  const [amount, setAmount] = useState('');

  const selectedCrypto = cryptoCurrencies.find(c => c.code === crypto);

  return (
    <Box display="flex" alignItems="center" gap={2}>

      {/* Input for Amount */}
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ width: "85%" }}
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar src={selectedCrypto?.icon} sx={{ width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

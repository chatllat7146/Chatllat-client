
export  const CHAIN_CONFIG = {
    ethereum: {
        chainId: "0x1",
        rpcUrl: process.env.ETH_RPC_URL,
        contractAddress: process.env.ETH_CONTRACT,
    },
    bsc: {
        chainId: "0x38",
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        contractAddress: '0xe7d03e568ad45431843b1fbcbce2d5866bbea962',
    },
    polygon: {
        chainId: "0x89",
        rpcUrl: 'https://polygon-rpc.com',
        contractAddress: '0xfbf4f538a698e5c090c43524e51fe69178ae7bc0',
    },
};


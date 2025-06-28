import { ethers } from "ethers";
import { CHAIN_CONFIG } from "../utils/chainMap";
import ChatllatEscrowABI from "../abi/ChatllatEscrow.json";

export const useWithdraw = () => {
  const withdraw = async (agreementId, fundedChain) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();

    const requiredChainId = CHAIN_CONFIG[fundedChain].chainId;
    const contractAddress = CHAIN_CONFIG[fundedChain].contractAddress;

    if (network.chainId !== parseInt(requiredChainId, 16)) {
      alert(`Please switch to ${CHAIN_CONFIG[fundedChain].name}`);
      return;
    }

    const contract = new ethers.Contract(contractAddress, ChatllatEscrowABI, signer);

    try {
      const tx = await contract.withdraw(agreementId);
      await tx.wait();
      alert("Withdrawal successful");
    } catch (err) {
      console.error("Withdraw failed", err);
    }
  };

  return { withdraw };
};

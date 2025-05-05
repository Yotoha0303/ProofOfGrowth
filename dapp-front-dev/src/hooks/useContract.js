import { ethers } from 'ethers';
import abi from '../abi/ProofOfGrowth.json';

export function getContract(signerOrProvider) {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  return new ethers.Contract(contractAddress, abi.abi, signerOrProvider);
}

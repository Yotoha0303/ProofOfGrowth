import { ethers } from 'ethers';
import abi from '../abi/ProofOfGrowthOUT.json';

export function getContract(signerOrProvider) {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const contract = new ethers.Contract(contractAddress, abi.abi, signerOrProvider);

  if (!contract.target) {
    console.error("合约实例化失败，可能是地址未传入或 signer/provider 异常");
  }

  if (!import.meta.env.VITE_CONTRACT_ADDRESS) {
    console.error("合约地址未设置，请检查 .env 文件");
  }
  // else {
  //    //获取合约地址
  //   console.log(`contractAddress:${contract.target}`)
  // }
  return contract;
}
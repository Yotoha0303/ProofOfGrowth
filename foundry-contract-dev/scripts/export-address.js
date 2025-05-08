// scripts/export-address.js
const fs = require("fs");
const path = require("path");

const runFilePath = path.resolve(
  __dirname,
  "../broadcast/DeployProofOfGrowth.s.sol/11155111/run-latest.json"
);
const envFilePath = path.resolve(
  __dirname,
  "../../dapp-front-dev/.env"
);

try {
  const runData = JSON.parse(fs.readFileSync(runFilePath, "utf-8"));
  const contractAddress = runData.transactions.find(tx => tx.contractName === "ProofOfGrowth")?.contractAddress;

  if (!contractAddress) {
    throw new Error("未找到合约地址！");
  }

  let env = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, "utf-8") : "";
  env = env.replace(/VITE_CONTRACT_ADDRESS=.*/g, `VITE_CONTRACT_ADDRESS=${contractAddress}`);

  if (!env.includes("VITE_CONTRACT_ADDRESS")) {
    env += `\nVITE_CONTRACT_ADDRESS=${contractAddress}`;
  }

  fs.writeFileSync(envFilePath, env);
  console.log("✅ 合约地址已写入前端 .env 文件:", contractAddress);
} catch (err) {
  console.error("❌ 写入合约地址失败：", err.message);
}

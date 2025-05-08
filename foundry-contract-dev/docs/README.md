
---

## 快速启动

### 本地开发

```bash
# 合约端
cd foundry-contract-dev
forge install
forge build
forge test

# 使用.env
DEPLOYER_PRIVATE_KEY=0xYOU_WALLET
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOU_KEY

# 刷新配置
source .env

# 部署合约
forge script script/DeployProofOfGrowth.s.sol:DeployProofOfGrowth \
  --rpc-url $RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --broadcast \
  -vvvv

# 写入前端地址
node scripts/export-address.js

# 启动前端
cd ../dapp-front-dev
npm install
npm run dev

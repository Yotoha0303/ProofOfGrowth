## 文件结构
```
|-cursor/
|-dapp-front-dev/
|-foundry-contract-dev/
说明：
cursor用于cursor配置
dapp-front-dev用于前端开发
foundry-contract-dev未提前创建，用于合约构建、测试和部署
```

## 项目运行（code）
```
forge init foundry-contract-dev
cd foundry-contract-dev
mkdir docs
rm -rf src script/Counter.s.sol test/Counter.t.sol
rm -rf foundry-contract-dev/.git
```

## 部署
```
forge script script/DeployProofOfGrowth.s.sol:DeployProofOfGrowth \
  --rpc-url https://sepolia.infura.io/v3/YOUR_INFURA_ID \
  --broadcast \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify \
  -vvvv
```
其中，`DEPLOYER_PRIVATE_KEY`在`.env`中，无需使用dotenv，与toml同个目录下即可
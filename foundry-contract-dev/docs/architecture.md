## 项目运行（code）
```
forge init foundry-contract-dev
cd foundry-contract-dev
mkdir docs
rm -rf src script/Counter.s.sol test/Counter.t.sol
rm -rf foundry-contract-dev/.git
```

## 部署前
```
forge build
forge test
forge coverage
```

## 部署
```
source .env

forge script script/DeployProofOfGrowth.s.sol:DeployProofOfGrowth \
  --rpc-url https://sepolia.infura.io/v3/YOUR_INFURA_ID \
  --broadcast \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify \
  -vvvv
```
其中，`DEPLOYER_PRIVATE_KEY`在`.env`中，无需使用dotenv，与toml同个目录下即可

## 清除缓存
```
npm cache clean --force

forge clean

```
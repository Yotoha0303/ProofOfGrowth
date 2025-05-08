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
  --rpc-url $RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --broadcast \
  --verify \
  -vvvv
```
其中，`DEPLOYER_PRIVATE_KEY`在`.env`中，无需使用dotenv，与toml同个目录下即可。
部署前，需要先编译和测试

## 脚本写入合约地址
```
node scripts/export-address.js
```
## 清除缓存
```
npm cache clean --force

forge clean

```
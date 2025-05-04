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
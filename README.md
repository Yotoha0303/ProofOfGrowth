## 项目简介

**Proof of Growth (POG)** 是一个 Web3 应用，它允许用户记录自己的成长事件，并通过 NFT 的方式永久上链存证。你可以将一次学习、一个挑战、一段项目经验，转化为一张链上的成长证明卡片（POG Token）。

---

## 文件结构
```
project-root/
├── cursor/ # 
│ ├── errors/ #报错记录
│ ├── templates/ 
│ │ └── basic_template.md	#任务流程生成模板
│ ├── generate_task.py #任务流程生成脚本
│ ├── SettingCursor2_plus.md #cursor自动操作规则
│
├── foundry-contract-dev/ # Solidity 合约与脚本
│ ├── contracts/
│ │ └── ProofOfGrowth.sol
│ ├── script/
│ │ └── DeployProofOfGrowth.s.sol
│ └── scripts/
│ └── export-address.js # 自动写入前端 .env 脚本
│
├── dapp-front-dev/ # React + Vite 前端
│ ├── src/
│ │ ├── components/ # 组件（如 RecordList）
│ │ ├── hooks/ # 合约初始化 Hook（useContract.js）
│ │ └── App.jsx
│ ├── .env # 合约地址注入目标
│ └── index.html
```

## 项目运行
```git bash
cd dapp-front-dev

touch .env

//.env
VITE_CONTRACT_ADDRESS=0x2aaa082b75a1022122bc60bdc584647b8784d3b2
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOU_KEY

npm run dev
```

## 技术栈
| 层级   | 工具 / 框架 |
|--------|--------------|
| 合约   | Solidity ^0.8.20 / ERC721 / OpenZeppelin v5 |
| 测试   | Foundry v5 / forge-std |
| 构建   | Foundry / forge script |
| 前端   | React + Vite + Ethers v6 |
| 样式   | Tailwind CSS v4 |
| 部署   | 合约：sepolia 测试网<br>前端：Vercel |
| 自动化 | export-address.js（合约地址注入） |

## 核心功能

- ✅ 铸造成长记录 NFT（包含标题、描述、分类、时间戳）
- ✅ 用户通过钱包连接，查看自己拥有的成长记录
- ✅ 用户burn自己拥有的成长记录
- ✅ 成长记录永久上链（基于 ERC721 + 可扩展 Metadata）
- ✅ 使用 Vercel 自动部署
- ✅ 合约使用 Foundry 编写、测试、部署
- ✅ 合约自动写入地址到前端 `.env`（CI 自动化预备）

---

## 扩展功能(未开发)
-  铸造成长记录 NFT（包含标题、描述、分类、时间戳,新增图片）
-  成长记录导出（如pdf、Json）
-  公共档案页，可查看他人的成长记录

## 项目图片
**[项目地址](https://proof-of-growth.vercel.app/)**
![项目图片](https://github.com/Yotoha0303/ProofOfGrowth/blob/main/Image/front-dapp.png)
![项目图片2](https://github.com/Yotoha0303/ProofOfGrowth/blob/main/Image/show_growth_records.png)

## License
MIT

## 贡献指南
欢迎提 Issue 或 PR，共同完善成长记录系统！


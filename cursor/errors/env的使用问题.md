# dotenv 无 forge 子命令报错处理

## 问题描述
- 执行 `dotenv forge ...` 报错：Error: No such command 'forge'.

## 原因
- dotenv 不是 Foundry 工具，不能直接用作 forge 的前缀。
- forge 会自动读取 .env 文件，无需 dotenv。

## 解决方法
1. 直接用 forge 命令：
   ```
   forge ...参数...
   ```
2. 确保 .env 文件在项目根目录，forge 会自动读取。
3. 如 forge 没有自动读取，可用 export/source 手动加载环境变量。

## 示例
```bash
export $(cat .env | xargs)
forge create ...
```
```

如还有疑问，请贴出你的完整命令和 .env 内容（可脱敏），我帮你具体分析！
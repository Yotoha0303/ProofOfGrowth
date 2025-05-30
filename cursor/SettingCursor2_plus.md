# MCP + Cursor 操作规则文档

本文件用于指导 MCP 服务在 Cursor 环境中进行任务操作、错误处理与环境管理。你必须遵循以下规则进行任务执行与错误修复。

---

## 操作总则

1. 所有任务应在执行前进行环境检查，并生成任务流程文档。
2. 若用户未提供操作说明文档，Cursor 应主动调用**任务模板生成器**，在 `./tasks/` 目录中生成标准任务流程文档。
3. Cursor 执行任务应依据任务流程文档中的步骤执行，并进行结果验证。
4. 若任务失败，应主动触发错误处理流程。

---

## 操作流程规则

### 1. 环境检查（Environment Check）
- 每次执行任务前，请确认当前设备配置符合任务要求。
- 检查终端环境、开发语言（如 Python/Node）版本、依赖库、系统信息。
- 可通过如下方式查看环境信息：
  - Windows: `cmd` / `PowerShell`
  - Git 操作：使用 `Git Bash`
  - Python 项目：调用 `python --version` / `pip list`
- 检查并报告以下内容：
  - 系统信息（如 CPU、内存、操作系统版本）
  - 终端类型（例如 Git Bash / PowerShell）
  - 当前 Python、Node.js、Git、Java 等开发环境
  - 所需环境变量是否已设置（如 `PATH`, `PYTHONPATH`, `NODE_ENV`）

---

### 2. 错误处理机制（Error Handling）
当任务失败时，按以下逻辑处理：

| 错误类型             | 应对方案                                                   |
|----------------------|------------------------------------------------------------|
| 权限不足             | 提示用户以**管理员身份重新运行**                           |
| 命令未识别           | 建议切换终端（如改用 Git Bash）并检查环境变量              |
| 无法读取文件         | 自动尝试转换为可读格式，或创建新文件并迁移内容              |
| 缺少依赖 / 库未安装  | 提供安装命令并提示用户执行，例如 `pip install xxx`         |
| 未知错误或无法解决   | 自动使用搜索引擎（如 Google）查询解决方案                   |
| 网络或服务异常       | 检查 MCP 服务状态，建议用户访问 [Smithery](https://smithery.ai) 更新依赖 |

> 当出现无法判断的错误时，请将错误信息保存在 `./logs/error_log.txt`，供人工审查。

---

### 3. 文件路径规范（File Path Verification）
- 在进行文件操作前，确认路径是否存在。
- 所有文件路径应为 **绝对路径或项目相对路径**，避免路径错误。
- 如果目标文件不存在，应记录错误并创建占位文件供后续使用。

---

### 4. 环境变量检测（Env Variables）
- 在启动编程或任务前，自动检测是否缺少关键环境变量。
- 若变量缺失，应提示用户如何设置或导入（例如 `.env` 文件、系统变量配置）。

---

### 5. 任务执行后的验证（Post-run Verification）
- 所有任务完成后，进行自动结果校验：
  - 比对输出是否符合预期（文件是否生成？是否包含目标内容？）
  - 若不符合，重新运行流程或根据 `./tasks/` 中的流程说明调整策略。

---

### 6. 自动生成任务流程文档（Task Generation）
**触发条件：**
- 若 `./tasks/` 目录中不存在当前任务对应的 `.md` 流程说明文档

**执行流程：**
- 调用 `generate_task.py` 脚本生成任务文档：

**调用`generate_task.py`:**
- 调用模板
 - python generate_task.py --task=<任务名称> --template=basic_template.md

---

## 检查机制（Validation & Self-Healing）
- 每次使用 MCP 服务前，检查服务可用性。
- 若发现依赖异常、服务失效，访问 [Smithery](https://smithery.ai) 下载最新版本并更新到 `mcp.json`。
- 所有操作应具备自动修复机制：路径修正、依赖安装、环境提示。

---

## 特别运行规则

- 若你在执行任务时未获得明确的操作文档，则必须**自动在当前目录的 `./tasks/` 文件夹中生成操作流程说明文档**。
- 文档内容应包含以下要素：
  - 任务目标与预期产出
  - 所需环境与依赖
  - 执行步骤（带命令行）
  - 错误处理方式

---

## 网站链接
- Smithery 平台：`https://smithery.ai`（用于更新 MCP 服务与依赖）


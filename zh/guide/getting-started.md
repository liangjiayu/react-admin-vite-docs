# 快速开始

## 前置准备

::: info 环境要求

在启动项目前，你需要确保你的环境满足以下要求：

- [Node.js](https://nodejs.org/en) 20.15.0 及以上版本，推荐使用 [nvm](https://github.com/nvm-sh/nvm) 进行版本管理。
- [Git](https://git-scm.com/) 任意版本。
- [pnpm](https://pnpm.io/) 建议安装最新版。

验证你的环境是否满足以上要求，你可以通过以下命令查看版本：

```bash
# 查看 node 版本
node -v
# 查看 git 版本
git -v
# 查看 pnpm 版本
pnpm -v
```

:::

## 创建项目

### 获取源码

::: code-group

```sh [GitHub]
npx tiged liangjiayu/react-admin-vite react-admin-vite
```

:::

::: danger 注意

注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。

:::

### 安装依赖

在你的代码目录内打开终端，并执行以下命令:

```bash
# 进入项目目录
cd react-admin-vite

# 使用项目指定的pnpm版本进行依赖安装
corepack enable

# 安装依赖
pnpm install
```

::: tip 注意

- 项目只支持使用 `pnpm` 进行依赖安装，默认会使用 `corepack` 来安装指定版本的 `pnpm`。
- 如果你的网络环境无法访问 npm 源，你可以设置系统的环境变量`COREPACK_NPM_REGISTRY=https://registry.npmmirror.com`，然后再执行`pnpm install`。
- 如果你不想使用`corepack`，你需要禁用`corepack`，然后使用你自己的`pnpm`进行安装。

:::

### 项目开发

执行以下命令启动项目:

```bash
pnpm dev
```

### 项目构建

执行以下命令构建项目:

```bash
pnpm build
```

### 项目预览

执行以下命令预览构建的产物:

```bash
pnpm preview
```

# 本地开发

::: tip 代码获取

如果你还没有获取代码，可以先从 [快速开始](../guide/getting-started.md) 处开始阅读文档。

:::

## 前置准备

为了更好的开发体验，建议了解相关基础知识和工具配置。

### 基础知识

本项目需要一定前端基础知识，请确保掌握 React 的基础知识，以便能处理一些常见的问题。建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Vitejs](https://vitejs.dev/)
- [Pnpm](https://pnpm.io/)

### 工具配置

如果您使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化:

- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - 代码检查和格式化
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwindcss 提示插件。
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - 单词语法检查
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查（可选）
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化（可选）

## Npm Scripts

npm 脚本是项目常见的配置，用于执行一些常见的任务，比如启动项目、打包项目等。以下的脚本都可以在项目根目录的 `package.json` 文件中找到。

执行方式为：`pnpm run [script]` 或 `npm run [script]`。

```json
  "scripts": {
    // 启动项目
    "dev": "vite",
    // 打包项目
    "build": "vite build",
    // 格式化代码
    "format": "biome format --write .",
    // 检查代码和格式
    "check": "biome check .",
    // 自动修复代码
    "check:fix": "biome check --write .",
    // 使用 prettier 格式化代码
    "prettier": "prettier -c --write . --cache",
    // 预览打包后的项目
    "preview": "vite preview",
    // git-hook初始化
    "prepare": "husky",
    // 生成接口函数
    "openapi": "node config/openapi.js"
  },
```

## CRUD 开发

以下教程是快速创建一个 CRUD 页面的步骤，包括创建页面、配置路由、网络请求等，教程以 `example-page` 为示例。

### 创建页面

在 `src/pages` 目录下创建一个 `example-page` 文件夹，并且创建入口文件。

```bash
src/pages/example-page
└── index.tsx
```

::: info index.tsx

```tsx
const ExamplePage = () => {
  return <div>ExamplePage</div>;
};

export default ExamplePage;
```

:::

### 配置路由

在 `src/router` 目录下根据实际情况在对应的模块中添加路由配置。

```tsx
export default [
  {
    path: "/example-page",
    Component: lazy(() => import("@/pages/example-page")),
    handle: {
      name: "示例页面",
    },
  },
];
```

### 生成接口函数

教程以接口已经开发完成为例，如果接口未完成可使用 `mock` 的方式。

执行 `pnpm run openapi` 生成接口函数，以下是生成的示例代码：

```ts
// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 创建文章数据 POST /api/sysArticle/create */
export async function createSysArticle(
  body: FastAPI.SysArticleSaveRequest,
  options?: { [key: string]: any }
) {
  return request<number>("/api/sysArticle/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章数据 POST /api/sysArticle/delete */
export async function deleteSysArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: FastAPI.deleteSysArticleParams,
  options?: { [key: string]: any }
) {
  return request<boolean>("/api/sysArticle/delete", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取文章列表 GET /api/sysArticle/pageList */
export async function getSysArticleByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: FastAPI.getSysArticleByPageParams,
  options?: { [key: string]: any }
) {
  return request<FastAPI.IPageSysArticle>("/api/sysArticle/pageList", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新文章数据 POST /api/sysArticle/update */
export async function updateSysArticle(
  body: FastAPI.SysArticleSaveRequest,
  options?: { [key: string]: any }
) {
  return request<boolean>("/api/sysArticle/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
```

### 业务开发

复制项目中的 `src/components/crud-table`的代码，到 `src/pages/example-page` 目录下，并且根据实际业务需求修改。

`crud-table`组件是一份伪代码，根据实际业务需求修改，其中以下属性会标记为异常，需要替换为真实的属性。

- `CrudModelVo`: 服务端的实体
- `getCrudVoByPage`: 分页查询接口
- `createCrudFunction`: 新建接口
- `updateCrudFunction`: 更新接口
- `deleteCrudFunction`: 删除接口

最终你会获取一份高质量的 CRUD 代码，并且可以在此基础上进行扩展，以下是效果图：

![示例页面](/development.png)

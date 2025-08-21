# 目录结构

项目的工程目录如下：

```bash
react-admin-vite
├── README.md # 项目说明文档
├── biome.json  # Biome 配置文件
├── config  # 项目配置目录
│   ├── antd-theme.ts  # antd主题配置
│   ├── openapi.js # 生成服务配置
│   ├── preferences.ts # 项目偏好设置
│   ├── side-menu-config.tsx # 侧边栏菜单配置
│   ├── sidebar-setting.ts  # 侧边栏主题配置
│   └── swagger.json
├── index.html # HTML 入口文件
├── mock  # 模拟接口数据目录
│   ├── api.mock.ts
│   └── user.mock.ts
├── package.json # 项目依赖配置
├── pnpm-lock.yaml  # pnpm 锁定文件
├── public  # 静态资源
│   └── logo.svg
├── src # 源代码目录
│   ├── app.tsx # 应用入口
│   ├── assets  # 静态资源
│   │   ├── icon.tsx # 聚合导出本地图标
│   │   ├── icons # 本地图标
│   │   │   ├── xxx.svg
│   │   │   └── ...
│   │   └── images # 图片资源
│   ├── components # 公共组件
│   │   ├── access-box # 权限容器 组件
│   │   ├── access-control # 权限控制 组件
│   │   ├── check-updates # 检查更新 组件
│   │   ├── crud-table # CRUD表格 组件
│   │   └── icon-font # 图标字体 组件
│   ├── constants # 全局常量
│   ├── hooks
│   │   ├── use-access # 获取权限信息
│   │   └── use-current-route # 获取当前路由信息
│   ├── layout
│   │   ├── basic-layout  # 侧边栏布局
│   │   ├── blank-layout # 空白布局
│   │   └── widgets # 布局小组件
│   ├── main.tsx # 主应用入口
│   ├── pages # 页面目录
│   │   ├── basic-features
│   │   ├── crud-table
│   │   ├── exception
│   │   ├── home
│   │   └── user
│   ├── router # 路由配置
│   │   ├── index.ts # 路由入口
│   │   ├── modules # 路由模块
│   │   ├── routes.ts # 路由配置
│   │   └── types.ts # 路由类型定义
│   ├── services # 接口服务目录
│   │   ├── fast-api # 生成的接口服务
│   │   └── index.ts # 服务入口
│   ├── store # 状态管理
│   │   ├── access-store.ts # 权限信息
│   │   ├── global-store.ts # 全局状态
│   │   └── index.ts # 状态入口
│   ├── styles # 样式目录
│   │   ├── global.css # 全局样式
│   │   ├── index.css # 入口样式
│   │   └── tailwind.css # tailwind 样式
│   ├── types # 类型定义目录
│   │   ├── index.d.ts
│   │   └── vite-env.d.ts
│   └── utils # 工具函数目录
│       ├── index.ts # 工具函数入口
│       └── request # 网络请求函数
├── tsconfig.json # TypeScript 配置
├── vercel.json # vercel 配置
└── vite.config.ts # vite 配置
```

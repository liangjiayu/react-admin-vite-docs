# 目录结构

项目的工程目录如下：

```bash
react-admin-vite
├── README.md                       # 项目说明文档
├── biome.json                      # Biome 代码检查工具配置
├── config/                         # 项目配置目录
│   ├── antd-theme.ts               # Ant Design 主题定制配置
│   ├── openapi.js                  # API 服务自动生成配置
│   ├── preferences.ts              # 项目偏好设置
│   ├── side-menu-config.tsx        # 侧边栏菜单配置
│   ├── sidebar-setting.ts          # 侧边栏配置
│   └── swagger.json
├── index.html                      # 应用 HTML 入口文件
├── mock/                           # 模拟数据目录
│   ├── api.mock.ts
│   └── user.mock.ts
├── package.json                    # 项目依赖
├── pnpm-lock.yaml                  # pnpm 依赖锁文件
├── public/                         # 静态资源目录
│   └── logo.svg
├── src/                            # 源代码目录
│   ├── app.tsx                     # 应用根组件
│   ├── assets/                     # 静态资源
│   │   ├── icon.tsx                # 本地图标聚合导出文件
│   │   ├── icons/                  # SVG 图标目录
│   │   └── images/                 # 图片资源目录
│   ├── components/                 # 公共组件库
│   │   ├── access-box/             # 权限容器组件
│   │   ├── access-control/         # 权限控制高阶组件
│   │   ├── check-updates/          # 应用更新检查组件
│   │   ├── crud-table/             # 通用表格组件
│   │   └── icon-font/              # 图标字体组件
│   ├── constants/                  # 全局常量定义
│   ├── hooks/                      # 自定义 Hook
│   │   ├── use-access/             # 权限信息 Hook
│   │   └── use-current-route/      # 当前路由信息 Hook
│   ├── layout/                     # 布局组件
│   │   ├── basic-layout/           # 侧边栏的主布局
│   │   ├── blank-layout/           # 空白布局
│   │   └── widgets/                # 布局辅助组件
│   ├── main.tsx                    # React 应用入口文件
│   ├── pages/                      # 页面组件目录
│   │   ├── basic-features/         # 基础功能演示页
│   │   ├── crud-table/             # 表格功能示例页
│   │   ├── exception/              # 异常页（404/403等）
│   │   ├── home/                   # 首页
│   │   └── user/                   # 用户相关页面
│   ├── router/                     # 路由配置
│   │   ├── index.ts                # 路由主入口
│   │   ├── modules/                # 路由模块拆分
│   │   ├── routes.ts               # 路由配置表
│   │   └── types.ts                # 路由类型定义
│   ├── services/                   # API 服务层
│   │   ├── fast-api/               # 自动生成的 API 服务
│   │   └── index.ts                # 服务聚合入口
│   ├── store/                      # 状态管理
│   │   ├── access-store.ts         # 权限状态管理
│   │   ├── global-store.ts         # 全局状态管理
│   │   └── index.ts                # 状态聚合入口
│   ├── styles/                     # 样式文件
│   │   ├── global.css              # 全局样式
│   │   ├── index.css               # 主样式文件
│   │   └── tailwind.css            # Tailwind 入口样式
│   ├── types/                      # 类型定义
│   │   ├── index.d.ts              # 全局类型声明
│   │   └── vite-env.d.ts           # Vite 环境变量类型
│   └── utils/                      # 工具函数
│       ├── index.ts                # 工具函数入口
│       └── request/                # 网络请求相关工具
├── tsconfig.json                   # TypeScript 配置
├── vercel.json                     # Vercel 部署配置
└── vite.config.ts                  # Vite 构建配置
```

# 路由和菜单

项目菜单提供两种生成的方式

- 根据路由配置自动生成菜单，主要配置 `handle` 属性。
- 自定义菜单配置，复杂项目优先推荐自定义菜单，路由和菜单数据隔离。

## 路由目录

```bash
src/router
├── modules                     # 路由分组
│   ├── alone-module.tsx        # 通常放置独立的页面
│   ├── basic-features.tsx      # 某个功能模块
│   └── core-modules.tsx        # 通常放置基础页面
├── index.ts                    # 路由入口
├── routes.ts                   # 路由配置
└── types.ts                    # 路由类型
```

## 路由定义

在 `modules` 目录创建模块文件，每个模块文件定义一组路由，示例代码如下：

```tsx
import { DashboardOutlined } from "@ant-design/icons";
import { lazy } from "react";
import type { AppRouteProps } from "@/router/types";

export default [
  {
    path: "/about-us",
    handle: {
      name: "关于我们",
      icon: <DashboardOutlined />,
    },
    children: [
      {
        path: "/about-us/case",
        Component: lazy(() => import("@/pages/about-us/case")),
        handle: {
          name: "关于我们-案例",
        },
      },
    ],
  },
] as AppRouteProps[];
```

## 新增页面

新增一个页面，你只需要添加一个路由及对应的页面组件即可。

### 添加路由

在对应的路由文件中添加一个路由对象，如下：

```tsx
import { HomeOutlined } from "@ant-design/icons";
import { lazy } from "react";
import type { AppRouteProps } from "@/router/types";

export default [
  {
    path: "/home",
    Component: lazy(() => import("@/pages/home")),
    handle: {
      name: "首页",
      icon: <HomeOutlined />,
    },
  },
] as AppRouteProps[];
```

### 添加页面组件

在`@/pages/home/`下，新增一个`index.tsx`文件，如下：

```tsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

### 验证

到这里页面已添加完成，访问 http://localhost:5555/home 出现对应的页面即可。

## 路由配置

每个路由目录下文件内容的结构和 React Router 的 [Route](https://reactrouter.com/en/main/route/route) 路由配置格式一致。

路由配置项主要在对象路由的 `handle` 属性中，以下为常用的配置项：

```tsx {5-8}
const routes = [
  {
    path: "/home",
    Component: <div>Home Page</div>,
    handle: {
      title: "首页",
      icon: <HomeOutlined />,
    },
  },
];
```

::: details 路由 handle 配置类型定义

```ts
type RouteMeta = {
  /**
   * 路由名称，用于页面标题 和 侧栏菜单名称
   */
  name?: string;
  /**
   * 菜单图标，用于侧栏菜单图标显示，默认二级菜单不适用
   */
  icon?: ReactNode;
  /**
   * 权限配置，需要预先配置权限
   */
  access?: string;
  /**
   * 是否在菜单中隐藏，用于控制某些路由不在侧边栏菜单中显示，包括子路由
   */
  hideInMenu?: boolean;
  /**
   * 外部链接打开方式
   */
  target?: "_blank" | "_self";
};
```

:::

### name

- 类型：`string`
- 默认值：`undefined`

路由名称，用于页面标题 和 侧栏菜单名称。

### icon

- 类型：`ReactNode`
- 默认值：`undefined`

菜单图标，用于侧栏菜单图标显示，默认二级菜单不适用。

### access

- 类型：`string`
- 默认值：`undefined`

权限配置，需要预先配置权限。

### hideInMenu

- 类型：`boolean`
- 默认值：`false`

是否在菜单中隐藏，用于控制某些路由不在侧边栏菜单中显示，包括子路由。

### target

- 类型：`'_blank' | '_self'`
- 默认值：`undefined`

外部链接打开方式。

## 自定义菜单

默认的自定义菜单配置文件在 `/config/side-menu-config`，以下为示例配置：

```tsx
import {
  DashboardOutlined,
  FormOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import type { MenuDataItem } from "@ant-design/pro-components";

const Side_Menu_Config: MenuDataItem[] = [
  {
    path: "/crud-table",
    name: "CRUD表格",
    icon: <DashboardOutlined />,
  },
  {
    path: "/basic-features",
    name: "基础功能",
    icon: <FormOutlined />,
    children: [
      {
        path: "/basic-features/icon-feature",
        name: "图标功能",
      },
      {
        path: "/basic-features/style-feature",
        name: "样式功能",
      },
      {
        path: "/basic-features/store-feature",
        name: "状态管理",
      },
    ],
  },
  {
    path: "/exception",
    name: "异常页",
    icon: <WarningOutlined />,
    children: [
      {
        path: "/exception/403",
        name: "403",
      },
      {
        path: "/exception/404",
        name: "404",
      },
      {
        path: "/exception/500",
        name: "500",
      },
    ],
  },
];

export default Side_Menu_Config;
```

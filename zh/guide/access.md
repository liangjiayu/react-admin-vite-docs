# 权限管理

## 简介

项目提供了一种简单、易用、通用的权限解决方案，与 [Ant Pro](https://pro.ant.design/zh-CN/docs/authority-management/) 的方案类似。

以下是常见的两种场景：

- 用户在页面看到元素和操作有所区别。
- 用户对页面的访问权限有所区别。

## 初始化权限标识

项目的权限依赖初始化数据，建议根据初始化数据计算出权限标识。

默认的权限配置在 `src/store/access-store` 中，你可根据实际情况调整代码，导出自定义的权限标识。

以下是示例代码：

```ts
import { create } from "zustand";
import { useGlobalStore } from "./global-store";

type AccessState = {
  isAdmin: boolean;
  isUser: boolean;
  canReadFoo: boolean;
  canUpdateFoo: boolean;
};

type AccessActions = {
  initAccess: () => Promise<void>;
  canDeleteFoo: (bool: boolean) => boolean;
};

export const useAccessStore = create<AccessState & AccessActions>((set) => ({
  isAdmin: false,
  isUser: false,
  canReadFoo: false,
  canUpdateFoo: false,

  canDeleteFoo: (bool) => {
    return bool;
  },

  /**
   * 初始化权限标识，依赖全局状态的属性。
   * 建议返回的每个权限标识都是布尔值。
   */
  initAccess: async () => {
    const currentUser = useGlobalStore.getState().currentUser;
    if (!currentUser) {
      return;
    }
    if (currentUser?.access === "admin") {
      set({
        isAdmin: true,
        canReadFoo: true,
        canUpdateFoo: true,
      });
    }
    if (currentUser?.access === "user") {
      set({ isUser: true });
    }
  },
}));
```

## 元素权限控制

通过 `useAccess`获取权限标识，然后根据标识动态控制元素显示和隐藏。

以下是示例代码：

```tsx
import { Button } from "antd";
import AccessBox from "@/components/access-box";
import useAccess from "@/hooks/use-access";

const PageA = () => {
  const { isAdmin, isUser, canReadFoo, canUpdateFoo, canDeleteFoo } =
    useAccess();

  return (
    <div className="flex gap-3 items-center">
      <AccessBox accessible={isAdmin}>
        <Button>我是管理员</Button>
      </AccessBox>
      <AccessBox accessible={isUser}>
        <Button>我是普通用户</Button>
      </AccessBox>
      <AccessBox accessible={canReadFoo} fallback={<div>无读取权限</div>}>
        <Button>我能读取的</Button>
      </AccessBox>
      <AccessBox accessible={canUpdateFoo} fallback={<div>无更新权限</div>}>
        <Button>我能更新的</Button>
      </AccessBox>
      <AccessBox
        accessible={canDeleteFoo(isAdmin)}
        fallback={<div>无删除权限</div>}
      >
        <Button>我能删除的</Button>
      </AccessBox>
    </div>
  );
};

export default PageA;
```

## 路由权限控制

路由的权限控制是通过配置路由的 `access` 属性实现，属性依赖 `access-store`的权限标识。

用户访问页面时，如果没有权限，则会显示 403 组件，需要自定义组件，可直接调整 `src/components/access-control` 的代码。

以下是示例代码：

```tsx
export default [
  {
    path: "/admin-access",
    element: <div>只有admin才可以看到</div>,
    handle: {
      name: "权限页面A",
      access: "isAdmin", // [!code ++]
    },
  },
  {
    path: "/user-access",
    element: <div>只有admin才可以看到</div>,
    handle: {
      name: "权限页面A",
      access: "isUser", // [!code ++]
    },
  },
];
```

## 菜单权限控制

项目默认是不会对菜单进行权限过滤的，需要隐藏菜单 最简单的方式是调整 `generateMenuItems`函数。

以下是示例代码：

```ts {2-14}
export const generateMenuItems = (routes: AppRouteProps[]): MenuDataItem[] => {
  const accessInfo = useAccessStore.getState();

  return routes
    .filter((route) => {
      const routeAccess = route.handle?.access;
      if (!routeAccess) {
        return true;
      }
      if (routeAccess in accessInfo) {
        // @ts-ignore
        return accessInfo[routeAccess];
      }
    })
    .filter((route) => {
      /**
       * 1. 过滤 没有path属性的数据
       * 2. 过滤掉 hideInMenu为true的数据
       */
      return route.path && !route.handle?.hideInMenu;
    })
    .map((route) => {
      let children: MenuDataItem[] | undefined;
      if (route.children) {
        children = generateMenuItems(route.children) || [];

        /** 子菜单为空，需要设置为undefined */
        if (children.length === 0) {
          children = undefined;
        }
      }

      return {
        path: route.path,
        icon: route?.handle?.icon,
        name: route?.handle?.name,
        target: route.handle?.target,
        children,
      };
    });
};
```

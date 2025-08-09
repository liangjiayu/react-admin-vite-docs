# 网络请求

## OpenAPI

项目和后端的交互主要通过 OpenAPI 的方式进行，服务端需要接入[swagger](https://swagger.io/)，前端执行脚本生成相关的请求代码。

### 后端接入 OpenAPI

后端使用的是 Java 或者 Python 的话，直接使用官方最新的 SDK 即可，具体接入方式可以参考官方文档。

- 后端会生成一份配置，复制这份配置的地址到项目中，如 [示例文件](https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json)。
- 协议的版本建议使用 3.0.0 以上的，并且访问地址的不能有鉴权。
- 协议的 `operationId`，建议全局唯一，并且有语义化的，通常为函数的名称。

### 前端生成请求文件

在 `/config/openapi.js`文件中，配置相关代码，以下是示例代码：

```js
generateService({
  /** 协议地址，支持本地和远程URL */
  schemaPath:
    "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
  /** 自定义请求库 */
  requestLibPath: "import request from '@/utils/request'",
  /** 项目名称 */
  projectName: "ant-design-pro",
  /** 命名空间 */
  namespace: "OpenAPI",
  /** 生成的文件夹的路径 */
  serversPath: join(__rootDir, "src/services"),
  /** response中数据字段 */
  dataFields: ["data"],
  /** 模板文件、请求函数采用小驼峰命名 */
  isCamelCase: false,
});
```

执行 `npm run openapi`命令，即可生成请求文件。

## request 函数

项目中的请求函数是基于`axios`的简单封装，可根据实际情况调整函数，具体配置如下：

::: details 函数详情

```ts
import { message } from "antd";
import axios, { type AxiosRequestConfig } from "axios";

/**
 * axios中文文档
 * @see https://www.axios-http.cn/docs/req_config
 */
const instance = axios.create({
  // baseURL:  '/',
});

/** 请求拦截器 */
// instance.interceptors.request.use(
//   (config) => {},
//   (error) => {}
// );

/** 响应拦截器 */
instance.interceptors.response.use(
  (response) => {
    /** 根据服务端的数据结构，统一处理异常的情况 */
    if (response?.data?.code !== 0) {
      return Promise.reject(response.data);
    }
    /** 有data的数据结构，直接返回主体数据 */
    if (response?.data?.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const serverMsg = error?.response?.data?.message;

    /** 状态码为401，用户未认证，跳转到登录页面 */
    if (error.status === 401) {
      window.location.href = "/user/login";
      return;
    }
    /** 优先使用业务错误消息 */
    message.error(serverMsg || error.message || "请求失败!");
    return Promise.reject(error);
  }
);

async function request<T>(url: string, options?: AxiosRequestConfig) {
  return instance.request<T, T>({
    url,
    ...options,
  });
}

export default request;
```

:::

### useRequest

项目默认安装了`ahooks`，建议使用`useRequest`进行网络请求，使用方式如下：

```tsx
import { useRequest } from "ahooks";

export default () => {
  const { data, error, loading } = useRequest(async () => {
    return await fetch("/api/user/list");
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data.name}</div>;
};
```

## 服务端接口规范

接口请求并不一定是 100% 成功的，但是正常情况下我们预期接口都是成功的，只有网络异常或者权限等问题的情况下才会出现接口请求失败。所以我们通常期望的是代码逻辑只需要考虑成功的情况，对于异常情况只要在一个地方统一处理即可。

为了方便前端调试做接口的转发，我们推荐后端接口路径统一添加`/api`的前缀。

### 统一的接口规范

以下是建议的接口规范，根据实际情况进行调整：

```json
{
  "code": 0, // 状态码，成功为0，其他情况为异常
  "message": "success", // 异常信息
  "data": {} // 结果数据主体
}
```

#### 统一的分页规范

以下是建议的分页规范，根据实际情况进行调整：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [], // 数据列表
    "total": 0 // 分页总数
  }
}
```

## 代理与跨越

开发过程中，遇到跨越问题，最简单的方式有两种解决方案

- 服务端配置 CORS
- 使用代理服务

可在 `/vite.config.ts` 配置文件中，修改`server.proxy`的配置，即可实现代理，注意生产环境是不会生效的。

```ts
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：
      // http://localhost:5173/foo
      // -> http://localhost:4567/foo
      "/foo": "http://localhost:4567",
      // 带选项写法：
      // http://localhost:5173/api/bar
      // -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

## MOCK 服务

项目使用的是 [vite-plugin-mock-dev-server](https://vite-plugin-mock-dev-server.netlify.app/zh/) 插件实现 mock 功能。

- `/mock/**/*.mock.{js,ts}` 这些文件会生成 mock 服务。
- `/src/pages/**/_mock.{js,ts}`，为了兼容`antd-pro`，这些文件也会生成 mock 服务。

以下是使用示例：

```ts
import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock({
  url: "/api/user",
  body: {
    name: "Mark",
    age: 18,
  },
});
```

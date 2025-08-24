# 配置与主题

## 环境变量配置

项目的环境变量配置位于应用目录下的 `.env`、`.env.development`、`.env.production`。

规则与 [Vite Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html) 一致。格式如下：

```bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

::: tip

只有以 `VITE_` 开头的变量会被嵌入到客户端侧的包中，你可以在项目代码中这样访问它们：

```ts
console.log(import.meta.env.VITE_PROT);
```

:::

## 环境配置说明

::: code-group

```bash [.env]
# 网站标题
VITE_SITE_APP_TITLE="React Admin Vite"

# 端口号
VITE_PORT=5210

# 接口代理地址
VITE_PROXY_URL="https://fast-api.liangjiayu.cn"

# 是否开启mock服务
VITE_MOCK_ENABLE=true
```

```bash [.env.development]
# 开发环境配置
```

```bash [.env.production]
# 是否开启mock服务
VITE_MOCK_ENABLE=false
```

:::

## 新增环境变量

新增一个可动态修改的配置项，只需要按照如下步骤即可：

1. 在环境配置文件，例如 `.env` 新增一个以 `VITE_` 开头的变量，如：
   ```bash
   VITE_APP_NAMESPACE="admin-web"
   ```
2. 在 `src/types/vite-env.d.ts` 文件中新增对应的类型：

   ```ts
   /// <reference types="vite/client" />
   /// <reference types="vite-plugin-svgr/client" />

   interface ImportMetaEnv {
     readonly VITE_SITE_APP_TITLE: string;
     readonly VITE_PORT: string;
     readonly VITE_PROXY_URL: string;
     readonly VITE_MOCK_ENABLE: string;
     readonly VITE_APP_NAMESPACE: string; // [!code ++]
   }

   interface ImportMeta {
     readonly env: ImportMetaEnv;
   }
   ```

3. 通过 `import.meta.env.VITE_APP_NAMESPACE` 即可获取配置的值。

## 组件主题配置

如果想要自定义主题请先阅读 antd 的 [色彩](https://ant.design/docs/spec/colors-cn) 和 [定制主题](https://ant.design/docs/react/customize-theme-cn) 章节。

项目的组件主题配置文件在 `config/antd-theme.ts` ，通过 [主题编辑器](https://ant.design/theme-editor-cn) 预览主题和配置，然后拷贝配置到项目中。

以下是简单的示例代码：

```ts
const customAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#722ed1",
    borderRadius: 12,
    wireframe: false,
  },
};
```

## 侧边栏配置

项目侧边栏布局使用 [ProLayout 组件](https://procomponents.ant.design/components/layout)，配置文件位于 `config/sidebar-setting.ts`，你可以根据需求修改侧边栏配置。

### 简单调整

可使用 [Pro 站点](https://preview.pro.ant.design) 的右侧抽屉来帮助你完成布局相关的整体风格、主题色、导航模式、内容区域宽度、固定 Header、固定侧边菜单、色弱模式等配置选择，然后拷贝配置到项目中。
![](https://gw.alipayobjects.com/mdn/rms_30ab81/afts/img/A*NhA4To_Ccn8AAAAAAAAAAABkARQnAQ)

### 手动调整

建议大部分场景请查看文档，手动完善侧边栏配置，因为可视化界面只能覆盖少量的场景。

以下是使用 token 示例代码：

```ts
const Settings: ProLayoutProps = {
  navTheme: "light",
  layout: "mix",
  contentWidth: "Fluid",
  token: {
    colorBgAppListIconHover: "rgba(0,0,0,0.06)",
    colorTextAppListIconHover: "rgba(255,255,255,0.95)",
    colorTextAppListIcon: "rgba(255,255,255,0.85)",
    sider: {
      colorBgCollapsedButton: "#fff",
      colorTextCollapsedButtonHover: "rgba(0,0,0,0.65)",
      colorTextCollapsedButton: "rgba(0,0,0,0.45)",
      colorMenuBackground: "#004FD9",
      colorBgMenuItemCollapsedElevated: "rgba(0,0,0,0.85)",
      colorMenuItemDivider: "rgba(255,255,255,0.15)",
      colorBgMenuItemHover: "rgba(0,0,0,0.06)",
      colorBgMenuItemSelected: "rgba(0,0,0,0.15)",
      colorTextMenuSelected: "#fff",
      colorTextMenuItemHover: "rgba(255,255,255,0.75)",
      colorTextMenu: "rgba(255,255,255,0.75)",
      colorTextMenuSecondary: "rgba(255,255,255,0.65)",
      colorTextMenuTitle: "rgba(255,255,255,0.95)",
      colorTextMenuActive: "rgba(255,255,255,0.95)",
      colorTextSubMenuSelected: "#fff",
    },
    header: {
      colorBgHeader: "#004FD9",
      colorBgRightActionsItemHover: "rgba(0,0,0,0.06)",
      colorTextRightActionsItem: "rgba(255,255,255,0.65)",
      colorHeaderTitle: "#fff",
      colorBgMenuItemHover: "rgba(0,0,0,0.06)",
      colorBgMenuItemSelected: "rgba(0,0,0,0.15)",
      colorTextMenuSelected: "#fff",
      colorTextMenu: "rgba(255,255,255,0.75)",
      colorTextMenuSecondary: "rgba(255,255,255,0.65)",
      colorTextMenuActive: "rgba(255,255,255,0.95)",
    },
  },
};
```

## Tailwind 主题配置

项目的 tailwind 主题配置位于 `src/styles/tailwind.css`，具体用法请查看 [tailwind 主题](https://tailwindcss.com/docs/theme)。

以下是示例代码：

```css
@theme {
  --color-primary: #2166f7;
  --radius-primary: 10px;
}
```

```tsx
<div className="bg-primary rounded-primary" />
```

## 偏好设置

项目的偏好设置位于 `config/preferences`，你可以根据需求修改配置。

```ts
export default {
  /** 是否开启检查更新 */
  enableCheckUpdates: true,
  /** 检查更新轮询时间，单位为分钟 */
  checkUpdatesInterval: 15,
};
```

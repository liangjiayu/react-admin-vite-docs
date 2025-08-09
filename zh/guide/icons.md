# 图标

项目支持多种的图标使用方式，常见的中后台系统，关于图标有的两个问题。

- 如何找到高质量的图标，并且支持 Tree Shaking。
- 如何自定义图标，并且可预览和编辑。

## 为什么使用 SVG

- Tree Shaking，只打包使用的图标。
- 支持多色图标。
- 矢量可无限缩放。
- 在低端设备上 SVG 有更好的清晰度。
- 支持 `font-size`和`color`，可以像字体一样调整样式。

## 项目支持的图标库

降低选择图标的成本，项目默认支持了以下图标库，优先从这些图标库中寻找，可保持图标风格的一致性。

### ant design 图标库

项目默认安装 `@ant-design/icons`，可以直接使用 [Ant Design Icons](https://ant.design/components/icon-cn) 提供的图标：

```tsx
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";

const App = () => {
  return (
    <>
      <StarOutlined />
      <StarFilled />
      <StarTwoTone />
    </>
  );
};
export default App;
```

### lucide 图标库

项目默认安装 `lucide-react`，可以直接使用 [Lucide](https://lucide.dev/icons) 提供的图标：

```tsx
import { AppWindowMac, Apple, Archive } from "lucide-react";

const App = () => {
  return (
    <>
      <AppWindowMac />
      <Apple />
      <Archive />
    </>
  );
};
export default App;
```

## 如何自定义图标

### 使用 iconfont

1. [iconfont](https://www.iconfont.cn/) 上找到需要的图标，添加到项目中。
2. 使用 Symbol 模式，获取平台生成的代码地址，例如：`//at.alicdn.com/t/c/font_4973500_ims3nla04e.js`。
3. 更新项目的 `icon-font` 组件的配置地址。

以下示例代码：

```tsx
import IconFont from "@/components/icon-font";

const App = () => {
  return (
    <>
      <IconFont type="icon-dyanjing" />
      <IconFont type="icon-caidan" />
      <IconFont type="icon-anquan" />
    </>
  );
};
export default App;
```

### 使用本地 SVG

1. 将 SVG 文件放置到 `src/assets/icons` 目录下，建议`size`调整为 `1em`。
2. 在 `scr/assets/icon.tsx` 中引入 SVG 文件，并导出。

以下是统一导出的示例代码：

```tsx
import SkillIconsDartLight from "./icons/SkillIconsDartLight.svg?react";
import SkillIconsDiscord from "./icons/SkillIconsDiscord.svg?react";
import SkillIconsFastapi from "./icons/SkillIconsFastapi.svg?react";

export { SkillIconsDartLight, SkillIconsDiscord, SkillIconsFastapi };
```

以下是使用的示例代码：

```tsx
import {
  SkillIconsDartLight,
  SkillIconsDiscord,
  SkillIconsFastapi,
} from "@/assets/icon";

const App = () => {
  return (
    <>
      <SkillIconsDartLight />
      <SkillIconsDiscord />
      <SkillIconsFastapi />
    </>
  );
};
export default App;
```

## 关于 Iconify

Iconify​​ 是一个开源的图标框架，旨在统一多个流行图标集的访问和使用方式。它通过提供统一的 API 和格式，将来自 100+ 图标库（如 Material Design Icons、Font Awesome、Tabler Icons 等）的超过 20 万个图标整合到一个平台上，开发者无需为不同图标集维护多套代码。

以下是使用示例代码：

```tsx
import { Icon } from "@iconify/react";

const App = () => {
  return (
    <>
      <Icon icon="vscode-icons:file-type-asp" />
      <Icon icon="vscode-icons:file-type-bicep" />
      <Icon icon="streamline-emojis:airplane" />
    </>
  );
};
export default App;
```

#### Iconify 在线版

- 图标闪烁，图标请求服务器存在延迟，用户会先看到一个空白区域，然后图标才出现。
- Iconify 服务器不可靠，基于项目稳健性考虑，不应该在项目的正式环境中使用 Iconify 的服务器。

#### Iconify 离线版

- 可通过 [unplugin-icons](https://github.com/unplugin/unplugin-icons) 插件进行动态打包。
- 基于各种原因，项目默认不支持 Iconify 离线使用。
- 内置的图标库，可满足大部分场景，并且使用体验好。
- 当需要自定义图标的时候，自定义方案也满足大部分的需求。
- 一般情况需要某个心意的图标，下载到本地使用，成本是最低的，而高频使用某个图标库的时候，应该去使用他们的官方版。

## 图标资源

- [阿里图标库](https://www.iconfont.cn/)
- [Iconify](https://icon-sets.iconify.design/)
- [lucide 的设计原则](https://lucide.dev/guide/design/icon-design-guide)

# 检查功能

## 概述

当网站重新部署，有更新内容时，客户端需要检查更新获取最新的版本。

项目通过定时检查更新提供了这一功能，在 `preferences.ts` 文件中配置 checkUpdatesInterval 和 enableCheckUpdates 字段，以开启和设置检查更新的时间间隔（单位：分钟）。

```ts
export default {
  /** 是否开启检查更新 */
  enableCheckUpdates: true,
  /** 检查更新轮询时间，单位为分钟 */
  checkUpdatesInterval: 15,
};
```

## 效果

检测到新版本时，系统会发送一个通知，询问用户是否刷新页面：

![check-updates](/check-updates.png)

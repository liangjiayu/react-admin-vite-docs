import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React Admin Vite",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  lang: "zh-CN",

  locales: {
    root: { label: "简体中文", lang: "zh-CN" },
  },
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "指南", link: "/zh/guide/introduction" },
      {
        text: "演示",
        items: [
          { text: "基础版本", link: "https://admin.liangjiayu.cn/" },
          {
            text: "演示版本",
            link: "https://react-admin-vite-mtrzw6h4z-liangjiayus-projects.vercel.app/",
          },
        ],
      },
    ],

    sidebar: {
      "/zh/guide/": [
        {
          text: "简介",
          items: [
            { text: "介绍", link: "/zh/guide/introduction" },
            { text: "快速开始", link: "/zh/guide/getting-started" },
            // { text: "新手需知", link: "/zh/guide/getting-started" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "本地开发", link: "/zh/guide/development" },
            { text: "目录结构", link: "/zh/guide/folder" },
            { text: "路由和菜单", link: "/zh/guide/route" },
            { text: "样式", link: "/zh/guide/styles" },
            { text: "图标", link: "/zh/guide/icons" },
            { text: "网络请求", link: "/zh/guide/request" },
            { text: "配置与主题", link: "/zh/guide/settings" },
            { text: "构建与部署", link: "/zh/guide/deploy" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "权限管理", link: "/zh/guide/access" },
            { text: "状态管理", link: "/zh/guide/state-manage" },
            { text: "工程规范", link: "/zh/guide/standard" },
            { text: "检查更新", link: "/zh/guide/check-updates" },
          ],
        },
      ],
      "/zh/reference/": [
        {
          text: "参考",
          items: [{ text: "站点配置", link: "/zh/reference/site-config" }],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/liangjiayu/react-admin-vite",
      },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    footer: {
      copyright: `Copyright © 2020-${new Date().getFullYear()}`,
      message: "基于 MIT 许可发布",
    },

    outline: {
      label: "页面导航",
    },
    returnToTopLabel: "回到顶部",
  },
});

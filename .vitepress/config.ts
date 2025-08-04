import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/zh/guide/getting-started" },
      { text: "参考", link: "/zh/reference/site-config" },
    ],

    sidebar: {
      "/zh/guide/": [
        {
          text: "简介",
          items: [
            { text: "快速开始", link: "/zh/guide/getting-started" },
            { text: "部署", link: "/zh/guide/deploy" },
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
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

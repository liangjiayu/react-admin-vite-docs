# 构建与部署

## 构建

项目开发完成之后，执行以下命令进行构建：

```bash
pnpm run build
```

构建打包成功之后，会在根目录生成对应的应用下的 `dist` 文件夹，里面就是构建打包好的文件。

## Vercel 部署

1. 将你的代码推送到远程仓库（GitHub，GitLab，Bitbucket）
2. [导入你的 Vite 仓库](https://vercel.com/new/) 到 Vercel
3. Vercel 会检测到你正在使用 Vite，并会为你的部署开启相应的正确配置。
4. 你的应用被部署好了！

默认 Vercel 的配置已经满足部署的需求，以下是项目的配置：

- 安装依赖：`pnpm install`
- 构建命令：`pnpm run build`
- 输出目录：`dist`

以下是接口代理和路由重定向的配置：

:::info vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://fast-api.liangjiayu.cn/api/:path*"
    },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

:::

## Nginx 部署

nginx 作为最流行的 web 容器之一，配置和使用相当简单，只要简单的配置就能拥有高性能和高可用。

- 手动把产物上传到服务器的指定目录。
- 配置 nginx 启动服务。

以下是示例配置：

```nginx
server {
    listen 5310;
    server_name  localhost;

    # 静态文件存放路径
    root /www/wwwroot/react-admin-vite-nginx;

    location / {
        # 用于单页面路由重定向，配合 browserHistory 模式使用
        try_files $uri $uri/index.html /index.html;
    }
    location /api {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        # 代理接口地址
        proxy_pass http://fast-api.liangjiayu.cn;
        add_header Access-Control-Allow-Origin *;
    }
}

```

## BFF 部署方案

### 简介

这是为项目设计一套 `BFF` 的部署方案，流程有些复杂并且不具备通用性，可以参设计考思路。

- 可以充分利用`CDN`的优点，加快静态资源的加载速度。
- 前端拥有独立服务端能力，具备独立部署、接口代理、路由重定向等功能。
- 配合 `Github Action` 可实现自动化部署。

### 前置准备

需要自行了解和购买阿里云相关的产品。

- CDN：用于资源缓存和加速。
- OSS：用于静态资源存储。
- AK：阿里云的访问密钥，用于上传静态资源到 OSS。
- 服务器：用于部署 `BFF` 服务。

### Bff 服务

推荐使用`midway`框架构建`BFF`服务，具体代码可以参考[react-admin-vite-bff](https://github.com/liangjiayu/react-admin-vite-bff)。

- 服务部署可以根据公司基建选择`Docker`、`PM2`等。
- 路由重定向和接口代理可以参考[项目配置](https://github.com/liangjiayu/react-admin-vite-bff/blob/main/src/config/config.default.ts)。

### GitHub Action 配置

在仓库的 `Settings -> Secrets -> Actions` 中添加以下密钥：

| Secret 名称       | 作用说明            |
| :---------------- | ------------------- |
| ACCESS_KEY_ID     | 用于上传资源 的 AK  |
| ACCESS_KEY_SECRET | 用于上传资源 的 AKS |

### 资源路径设计

- CDN 设计为：`/域名/项目名称/环境标识/`，如 `https://cdn.xxxx.com/react-admin-vite/prod/`
- OSS 设计：所有项目的产物都放在同一个`bucket`里面，如 `fast-fe-static/react-admin-vite/prod/`
- CDN 与 bucket 绑定，BFF 服务首页可以直接访问路径获取 `index.html`的内容。

### 部署流程

可以参考 [workflows-deploy](https://github.com/liangjiayu/react-admin-vite/blob/main/.github/workflows/deploy.yml) 的代码，以下是流程说明：

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        # 安装 pnpm
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        # 安装 node22
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"
        # 安装依赖
      - name: Install dependencies
        run: pnpm install
        # 构建项目，base设置为：完整的资源路径
      - name: Build project
        run: pnpm vite build --base="${{ env.CDN_URL }}/${{ env.APP_NAME }}/${{ env.DEPLOY_ENV }}/"
        # 将构建产物上传到 OSS，路径为：/项目名称/环境标识/
      - name: Upload files to OSS
        uses: JohnGuan/oss-upload-action@main
        with:
          key-id: ${{ secrets.ACCESS_KEY_ID }}
          key-secret: ${{ secrets.ACCESS_KEY_SECRET }}
          region: oss-cn-guangzhou
          bucket: fast-fe-static
          assets: |
            dist/**:/${{ env.APP_NAME }}/${{ env.DEPLOY_ENV }}/

      - name: Deploy Success
        run: |
          echo "✅ 已部署到 ${{ env.DEPLOY_ENV  }} 环境"
          echo "访问地址: ${{ env.CDN_URL }}/${{ env.APP_NAME }}/${{ env.DEPLOY_ENV }}/"
```

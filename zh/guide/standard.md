# 工程规范

## 作用

项目使用各种工具来规范代码风格，保证代码的一致性和可读性，项目规范的原则是严谨而不严格。

- 使用 `vscode` 插件，在编程的时候实时检查代码风格。
- 使用脚本工具，在提交代码的时候检查代码风格。

## vscode 插件

- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - 代码检查和格式化
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - 单词语法检查

## Biome

> Web 项目开发的一体化工具链，格式化代码、修复错误，不止于此，就在一瞬间！

biome 是一个基于 `rust` 的现代化工具，主要用于格式化代码、修复错误，现阶段的功能能满足大部分的需求。

### 命令

```bash
pnpm run check # 检查代码和代码格式
pnpm run check:fix  # 格式化代码和修复错误
```

## ESLint

eslint 和 prettier 依然是最热门的代码检查和格式化工具，项目默认不支持，推荐一份非常优秀的 [ESLint 配置](https://github.com/antfu/eslint-config)。

以下是最简单的使用方式：

```bash
pnpm i -D eslint @antfu/eslint-config
```

```ts
// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu();
```

## GitHook

项目使用 `husky` + `lint-staged`，在提交代码的时候进行代码风格校验。

### pre-commit

提交代码的时候，会检查的暂存区的文件，自动执行 `pnpm check:fix`，自动格式化代码和修复代码。如果存在错误，则无法提交代码。

### commit 规范

项目默认没有使用 [commitlint](https://github.com/conventional-changelog/commitlint) 工具，可根据团队需求自行添加。

一份常见的 commit 规范：

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型修改

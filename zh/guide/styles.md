# 样式

项目支持多种样式方案，以下简要说明各种样式方案的优缺点。

- 强烈推荐使用 [Tailwind CSS](https://tailwindcss.com/)。
- Css Modules 和 CssInJs 只建议某些情况下使用，比如需要修改 antd 组件样式时。

## Tailwind CSS

强烈推荐使用，原子化方案，可以极大提升开发效率，但需要一定学习成本。

```tsx
<div className="relative">
  <div className="bg-gray-500 rounded-[6px] pt-[58%]" />
  <div className="text-[15px] line-clamp-2 mt-2 cursor-pointer hover:text-blue-600">
    标题标题标题
  </div>
</div>
```

## CSS Modules

> 不建议使用，只建议在需要修改 antd 组件样式时使用。

在 Vite 中任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件，导入这样的文件会返回一个相应的模块对象。

```less
.custom-steps {
  :global {
    .ant-steps-item-description {
      color: red !important;
    }
  }
}
```

```tsx
import moduleStyles from "./index.module.less";

const ModifyAntdStyle = () => {
  return <Steps className={moduleStyles["custom-steps"]} />;
};
```

## CSS IN JS

> 不建议使用，只建议在需要修改 antd 组件样式时使用。

项目使用的是 [antd-style](https://github.com/ant-design/antd-style)，具体用法和 `emotion/css` 类似。

```tsx
const useStyles = createStyles({
  "custom-steps": {
    "& .ant-steps-item-description": {
      color: "red !important",
    },
  },
});

const ModifyAntdStyle = () => {
  const { styles: cijStyles } = useStyles();
  return <Steps className={cijStyles["custom-steps"]} />;
};
```

## BEM

> 不建议使用，当设计项目全局的组件库，可尝试使用。

```less
.ui-button {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 4px;

  &__icon {
    margin-right: 0.5em;
    vertical-align: middle;
  }

  &--primary {
    background-color: #4285f4;
    color: white;
    border: 1px solid #4285f4;

    &:hover {
      background-color: darken(#4285f4, 10%);
      border-color: darken(#4285f4, 10%);
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--large {
    padding: 0.75em 1.5em;
    font-size: 1.25rem;
  }
}
```

```tsx
const App = () => {
  return (
    <div>
      <button className="ui-button ui-button--primary">
        <span className="ui-button__icon">🔥</span>
        Primary Button
      </button>
      <button className="ui-button ui-button--disabled">Disabled Button</button>
      <button className="ui-button ui-button--large">Large Button</button>
    </div>
  );
};
```

## CSS 预处理器

> 需要编写大量的样式，可以使用，可尝试使用 @scope 选择器，原生样式隔离方案。

```less
@scope (.css-case-container) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1560px;

  :scope {
    @media (min-width: 1600px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .grid-item {
    position: relative;

    .thumbnail {
      background-color: #6b7280;
      border-radius: 6px;
      padding-top: 58%;
    }

    .title {
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      margin-top: 8px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        color: #155dfc;
      }
    }

    .meta-info {
      display: flex;
      color: #9ca3af;
      font-size: 13px;
      gap: 8px;
      margin-top: 4px;
    }
  }
}
```

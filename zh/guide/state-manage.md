# 状态管理

## 简介

中后台场景中，大部分情况都不需要使用复杂的状态管理工具，但是当业务复杂度增加时，状态管理会变得复杂，这时候就需要使用状态管理工具来管理状态。

文档以 `todo-list` 作为示例，简单介绍 `react-context` 和 `zustand` 这两个状态管理工具。

## react-context

- 大部分场景优先使用，可结合`hook`使用，可快速获取上下文的信息。
- 复杂场景会有性能问题，可结合`use-context-selector`来解决性能问题。

以下是核心代码代码，完整代码可以查看 [todo-list](https://github.com/liangjiayu/react-admin-vite/blob/main/src/pages/basic-features/store-feature/todo-list/context.tsx)。

::: info context.tsx

```tsx
import { noop } from "lodash-es";
import { createContext, useContext, useState } from "react";
import type { FilterMode, TodoItem } from "../types";

export type TodosProviderProps = {
  children: React.ReactNode;
};

export type TodoContextValue = {
  todos: TodoItem[];
  mode: FilterMode;
  setMode: (mode: FilterMode) => void;
  addItem: (title: string) => void;
  updateItem: (id: number, title: string) => void;
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
  removeAllItems: () => void;
  toggleAllItem: () => void;
  removeCompletedItems: () => void;
};

export const TodoContext = createContext<TodoContextValue>({
  todos: [],
  mode: "ALL",
  setMode: noop,
  addItem: noop,
  updateItem: noop,
  removeItem: noop,
  toggleItem: noop,
  removeAllItems: noop,
  toggleAllItem: noop,
  removeCompletedItems: noop,
});

export function TodosProvider({ children }: TodosProviderProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [mode, setMode] = useState<FilterMode>("ALL");

  const addItem = (title: string) => {};

  const updateItem = (id: number, title: string) => {};

  const removeItem = (id: number) => {};

  const toggleItem = (id: number) => {};

  const removeAllItems = () => {};

  const toggleAllItem = () => {};

  const removeCompletedItems = () => {};

  return (
    <TodoContext.Provider
      value={{
        todos,
        mode,
        setMode,
        addItem,
        updateItem,
        removeItem,
        toggleItem,
        removeAllItems,
        toggleAllItem,
        removeCompletedItems,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
```

:::

## zustand

- 适合管理页面的全局状态，[使用文档](https://github.com/pmndrs/zustand)。
- 组件级别的状态管理，需要使用工厂模式，逻辑会复杂一些，不够直观。

以下是工厂模式的使用，完整代码可以查看 [todo-list-zustand](https://github.com/liangjiayu/react-admin-vite/blob/main/src/pages/basic-features/store-feature/todo-list-zustand/store.ts)。

::: info store.ts

```tsx
import { create } from "zustand";
import type { FilterMode, TodoItem } from "../types";

type TodoStore = {
  todos: TodoItem[];
  mode: FilterMode;
  addItem: (title: string) => void;
  updateItem: (id: number, title: string) => void;
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
  removeAllItems: () => void;
  toggleAllItems: () => void;
  removeCompletedItems: () => void;
  setMode: (mode: FilterMode) => void;
};

export function createTodoStore() {
  return create<TodoStore>((set, get) => ({
    todos: [],
    mode: "ALL",

    addItem: (title: string) => {},

    updateItem: (id: number, title: string) => {},

    removeItem: (id: number) => {},

    toggleItem: (id: number) => {},

    removeAllItems: () => {},

    toggleAllItems: () => {},

    removeCompletedItems: () => {},

    setMode: (mode: FilterMode) => {},
  }));
}
```

:::

::: info context.tsx

```tsx
import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createTodoStore } from "./store";

const TodoContext = createContext<ReturnType<typeof createTodoStore> | null>(
  null
);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(createTodoStore);

  return <TodoContext.Provider value={store}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const store = useContext(TodoContext)!;
  if (!store) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return useStore(store);
}
```

:::

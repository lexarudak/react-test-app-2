````markdown
# React Component и ReactElement

## Функциональный компонент
Функциональный компонент — это обычная JS-функция:
- принимает `props`,
- возвращает **ReactNode**,
- имя должно начинаться с **большой буквы**,
- может использовать **хуки**.

```tsx
function MyButton(props) {
  return <button>{props.label}</button>;
}
```

---

## ReactNode
```
    type ReactNode =
        | ReactElement
        | string
        | number
        | bigint
        | Iterable<ReactNode>
        | ReactPortal
        | boolean
        | null
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[
            keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES
        ]
        | Promise<AwaitedReactNode>;
```


То, что может вернуть компонент:

| Тип                           | Что это                        | Что реально рендерится           | Версия |
| ----------------------------- | ------------------------------ | -------------------------------- | ------ |
| **ReactElement**              | JSX-элемент (`<div />`)        | DOM или компонент                | всегда |
| **string / number / bigint**  | `"hi"`, `123`, `123n`          | текстовый узел                   | bigint — 18 |
| **Iterable<ReactNode>**       | массив `[<li/>,"x"]`           | элементы разворачиваются         | всегда |
| **ReactPortal**               | `createPortal(...)`            | рендер в другой DOM-узел         | 16     |
| **boolean / null / undefined**| `true`, `null`, `undefined`    | ничего                           | `undefined` — 19 |
| **Promise<AwaitedReactNode>** | async-компоненты + Suspense     | рендер после resolve             | 18/19  |
| **EXPERIMENTAL_NODES**        | внутренние типы                | для будущих фич                  | 19     |

---

## ReactElement
**ReactElement** — это объект-описание узла, создаётся JSX или `React.createElement`.

```ts
{
  type: string | Function,           // тег или компонент
  props: object,                     // атрибуты + children
  key: string | null,
  ref: any,
  $$typeof: Symbol(react.element),   // маркер "настоящего" элемента
  _owner?: Fiber,                    // кто создал (связь с Fiber)
  _store?: { validated: boolean },   // проверка key в списках (dev)
  _debugSource?: { fileName, lineNumber },
  _debugStack?: string,
  _debugInfo?: any
}
```

### Примеры
```tsx
const el1 = <div className="box">Hi</div>;
// type: "div", props: { className, children: "Hi" }

function Button(p) { return <button>{p.label}</button>; }
const el2 = <Button label="OK" />;
// type: Button, props: { label: "OK", children: undefined }
```

---

## Особые поля
- **`key`** — подсказка React для списков.  
- **`ref`** — ссылка на DOM или компонент.  
- **`$$typeof`** — `Symbol(react.element)`, уникальный маркер:  
  - защита от "подделок" (`{ type, props }` не сработает),  
  - быстрое определение типа сущности,  
  - разные символы для `element`, `portal`, `fragment`, `context` и т.д.  
- **`_owner`, `_store`, `_debug*`** — вспомогательные/отладочные поля, чаще всего только в дев-режиме.

---

## Кратко
- **Компонент** = функция, возвращающая **ReactNode**.  
- **ReactNode** = всё, что может вернуться из компонента (элементы, строки, числа, null и т.д.).  
- **ReactElement** = объект-описание узла.  
- `$$typeof` гарантирует, что это настоящий элемент React.  
- В продакшене остаются только нужные поля, отладочные — вырезаются.
````



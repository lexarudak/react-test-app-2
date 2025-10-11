Окей 👍 Давай соберём полностью обновлённый конспект в одном `.md`-файле — с учётом всего, что мы уже обсудили: и про `jsx/jsxs`, и про то, что JSX можно использовать не только в React.

````md
# JSX (embedding expressions, attributes, children)

## 1. Что такое JSX
- Это **синтаксический сахар** над вызовами функций (в React — `jsx`/`jsxs`).
- По сути это не часть JavaScript, а расширение синтаксиса, которое компилятор (Babel, TypeScript) **преобразует в обычный JS**.
- Работает не только в React: любую библиотеку можно настроить как *runtime* для JSX.  
  Пример: Preact, SolidJS, Vue (c JSX-плагином).

---

## 2. Как компилируется JSX
Пример:

```tsx
<div className="app">Hello</div>
````

Трансформируется в:

```ts
import { jsx as _jsx } from "react/jsx-runtime";

_jsx("div", {
  className: "app",
  children: "Hello"
});
```

* `jsx` → используется, если у элемента один дочерний узел.
* `jsxs` → если детей несколько.
* Эти функции создают **ReactElement** (обычный объект).



Раньше, до 17 реакта трансформилось в  React.createElement а начиная с 17 в jsx и jsxs
```
type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
  return React.createElement('button', { onClick }, children);
};

const Banner = ({ children }: { children: React.ReactNode }) => {
  const a = React.createElement(
    'div',
    { className: 'banner' },
    React.createElement('span', null, children),
  );

  console.log(a);
  return a;
};

function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return _jsxs('div', {
    className: 'App',
    children: [
      _jsx(Banner, { children: count }),
      _jsx(Button, { onClick, children: 'Increment' }),
    ],
  });
}
```

---

## 3. Что может быть в `type`

* **строка** → DOM-элемент (`"div"`, `"span"`).
* **функция/класс** → React-компонент (`MyButton`).
* **React.Fragment** → `<>...</>`.

---

## 4. Атрибуты

* Всё в JSX-атрибутах → попадает в `props`.
* Используется `camelCase`: `className` вместо `class`, `htmlFor` вместо `for`.
* Если атрибут не указан → в `props` его просто нет.

---

## 5. Children

* Всё внутри тега → `props.children`.
* Может быть строка, число, React-элемент, массив нод, `null`, `undefined`.
* Два способа записи:

```tsx
<Button children="Click" />
<Button>Click</Button>
```

---

## 6. Встраивание выражений

* В фигурных скобках можно писать **любое JS-выражение**:

```tsx
<div>{count * 2}</div>
```

* Нельзя вставлять:

  * объекты напрямую (`<div>{{a:1}}</div>` → ошибка);
  * инструкции (`if`, `for`) — только выражения.

---

## 7. Null, undefined, boolean

* Если вставить `null`, `undefined`, `true`, `false` → они **не рендерятся**.

```tsx
<div>{null}</div>   // пусто
<div>{false}</div> // пусто
```

---

## 8. Специальные возможности

* **Фрагменты**: `<>...</>` → не создают лишний DOM-узел.
* **Spread-пропсы**:

```tsx
const props = { className: "btn", disabled: true };
<button {...props}>Click</button>
```

* **JSX как выражение**:

```tsx
const element = <h1>Hello</h1>;
```

---

## 9. Отличия от HTML

* JSX ближе к JS, чем к HTML:

  * чувствителен к регистру (`<MyComponent>` ≠ `<mycomponent>`),
  * атрибуты пишутся в `camelCase` (`tabIndex` вместо `tab-index`),
  * значения всегда JS-выражения, нет "магических" строк.

---

## 10. Ключевые вопросы на собесе

1. Во что компилируется JSX?
   → в вызовы `jsx`/`jsxs` (раньше было `React.createElement`).
2. Что такое `props.children`?
3. Почему `className`, а не `class`?
4. Что отрендерится при `null`/`false`?
5. Можно ли писать `if` в JSX?

---

эта фигня сработает

```

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>JSX без React</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> // Он добавляет в браузер транспилятор (Babel), прямо на клиенте
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel" data-presets="react">
      /** @jsx h */

      function h(type, props, ...children) {
        const el = document.createElement(type);

        for (let [key, value] of Object.entries(props || {})) {
          el.setAttribute(key, value);
        }
        
        for (let child of children) {
          if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
          } else {
            el.appendChild(child);
          }
        }
        return el;
      }

      const app = <h1 className="title">Привет, мир!</h1>;

      document.getElementById('root').appendChild(app);
    </script>
  </body>
</html>

```

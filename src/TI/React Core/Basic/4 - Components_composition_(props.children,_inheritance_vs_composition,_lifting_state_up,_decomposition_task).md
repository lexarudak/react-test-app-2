# **Components Composition**

*(props.children, inheritance vs composition, lifting state up, decomposition task)*

Композиция — это основной способ организации кода в React.
Она заключается в том, чтобы **разбивать интерфейс на независимые, переиспользуемые части** и **составлять** их друг из друга как конструктор.

---

### **Props.children**

Самый очевидный пример композиции — использование `props.children`.
Это механизм, который позволяет передавать JSX-элементы между открывающим и закрывающим тегами компонента.
Передаваемый компонент можно получить внутри родителя через проп `children`.

```tsx
<Card>
  <Title>Заголовок</Title>
  <Description>Описание карточки</Description>
</Card>
```

А внутри `Card`:

```tsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

---

### **Slot composition**

Иногда одного `children` недостаточно — тогда применяют *слотовую композицию*.
Вместо одного пропа `children` можно передавать несколько именованных «слотов»:

```tsx
<Card title={<Title />} description={<Description />} />
```

Такой подход часто используют в UI-библиотеках, чтобы гибко управлять разметкой.

---

### **Inheritance vs Composition**

В функциональных компонентах **наследование не применяется вообще**.
Композиция предпочтительнее, потому что она делает компоненты более гибкими и независимыми.
В React принято *встраивать* поведение, а не *наследовать* его.

---

### **Lifting State Up**

*Lifting state up* — это «подъём состояния» в родителя, чтобы им могли пользоваться несколько дочерних компонентов.
Например, если два дочерних элемента должны делить одно и то же состояние, стейт выносят в родитель и передают его через пропсы:

```tsx
function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}
```

Важно помнить:

> Держи состояние **настолько низко в дереве, насколько возможно**, чтобы не вызывать лишние ререндеры.

Можно также упомянуть концепцию **«умных» и «тупых» компонентов** — где «умные» содержат стейт и логику, а «тупые» отвечают только за отображение.

---

### **Decomposition task**

Это про **разделение компонента на логические части** — визуальные и логические.
Сюда же относится композиция не только UI, но и **хуков**.
Хуки позволяют переиспользовать поведение (логику), а не только визуальные элементы — это называется *hooks composition*.

---

### **Provider pattern / Context composition**

React позволяет вкладывать провайдеры контекста друг в друга.
Это тоже форма композиции — только на уровне данных, а не UI.
Например, ты можешь комбинировать несколько контекстов для темы, авторизации, локализации и т.д.

---

### **Compound Components**

Отдельно стоит упомянуть **compound components** — когда группа компонентов работает как единая система.

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab id="1">Главная</Tabs.Tab>
    <Tabs.Tab id="2">Профиль</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel id="1">Это главная</Tabs.Panel>
  <Tabs.Panel id="2">Это профиль</Tabs.Panel>
</Tabs>
```

Под капотом это работает через общий контекст и вложенные компоненты:

```tsx
import { useState, createContext, useContext, ReactNode } from "react";

const TabsContext = createContext({
  active: "",
  setActive: (v: string) => {},
});

function Tabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("1");
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === id;
  return (
    <button onClick={() => setActive(id)} className={isActive ? "active" : ""}>
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useContext(TabsContext);
  if (active !== id) return null;
  return <div className="tab-panel">{children}</div>;
}

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
```

Таким образом мы создаём **namespace-подобную композицию**

---

### ✅ В итоге

Композиция в React — это не просто способ вкладывать компоненты друг в друга.
Это общий **подход к проектированию**:

* разделение ответственности,
* управление состоянием,
* переиспользование логики и интерфейсов.

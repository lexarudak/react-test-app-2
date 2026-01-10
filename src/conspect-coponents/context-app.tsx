import { useState, memo, createContext, useContext } from 'react';

// Создаем контекст
const MyContext = createContext({ count: 0, setCount: (c: number) => {} });

// Дорогой компонент для демонстрации
const ExpensiveChild = () => {
  console.log('ExpensiveChild rendered!'); // Будем отслеживать рендеры
  return <div>Expensive computation here...</div>;
};

// Компонент, который ИСПОЛЬЗУЕТ контекст
const ChildWithContext = () => {
  const { count } = useContext(MyContext); // Подписка на контекст!
  console.log('ChildWithContext rendered!');
  return <div>Count from context: {count}</div>;
};

// Компонент, который НЕ использует контекст
const ChildWithoutContext = () => {
  console.log('ChildWithoutContext rendered!');
  return <div>I don't use context</div>;
};

// ❌ ПЛОХО: Дети создаются внутри компонента
const BadWrapper = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      {/* ExpensiveChild пересоздается при каждом рендере BadWrapper */}
      <ExpensiveChild />
    </div>
  );
};

// ✅ ХОРОШО: Дети приходят через children
const GoodWrapper = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      {/* children уже созданы родителем, не пересоздаются */}
      {children}
    </div>
  );
};

// Использование
export const PerformanceDemo = () => {
  return (
    <div>
      <h2>Bad Example (child re-renders):</h2>
      <BadWrapper />

      <h2>Good Example (child doesn't re-render):</h2>
      <GoodWrapper>
        <ExpensiveChild />
      </GoodWrapper>
    </div>
  );
};

// Еще пример: Modal компонент
const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <div
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
    >
      {/* children не пересоздаются при движении мыши */}
      {children}
    </div>
  );
};

// Провайдер контекста
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <MyContext.Provider value={{ count, setCount }}>
      <button onClick={() => setCount((c) => c + 1)}>
        Context Count: {count}
      </button>
      {/* ВСЕ children, которые используют useContext, БУДУТ ререндериться! */}
      {children}
    </MyContext.Provider>
  );
};

// Использование Modal
export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Modal</button>

      <Modal isOpen={isOpen}>
        <ExpensiveChild />
        <div>This content won't re-render when mouse moves!</div>
      </Modal>
    </div>
  );
};

// Демонстрация разницы
const ContextApp = () => {
  return (
    <div>
      <h2>Context Provider Example:</h2>
      <ContextProvider>
        {/* Этот НЕ ререндерится при изменении контекста */}
        <ChildWithoutContext />

        {/* Этот РЕРЕНДЕРИТСЯ при изменении контекста */}
        <ChildWithContext />

        {/* Обычный ExpensiveChild тоже НЕ ререндерится */}
        <ExpensiveChild />
      </ContextProvider>

      <PerformanceDemo />
    </div>
  );
};

export default ContextApp;

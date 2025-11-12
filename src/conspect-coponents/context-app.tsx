import { createContext, useContext } from 'react';

const fallbackValue = {
  // будет доступно вне провайдера
  name: 'Valera',
  age: [25],
};

const parentValue = {
  // будет доступно внутри провайдера
  name: 'Parent Valera',
  age: [30],
};

const childValue = {
  // будет доступно внутри вложенного провайдера
  name: 'Child Valera',
  age: [5],
};

const ValeraContext = createContext(fallbackValue);

const Parent = () => {
  const valera = useContext(ValeraContext);

  return (
    <div>
      {valera.name} - {valera.age}
    </div>
  );
};

const Child = () => {
  const valera = useContext(ValeraContext);

  return (
    <div>
      {valera.name} - {valera.age}
    </div>
  );
};

export const ContextApp = () => {
  return (
    <ValeraContext.Provider value={parentValue}>
      <Parent /> // использует parentValue
      <ValeraContext.Provider value={childValue}>
        <Child /> // использует childValue
      </ValeraContext.Provider>
    </ValeraContext.Provider>
  );
};

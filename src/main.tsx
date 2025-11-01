import { createRoot } from 'react-dom/client';
import './index.css';
import { useEffect, useRef, useState } from 'react';

import _clone from 'lodash/cloneDeep';
import { Buttons } from './conspect-coponents/buttons';
import { useValeraContext, ValeraContext } from './conspect-coponents/constext';
import { ButtonsApp } from './conspect-coponents/buttons-app';

const useA = () => {
  const [state] = useState(2);

  return <p>{state}</p>;
};

const useFiber = () => {
  const ref = useRef<HTMLDivElement>(null);
  const getFiber = () => {
    if (!ref.current) return null;
    const props = Object.getOwnPropertyNames(ref.current);
    const prop = props.find((p) => p.startsWith('__reactFiber$')) as string;

    // @ts-ignore
    const fiber = ref.current?.[prop!].return;
    return fiber;
  };

  return [ref, getFiber] as const;
};

export const AppFiber = () => {
  console.log('AppFiber render');
  const [count, setCount] = useState(42);
  const [ref, getFiber] = useFiber();
  const W = useA;

  const onClick = () => {
    setCount(5);
    setCount(6);
    const c = _clone(getFiber());
    console.log('Click', c);
  };

  useEffect(() => {
    console.log('render');
  });

  return (
    <div ref={ref}>
      <h2>App Fiber</h2>
      <p>Count: {count}</p>s<button onClick={onClick}>Increment</button>
      {useA()}
      <W />
    </div>
  );
};

const a = createRoot(document.getElementById('root')!);
console.log(a);

// a.render(<App />);
// a.render(<AppFiber />);
a.render(<ButtonsApp />);

// const c = {
//   type: App,
//   props: {},
//   key: null,
//   ref: null,
//   $$typeof: Symbol(react.element),
// };

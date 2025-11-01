import { useEffect, useLayoutEffect, useState } from 'react';

let globalCount = 0;

const fn = () => {
  globalCount = globalCount + 1;
  return globalCount;
};

export const State = () => {
  console.log('first body log', 1);

  useState(() => {
    console.log('init state log', 1);
    return 0;
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect log', 1);
  }, []);

  useEffect(() => {
    console.log('useEffect log', 1);
  }, []);

  const [count] = useState(fn());
  const [secondCount, setSecondCount] = useState({ a: 1 });

  console.log('second body log', 2);

  return (
    <fieldset>
      <legend>State</legend>

      <div>Global Count: {globalCount}</div>
      <div>Count: {count}</div>
      <div>Second Count: {secondCount.a}</div>

      <button onClick={() => setSecondCount({ ...secondCount })}>
        rerender
      </button>

      <button
        onClick={() =>
          setSecondCount((prev) => {
            prev.a += 1;
            return prev;
          })
        }
      >
        no rerender
      </button>
    </fieldset>
  );
};

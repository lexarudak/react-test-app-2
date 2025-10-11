import { useState } from 'react';

let globalCount = 0;

const fn = () => {
  globalCount = globalCount + 1;
  return globalCount;
};

export const State = () => {
  const [count] = useState(fn());
  const [secondCount, setSecondCount] = useState({ a: 1 });

  console.log('State render', globalCount);

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

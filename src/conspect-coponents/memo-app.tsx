import { FC, PropsWithChildren, useState } from 'react';

const JustOtherComponent = () => {
  console.log('JustOtherComponent rendered');
  return <div>I'm just another component</div>;
};

const Parent: FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState(0);

  const onClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onClick}>+</button>
      <input type="text" onChange={(e) => console.log(e)} />
      {children}
    </div>
  );
};

const MemoApp = () => {
  return (
    <Parent>
      <JustOtherComponent />
    </Parent>
  );
};

export default MemoApp;

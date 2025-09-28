import { useState } from 'react';
import './App.css';
import React from 'react';
import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';

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

  return (
    <>
      <Banner children={count} />
      <Button onClick={onClick}>Increase</Button>
    </>
  );

  // return _jsxs(React.Fragment, {
  //   children: [
  //     _jsx(Banner, { children: count }),
  //     _jsx(Button, { onClick, children: 'Increment' }),
  //   ],
  // });
}

export default App;

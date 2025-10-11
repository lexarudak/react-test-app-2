import React, { useState } from 'react';
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

export function ComponentJSX() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return _jsxs('fieldset', {
    title: 'Counter',
    children: [
      _jsx('legend', { children: 'ComponentJSX' }),
      _jsx(Banner, { children: count }),
      _jsx(Button, { onClick, children: 'Increment' }),
    ],
  });
}

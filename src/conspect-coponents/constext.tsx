import { createContext, useState } from 'react';

export const useValeraContext = () => {
  const name = useState('Valera');
  const age = useState(3);

  const context = { name, age };

  return context;
};

export const ValeraContext = createContext<{
  name: [string, React.Dispatch<React.SetStateAction<string>>];
  age: [number, React.Dispatch<React.SetStateAction<number>>];
} | null>(null);

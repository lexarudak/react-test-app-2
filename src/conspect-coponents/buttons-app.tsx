import { useContext } from 'react';
import { Buttons } from './buttons';
import { useValeraContext, ValeraContext } from './constext';

const A = () => {
  const a = useContext(ValeraContext);
  return a?.age[0];
};

const B = () => {
  console.log('B');

  return <p>B</p>;
};

export const ButtonsApp = () => {
  const context = useValeraContext();

  return (
    <ValeraContext.Provider value={context}>
      <Buttons />

      <A />
      <B />
    </ValeraContext.Provider>
  );
};

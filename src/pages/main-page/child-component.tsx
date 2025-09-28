import { FC } from 'react';

const style = { border: '4px solid black', padding: '10px', margin: '10px' };

type Props = {
  person: {
    name: string;
  };
  onClick: () => void;
};

export const InnerComponent: FC<Props> = ({ person, onClick }) => {
  console.log('Рендер чайлда');

  return (
    <div style={style}>
      <h2>{person.name}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

import { FC } from 'react';
import CountDisplay from './cd/cd';

type Props = {};

const Display: FC<Props> = () => {
  return (
    <h2>
      Display
      <CountDisplay />
    </h2>
  );
};

export default Display;

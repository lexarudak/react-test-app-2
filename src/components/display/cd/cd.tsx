import { FC } from 'react';
import store from '../../../store/store';

type Props = {};

const CountDisplay: FC<Props> = () => {
  return <div>{store.count}</div>;
};

export default CountDisplay;

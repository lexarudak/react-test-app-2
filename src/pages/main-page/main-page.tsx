import { FC, useMemo, useState } from 'react';
import styles from './main-page.module.css';
import { InnerComponent } from './child-component';

const onChildClick = () => {
  console.log('Child button clicked');
};

const getPerson = () => {
  return { name: 'John Doe' };
};

const MainPage: FC = () => {
  const [parentState, setParentState] = useState(0);

  const onParentClick = () => {
    setParentState(parentState + 1);
  };

  const memoizedValue = useMemo(() => {
    return getPerson();
  }, []);

  return (
    <section className={styles.page}>
      <p>Parent State: {parentState}</p>
      <button onClick={onParentClick}>Parent button</button>

      <InnerComponent person={memoizedValue} onClick={onChildClick} />
    </section>
  );
};

export default MainPage;

import { Fragment, useState } from 'react';
import MyButton, {
  BUTTON_TYPE,
  BUTTON_VARIANT,
} from '../../components/my-button/my-button';
import Display from '../../components/display/display';
import store from '../../store/store';
import styles from './main-page.module.css';
import { messages } from './messges';

const DEFAULT_COUNT = 0;

const MainPage = () => {
  const [count, setCount] = useState(DEFAULT_COUNT);
  console.log('Count:', count);

  console.log('Rendering MainPage');

  const onClick = () => {
    store.setCount(store.count + 1);
  };

  const onClick2 = () => {
    setCount(count - 1);
    console.log('Button clicked');
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{messages.title}</h1>
        <Display />

        <p className="description">Description of the main page.</p>

        <MyButton onClick={onClick}>
          <p>+</p>
        </MyButton>

        <MyButton onClick={onClick2} variant={BUTTON_VARIANT.SECONDARY}>
          <p>-</p>
        </MyButton>
      </div>
    </section>
  );
};

export default MainPage;

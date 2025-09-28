import { FC } from 'react';
import styles from './my-button.module.css';

export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum BUTTON_TYPE {
  inline = 'inline',
  basic = 'basic',
}

type Props = {
  variant?: BUTTON_VARIANT;
  myType?: BUTTON_TYPE;
} & React.HTMLProps<HTMLButtonElement>;

const MyButton: FC<Props> = ({
  onClick,
  children,
  variant = BUTTON_VARIANT.PRIMARY,
}) => {
  const buttonClass = `${styles.button} ${variant === BUTTON_VARIANT.PRIMARY ? styles.primary : styles.secondary}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;

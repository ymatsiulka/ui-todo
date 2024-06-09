import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from 'types/frontend';
import styles from './Button.m.scss';

const Button: React.FC<ButtonProps> = ({ className, children, type, title, ...props }) => {
  const buttonClassNames = classNames(styles.button, className);

  return (
    <button {...props} className={buttonClassNames} type={type ?? 'button'}>
      <span>{children ?? title}</span>
    </button>
  );
};

export default Button;

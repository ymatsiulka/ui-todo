import React, { type InputHTMLAttributes } from 'react';
import styles from './Input.m.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({ name, label, children, ...rest }) => {
  return (
    <div className={styles.inputWrapper}>
      {children}

      <input title={name} id={name} {...rest} />
      {(label || name) && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Input;

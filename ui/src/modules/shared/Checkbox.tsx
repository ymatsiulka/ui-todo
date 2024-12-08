import React from 'react';
import { input } from 'appConstants';
import styles from './Checkbox.m.scss';

interface CheckboxProps {
  id: number;
  name: string;
  isChecked: boolean;
  label: string;
  onCheckedHandler: (booleanValue: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, label, isChecked, onCheckedHandler }) => {
  const prefixId = `checkbox_${id}`;
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.checked;
    onCheckedHandler(value);
  };

  return (
    <div className={styles.checkboxWrapper}>
      <label htmlFor={prefixId} className="d-flex w-100 f-align-vertical-center gap-10">
        <input
          id={prefixId}
          className={styles.checkbox__input}
          name={name}
          type={input.checkbox}
          checked={isChecked}
          onChange={handleOnChange}
        />
        <span className="check__box" />
        {!isChecked && label}
        {isChecked && <s style={{ color: '#B7B7BA' }}>{label}</s>}
      </label>
    </div>
  );
};

export default Checkbox;

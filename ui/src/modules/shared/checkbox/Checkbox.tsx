import React, { InputHTMLAttributes } from 'react';
import { input } from 'appConstants';

interface CheckboxProps {
  id: number;
  name: string;
  isChecked: boolean;
  label: string;
  labelClassName?: string;
  onCheckedHandler: (booleanValue: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, label, isChecked, onCheckedHandler }) => {
  const prefix_id = `checkbox_${id}`;
  return (
    <div className="checkbox-wrapper">
      <label htmlFor={prefix_id} className="d-flex w-100 f-align-vertical-center gap-10">
        <input
          id={prefix_id}
          className="checkbox__input"
          name={name}
          type={input.checkbox}
          checked={isChecked}
          onChange={(e) => {
            const value = e.target.checked;
            onCheckedHandler(value);
          }}
        />
        <span className="check__box" />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

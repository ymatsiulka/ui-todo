import React, { InputHTMLAttributes } from 'react';
import { input } from 'appConstants';

interface CheckboxProps {
  name: string;
  isChecked: boolean;
  label: string;
  labelClassName?: string;
  onCheckedHandler: (booleanValue: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, isChecked, onCheckedHandler }) => {
  return (
    <div className="checkbox-wrapper d-flex w-100 f-align-vertical-center ">
      <input
        className={'checkbox-custom'}
        name={name}
        type={input.checkbox}
        checked={isChecked}
        onChange={(e) => {
          const value = e.target.checked;
          onCheckedHandler(value);
        }}
      />
      <label className="w-100 checkmark">{label}</label>
    </div>
  );
};

export default Checkbox;

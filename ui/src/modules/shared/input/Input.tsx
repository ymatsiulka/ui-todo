import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="input-wrapper">
      <input id={name} {...rest} />
      {(label || name) && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Input;

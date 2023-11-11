import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from 'types/frontend';

const Button: React.FC<ButtonProps> = ({ className, children, type, title, ...props }) => {
  const buttonClassNames = classNames('button', className);

  return (
    <button {...props} className={buttonClassNames} type={type}>
      <span>{children ?? title}</span>
    </button>
  );
};

export default Button;

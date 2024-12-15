import React from 'react';
import { Input } from 'modules/shared';
import { input } from 'appConstants';
// import styles from './TodoInput.m.scss';

interface TodoInputProps {
  value: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUpHandler: React.KeyboardEventHandler<HTMLInputElement>;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChangeHandler, onKeyUpHandler }) => {
  return (
    <Input
      value={value}
      id="todo-input"
      className="todo-input"
      placeholder=""
      name={'todo-input'}
      label={''}
      title={'todo-input'}
      type={input.text}
      onChange={onChangeHandler}
      onKeyUp={onKeyUpHandler}
    >
      <span className="check__box" style={{ marginLeft: '0px', marginRight: '0px' }} />
    </Input>
  );
};

export default TodoInput;

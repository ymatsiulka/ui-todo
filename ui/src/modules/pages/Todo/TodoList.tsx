import React from 'react';
import { TodoResponse } from '../../../types/api';
import Input from '../../shared/input/Input';
import { input } from 'appConstants';

interface TodoListProps {
  todos: TodoResponse[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <ul className="todo-list-container">
    {todos.map((t: TodoResponse) => {
      return (
        <li id={t.id.toString()} data-value={t.id.toString()}>
          <Input
            name={t.id.toString()}
            label={t.name}
            type={input.checkbox}
            checked={t.isCompleted}
            onChange={(e) => {}}
          />
        </li>
      );
    })}
  </ul>
);

export default TodoList;

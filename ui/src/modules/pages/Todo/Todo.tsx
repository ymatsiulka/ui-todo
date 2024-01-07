import React, { useState } from 'react';
import { TodoResponse } from '../../../types/api';
import Input from '../../shared/input/Input';
import Button from '../../shared/button/Button';

const todoConstants: TodoResponse[] = [
  { id: 1, name: 'Task 1', isCompleted: false },
  { id: 2, name: 'Task 2', isCompleted: false },
  { id: 3, name: 'Task 3', isCompleted: true },
];

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoResponse[]>(todoConstants);

  // to dictionary and reset with property
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAll, setIsAll] = useState<boolean>(true);

  const [todoName, setTodoName] = useState('');
  const isTodosExists = todos.length > 0;
  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTodo: TodoResponse = {
        id: 0,
        isCompleted: false,
        name: todoName,
      };
      const newTodos: TodoResponse[] = [...todos, newTodo];
      setTodoName('');
      4;
      setTodos(newTodos);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const uncompletedItemsCount = todos.filter((t) => !t.isCompleted).length;
  const completedItems = todos.filter((t) => t.isCompleted);

  const onClearCompletedItems = () => {
    const newTodos: TodoResponse[] = todos.map((todo) => (todo.isCompleted ? { ...todo, isCompleted: false } : todo));
    setTodos([...newTodos]);
    console.log(JSON.stringify(newTodos));
    console.log(JSON.stringify(todos));
  };

  const onClickCompletedHandler = () => {
    setIsAll(false);
    setIsActive(false);
    setIsCompleted(true);
  };

  const onClickActiveHandler = () => {
    setIsAll(false);
    setIsActive(true);
    setIsCompleted(false);
  };

  const onClickAllHandler = () => {
    setIsAll(true);
    setIsActive(false);
    setIsCompleted(false);
  };
  const isActiveButton = (isActive: boolean) => `fs-12 ${isActive ? 'c-blue' : ''}`;
  return (
    <>
      <footer>{isTodosExists ? 'Drag and drop to reorder list' : ''}</footer>

      <div className="wrapper">
        <div className="content">
          {/* Другие блоки */}
          <div className="todo-wrapper">
            <div className="todo-content">
              <h1 className="todo-text c-white">T O D O</h1>
              <div className="todo-spacer-1"></div>
              <Input
                value={todoName}
                id="todo-input"
                className="todo-input"
                name={''}
                label={''}
                type="text"
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              />

              <div className="todo-spacer-2"></div>
              <div className="todo-list-container">
                <ul>
                  {todos.map((t: TodoResponse, index: number) => {
                    const onChangeTodoHandler = (value: boolean) => {
                      const newTodos = [...todos];
                      newTodos[index].isCompleted = !value;
                      setTodos(newTodos);
                    };
                    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = !e.target.checked;
                      onChangeTodoHandler(checked);
                    };
                    const onDeleteTodoHandler = () => {
                      const newTodos = todos.filter((todo) => todo.id !== t.id);
                      setTodos(newTodos);
                    };
                    const isVisible = isAll || (t.isCompleted && isCompleted) || (!t.isCompleted && isActive);
                    return (
                      isVisible && (
                        <li className="" id={t.id.toString()} data-value={t.id.toString()}>
                          <Input
                            name={t.id.toString()}
                            label={t.name}
                            type="checkbox"
                            checked={t.isCompleted}
                            onChange={onCheckedHandler}
                          />
                          <Button title="X" onClick={onDeleteTodoHandler} />
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
              <div className="todo-list-actions">
                <div className="left">
                  <span className="fs-12">{uncompletedItemsCount} items left </span>
                </div>
                <div className="middle">
                  <Button className={isActiveButton(isAll)} title="All" onClick={onClickAllHandler} />
                  <Button className={isActiveButton(isActive)} title="Active" onClick={onClickActiveHandler} />
                  <Button className={isActiveButton(isCompleted)} title="Completed" onClick={onClickCompletedHandler} />
                </div>
                <div className="right">
                  <Button className="fs-12" title="Clear Completed" onClick={onClearCompletedItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background-image" />
      </div>
    </>
  );
};

export default Todo;

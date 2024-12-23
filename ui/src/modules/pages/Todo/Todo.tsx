import React, { useState } from 'react';
import { keys } from 'appConstants';
import { TodoPageStatuses } from 'types/frontend';
import { Spacer, Typography } from 'modules/shared/atoms';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addTodo, clearCompletedTodos, uncompletedSelectItemsCount } from 'store/features/todos/todosSlice';
import TodoInput from '../../shared/moleculas/TodoInput';
import styles from './Todo.m.scss';
import TodoList from 'modules/shared/organisms/TodoList';
import TodoListActions from 'modules/shared/organisms/TodoListActions';

const Todo: React.FC = () => {
  const [todoName, setTodoName] = useState('');
  const [todoPageStatus, setTodoPageStatus] = useState<TodoPageStatuses>(TodoPageStatuses.All);

  const todosState = useAppSelector((state) => state.todos);
  const todosItems = todosState.items;
  const dispatch = useAppDispatch();

  const onClickCompletedHandler = (): void => {
    setTodoPageStatus(TodoPageStatuses.Completed);
  };

  const onClickActiveHandler = (): void => {
    setTodoPageStatus(TodoPageStatuses.Active);
  };

  const onClickAllHandler = (): void => {
    setTodoPageStatus(TodoPageStatuses.All);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoName(e.target.value);
  };

  const onClickClearCompletedHandler = (): void => {
    dispatch(clearCompletedTodos());
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === keys.enter) {
      setTodoName('');
      dispatch(addTodo({ todoName }));
    }
  };

  const uncompletedItemsCount = uncompletedSelectItemsCount(todosState);
  return (
    <div className={styles.content}>
      <div className={styles.todoContent}>
        <Spacer top={10} bottom={10} />
        <Typography variant="h1" className="c-white" text="T O D O" />
        <Spacer top={15} bottom={15} />
        <TodoInput value={todoName} onChangeHandler={onChangeHandler} onKeyUpHandler={onKeyUpHandler} />
        <Spacer top={10} bottom={10} />
        <TodoList todoItems={todosItems} todoPageStatus={todoPageStatus} />
        <TodoListActions
          onClickAllHandler={onClickAllHandler}
          onClickActiveHandler={onClickActiveHandler}
          onClickCompletedHandler={onClickCompletedHandler}
          onClickClearCompletedHandler={onClickClearCompletedHandler}
          uncompletedItemsCount={uncompletedItemsCount}
          todoPageStatus={todoPageStatus}
        />
        {todosItems.length > 1 && <Spacer top={10} bottom={10} />}
        <footer id="dnd-footer">{todosItems.length > 1 && 'Drag and drop to reorder list'}</footer>
      </div>
    </div>
  );
};

export default Todo;

import React, { useRef, useState } from 'react';
import { Spacer, Typography } from 'modules/shared';
import { TodoPageStatuses } from 'types/frontend';
import { keys } from 'appConstants';
import TodoListActions from './TodoListActions';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addTodo, clearTodos, moveTodos, uncompletedSelectItemsCount } from 'store/features/todos/todosSlice';
import styles from './Todo.m.scss';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

const Todo: React.FC = () => {
  const [todoPageStatus, setTodoPageStatus] = useState<TodoPageStatuses>(TodoPageStatuses.All);
  const [todoName, setTodoName] = useState('');
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  const onDragEndHandler = (): void => {
    dispatch(moveTodos({ firstIndex: dragTodo.current, secondIndex: draggedOverTodo.current }));
  };
  const onDragStartHandler = (index: number): void => {
    dragTodo.current = index;
  };
  const onDragEnterHandler = (index: number): void => {
    draggedOverTodo.current = index;
  };
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
    dispatch(clearTodos());
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
        <Typography variant="h1" className="c-white" text="T O D O" />
        <Spacer top={15} bottom={15} />
        <TodoInput value={todoName} onChangeHandler={onChangeHandler} onKeyUpHandler={onKeyUpHandler} />
        <Spacer top={10} bottom={10} />
        <TodoList
          todoItems={todosItems}
          todoPageStatus={todoPageStatus}
          onDragStartHandler={onDragStartHandler}
          onDragEndHandler={onDragEndHandler}
          onDragEnterHandler={onDragEnterHandler}
        />
        <TodoListActions
          onClickAllHandler={onClickAllHandler}
          onClickActiveHandler={onClickActiveHandler}
          onClickCompletedHandler={onClickCompletedHandler}
          onClickClearCompletedHandler={onClickClearCompletedHandler}
          uncompletedItemsCount={uncompletedItemsCount}
          todoPageStatus={todoPageStatus}
        />
        <footer>{todosItems.length > 1 && 'Drag and drop to reorder list'}</footer>
      </div>
      <div className="background-image" />
    </div>
  );
};

export default Todo;

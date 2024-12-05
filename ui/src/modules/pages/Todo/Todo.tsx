import React, { useRef, useState } from 'react';
import { Input } from 'modules/shared';
import { type TodoResponse } from 'types/api';
import { TodoPageStatuses } from 'types/frontend';
import { input, keys } from 'appConstants';
import TodoListActions from './TodoListActions';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addTodo, clearTodos, moveTodos, uncompletedSelectItemsCount } from 'store/features/todos/todosSlice';
import styles from './Todo.m.scss';
import TodoListItem from './TotoListItem';

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
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className="todo-wrapper">
            <div className={styles.todoContent}>
              <h1 className="todo-text c-white">T O D O</h1>
              <div className="spacer-1" />
              <Input
                value={todoName}
                id="todo-input"
                className="todo-input"
                name={''}
                label={''}
                type={input.text}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              >
                <span className="check__box" style={{ marginLeft: '0px', marginRight: '0px' }} />
              </Input>
              <div className="spacer-2" />
              <div className={styles.todoListContainer}>
                <ul>
                  {todosItems.map((t: TodoResponse, index: number) => {
                    return (
                      <TodoListItem
                        key={`todo-list-item-${t.id}-${index}`}
                        index={index}
                        id={t.id}
                        name={t.name}
                        isCompleted={t.isCompleted}
                        todoPageStatus={todoPageStatus}
                        onDragEndHandler={onDragEndHandler}
                        onDragStartHandler={() => {
                          onDragStartHandler(index);
                        }}
                        onDragEnterHandler={() => {
                          onDragEnterHandler(index);
                        }}
                      />
                    );
                  })}
                </ul>
              </div>
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
          </div>
        </div>
        <div className="background-image" />
      </div>
    </>
  );
};

export default Todo;

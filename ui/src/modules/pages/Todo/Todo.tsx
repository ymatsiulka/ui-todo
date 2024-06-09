import React, { useRef, useState } from 'react';
import { Checkbox, Button, Input } from 'modules/shared';
import { Icon } from '@iconify/react';
import { TodoResponse } from 'types/api';
import { TodoPageStatuses } from 'types/frontend';
import { input, keys } from 'appConstants';
import TodoListActions from './TodoListActions';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  addTodo,
  checkTodo,
  deleteTodo,
  clearTodos,
  uncompletedSelectItemsCount,
  moveTodos,
} from 'store/features/todos/todosSlice';
import styles from './Todo.m.scss';

const Todo: React.FC = () => {
  const [todoPageStatus, setTodoPageStatus] = useState<TodoPageStatuses>(TodoPageStatuses.All);
  const [todoName, setTodoName] = useState('');
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  const todosState = useAppSelector((state) => state.todos);
  const todosItems = todosState.items;
  const dispatch = useAppDispatch();
  const handleSort = () => {
    dispatch(moveTodos({ firstIndex: dragTodo.current, secondIndex: draggedOverTodo.current }));
  };

  const onClickCompletedHandler = () => {
    setTodoPageStatus(TodoPageStatuses.Completed);
  };

  const onClickActiveHandler = () => {
    setTodoPageStatus(TodoPageStatuses.Active);
  };

  const onClickAllHandler = () => {
    setTodoPageStatus(TodoPageStatuses.All);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const onClickClearCompletedHandler = () => {
    dispatch(clearTodos());
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keys.enter) {
      setTodoName('');
      dispatch(addTodo({ todoName }));
    }
  };

  const uncompletedItemsCount = uncompletedSelectItemsCount(todosState);
  return (
    <>
      <footer>{todosItems.length > 1 && 'Drag and drop to reorder list'}</footer>
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
                    const onChangeTodoHandler = (value: boolean) => {
                      dispatch(checkTodo({ id: t.id, isChecked: value }));
                    };

                    const onDeleteTodoHandler = () => {
                      dispatch(deleteTodo({ id: t.id }));
                    };

                    const isVisible =
                      todoPageStatus == TodoPageStatuses.All ||
                      (t.isCompleted && todoPageStatus == TodoPageStatuses.Completed) ||
                      (!t.isCompleted && todoPageStatus == TodoPageStatuses.Active);

                    return (
                      isVisible && (
                        <li
                          draggable
                          onDragStart={() => (dragTodo.current = index)}
                          onDragEnter={() => (draggedOverTodo.current = index)}
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()}
                          className={styles.todoCheckboxItem}
                          id={t.id.toString()}
                          data-value={t.id.toString()}
                        >
                          <Checkbox
                            id={t.id}
                            name={t.id.toString()}
                            onCheckedHandler={onChangeTodoHandler}
                            isChecked={t.isCompleted}
                            label={t.name}
                          />
                          <Button onClick={onDeleteTodoHandler}>
                            <Icon icon="system-uicons:cross" width={24} height={24} />
                          </Button>
                        </li>
                      )
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
            </div>
          </div>
        </div>
        <div className="background-image" />
      </div>
    </>
  );
};

export default Todo;

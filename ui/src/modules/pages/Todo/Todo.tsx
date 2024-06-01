import React, { useRef, useState } from 'react';
import Input from '../../shared/input/Input';
import Button from '../../shared/button/Button';
import { Icon } from '@iconify/react';
import { todoResponseFactory } from 'factories/todoResponseFactory';
import { TodoResponse } from 'types/api';
import { TodoPageStatuses } from 'types/frontend';
import { todosConstants, input, keys } from 'appConstants';
import TodoListActions from './TodoListActions';
import Checkbox from 'modules/shared/checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  addTodo,
  checkTodo,
  deleteTodo,
  clearTodos,
  uncompletedSelectItemsCount,
  moveTodos,
} from 'store/features/todos/todosSlice';

const Todo: React.FC = () => {
  const [todoPageStatus, setTodoPageStatus] = useState<TodoPageStatuses>(TodoPageStatuses.All);
  const [todoName, setTodoName] = useState('');
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  const todosState = useAppSelector((state) => state.todos);
  const todosItems = todosState.items;
  const dispatch = useAppDispatch();
  const handleSort = () => {
    // const todoClone = [...todosItems];
    // const temp = todoClone[dragTodo.current];
    // todoClone[dragTodo.current] = todoClone[draggedOverTodo.current];
    // todoClone[draggedOverTodo.current] = temp;
    // setTodos(todoClone);
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
                type={input.text}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
              >
                <span className="check__box" style={{ marginLeft: '0px', marginRight: '0px' }} />
              </Input>
              <div className="todo-spacer-2"></div>
              <div className="todo-list-container">
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
                          className="todo-checkbox-item"
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

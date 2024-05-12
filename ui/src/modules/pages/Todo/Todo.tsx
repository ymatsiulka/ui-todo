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

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoResponse[]>(todosConstants);
  const [todoPageStatus, setTodoPageStatus] = useState<TodoPageStatuses>(TodoPageStatuses.All);
  const [todoName, setTodoName] = useState('');
  console.log(JSON.stringify(todos));
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);

  const handleSort = () => {
    const peopleClone = [...todos];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setTodos(peopleClone);
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
    const newTodos: TodoResponse[] = todos.map((todo) => (todo.isCompleted ? { ...todo, isCompleted: false } : todo));
    setTodos([...newTodos]);
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keys.enter) {
      const newTodos: TodoResponse[] = [todoResponseFactory.create(todoName), ...todos].map((t) => {
        return { ...t, order: t.order + 1 };
      });
      setTodoName('');
      setTodos(newTodos);
    }
  };

  const uncompletedItemsCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <>
      <footer>{todos.length > 0 && 'Drag and drop to reorder list'}</footer>

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
                  {todos.map((t: TodoResponse, index: number) => {
                    const onChangeTodoHandler = (value: boolean) => {
                      const newTodos = [...todos];
                      newTodos[index].isCompleted = value;
                      setTodos(newTodos);
                    };

                    const onDeleteTodoHandler = () => {
                      const newTodos = todos.filter((todo) => todo.id !== t.id);
                      setTodos(newTodos);
                    };

                    const isVisible =
                      todoPageStatus == TodoPageStatuses.All ||
                      (t.isCompleted && todoPageStatus == TodoPageStatuses.Completed) ||
                      (!t.isCompleted && todoPageStatus == TodoPageStatuses.Active);

                    return (
                      isVisible && (
                        <li
                          draggable
                          onDragStart={() => (dragPerson.current = index)}
                          onDragEnter={() => (draggedOverPerson.current = index)}
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

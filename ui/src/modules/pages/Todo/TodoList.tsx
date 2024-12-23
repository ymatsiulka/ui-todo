import React, { useRef } from 'react';
import styles from './TodoList.m.scss';
import TodoItem from './TotoItem';
import { type TodoResponse } from 'types/api';
import { type TodoPageStatuses } from 'types/frontend';
import { isVisible } from 'providers/todoItemVisibilityProvider';
import { moveTodos } from 'store/features/todos/todosSlice';
import { useAppDispatch } from 'hooks';

interface TodoListProps {
  todoItems: TodoResponse[];
  todoPageStatus: TodoPageStatuses;
}

const TodoList: React.FC<TodoListProps> = ({ todoItems, todoPageStatus }) => {
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  const dispatch = useAppDispatch();
  const onDragEndHandler = (): void => {
    dispatch(moveTodos({ firstIndex: dragTodo.current, secondIndex: draggedOverTodo.current }));
  };
  const onDragStartHandler = (index: number): void => {
    dragTodo.current = index;
  };
  const onDragEnterHandler = (index: number): void => {
    draggedOverTodo.current = index;
  };
  return (
    <ul className={styles.todoList} title="ui-todo-list">
      {todoItems.map((t: TodoResponse, index: number) => (
        <TodoItem
          key={`todo-list-item-${t.id}-${index}`}
          id={t.id}
          name={t.name}
          isVisible={isVisible(t.isCompleted, todoPageStatus)}
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
      ))}
    </ul>
  );
};

export default TodoList;

import React from 'react';
import styles from './TodoList.m.scss';
import TodoListItem from './TotoListItem';
import { type TodoResponse } from 'types/api';
import { type TodoPageStatuses } from 'types/frontend';

interface TodoListProps {
  todoItems: TodoResponse[];
  todoPageStatus: TodoPageStatuses;
  onDragStartHandler: (index: number) => void;
  onDragEnterHandler: (index: number) => void;
  onDragEndHandler: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todoItems,
  todoPageStatus,
  onDragStartHandler,
  onDragEnterHandler,
  onDragEndHandler,
}) => {
  return (
    <ul className={styles.todoList}>
      {todoItems.map((t: TodoResponse, index: number) => (
        <TodoListItem
          key={`todo-list-item-${t.id}-${index}`}
          id={t.id}
          name={t.name}
          isCompleted={t.isCompleted}
          todoPageStatus={todoPageStatus}
          onDragEndHandler={() => {
            onDragEndHandler();
          }}
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

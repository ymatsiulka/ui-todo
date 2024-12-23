import React, { useState } from 'react';
import { TodoPageStatuses } from 'types/frontend';
import { Button, Checkbox } from 'modules/shared';
import { checkTodo, deleteTodo } from 'store/features/todos/todosSlice';
import { Icon } from '@iconify/react';
import { useAppDispatch } from 'hooks';
import styles from './TodoListItem.m.scss';

interface TodoListItemProps {
  id: number;
  name: string;
  isCompleted: boolean;
  todoPageStatus: TodoPageStatuses;
  onDragStartHandler: React.DragEventHandler<HTMLLIElement>;
  onDragEnterHandler: React.DragEventHandler<HTMLLIElement>;
  onDragEndHandler: React.DragEventHandler<HTMLLIElement>;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  name,
  isCompleted,
  todoPageStatus,
  onDragStartHandler,
  onDragEnterHandler,
  onDragEndHandler,
}) => {
  const [isTodoItemHovering, setIsTodoItemHovering] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onChangeTodoHandler = (value: boolean): void => {
    dispatch(checkTodo({ id, isChecked: value }));
    if (todoPageStatus !== TodoPageStatuses.All) {
      setIsTodoItemHovering(false);
    }
  };

  const onDeleteTodoHandler = (): void => {
    dispatch(deleteTodo({ id }));
  };

  const isVisible =
    todoPageStatus === TodoPageStatuses.All ||
    (isCompleted && todoPageStatus === TodoPageStatuses.Completed) ||
    (!isCompleted && todoPageStatus === TodoPageStatuses.Active);

  const handleMouseOver = (): void => {
    setIsTodoItemHovering(true);
  };

  const handleMouseOut = (): void => {
    setIsTodoItemHovering(false);
  };

  return (
    isVisible && (
      <li
        draggable
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onDragStart={onDragStartHandler}
        onDragEnter={onDragEnterHandler}
        onDragEnd={onDragEndHandler}
        className={styles.todoCheckboxItem}
        id={id.toString()}
        data-value={id.toString()}
      >
        <Checkbox
          id={id}
          name={id.toString()}
          onCheckedHandler={onChangeTodoHandler}
          isChecked={isCompleted}
          label={name}
        />
        {isTodoItemHovering && (
          <Button className="delete-todo-button" onClick={onDeleteTodoHandler}>
            <Icon icon="system-uicons:cross" className="cross" />
          </Button>
        )}
      </li>
    )
  );
};

export default TodoListItem;

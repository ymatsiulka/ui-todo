import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'modules/shared/atoms';
import { checkTodo, deleteTodo } from 'store/features/todos/todosSlice';
import { Icon } from '@iconify/react';
import { useAppDispatch } from 'hooks';
import styles from './TodoItem.m.scss';

interface TodoItemProps {
  id: number;
  name: string;
  isVisible: boolean;
  isCompleted: boolean;
  onDragStartHandler: React.DragEventHandler<HTMLLIElement>;
  onDragEnterHandler: React.DragEventHandler<HTMLLIElement>;
  onDragEndHandler: React.DragEventHandler<HTMLLIElement>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  isVisible,
  isCompleted,
  onDragStartHandler,
  onDragEnterHandler,
  onDragEndHandler,
}) => {
  const [isTodoItemHovering, setIsTodoItemHovering] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isVisible) {
      setIsTodoItemHovering(false);
    }
  }, [isVisible]);

  const onChangeTodoHandler = (value: boolean): void => {
    dispatch(checkTodo({ id, isChecked: value }));
  };

  const handleMouseOver = (): void => {
    setIsTodoItemHovering(true);
  };

  const handleMouseOut = (): void => {
    setIsTodoItemHovering(false);
  };

  const onDeleteTodoHandler = (): void => {
    dispatch(deleteTodo({ id }));
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

export default TodoItem;

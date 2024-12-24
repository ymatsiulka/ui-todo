import React from 'react';
import { TodoPageStatuses } from 'types/frontend';
import { Button } from 'modules/shared/atoms';
import styles from './TodoListActions.m.scss';

interface TodoListActionsProps {
  todoPageStatus: TodoPageStatuses;
  uncompletedItemsCount: number;
  onClickAllHandler: React.MouseEventHandler<HTMLButtonElement>;
  onClickActiveHandler: React.MouseEventHandler<HTMLButtonElement>;
  onClickCompletedHandler: React.MouseEventHandler<HTMLButtonElement>;
  onClickClearCompletedHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const TodoListActions: React.FC<TodoListActionsProps> = ({
  todoPageStatus,
  uncompletedItemsCount,
  onClickAllHandler,
  onClickActiveHandler,
  onClickCompletedHandler,
  onClickClearCompletedHandler,
}) => {
  const activeButtonClassName = (isActive: boolean): string => `fs-12 ${isActive && 'c-blue'}`;

  return (
    <div className={styles.todoListActions}>
      <div className="left">
        <span className="fs-12">{uncompletedItemsCount} items left </span>
      </div>
      <div className="middle">
        <Button
          id="show-all-todo-btn"
          className={activeButtonClassName(todoPageStatus === TodoPageStatuses.All)}
          title="All"
          onClick={onClickAllHandler}
        />
        <Button
          id="show-active-todo-btn"
          className={activeButtonClassName(todoPageStatus === TodoPageStatuses.Active)}
          title="Active"
          onClick={onClickActiveHandler}
        />
        <Button
          id="show-completed-todo-btn"
          className={activeButtonClassName(todoPageStatus === TodoPageStatuses.Completed)}
          title="Completed"
          onClick={onClickCompletedHandler}
        />
      </div>
      <div className="right">
        <Button className="fs-12" title="Clear Completed" onClick={onClickClearCompletedHandler} />
      </div>
    </div>
  );
};

export default TodoListActions;

import React from 'react';
import { TodoPageStatuses } from 'types/frontend';
import { Button } from 'modules/shared';
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
          className={activeButtonClassName(todoPageStatus === TodoPageStatuses.All)}
          title="All"
          onClick={onClickAllHandler}
        />
        <Button
          className={activeButtonClassName(todoPageStatus === TodoPageStatuses.Active)}
          title="Active"
          onClick={onClickActiveHandler}
        />
        <Button
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

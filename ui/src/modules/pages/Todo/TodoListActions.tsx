import React from 'react';
import { TodoPageStatuses } from '../../../types/frontend';
import Button from '../../../modules/shared/button/Button';

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
  const isActiveButton = (isActive: boolean) => `fs-12 ${isActive && 'c-blue'}`;

  return (
    <div className="todo-list-actions">
      <div className="left">
        <span className="fs-12">{uncompletedItemsCount} items left </span>
      </div>
      <div className="middle">
        <Button
          className={isActiveButton(todoPageStatus == TodoPageStatuses.All)}
          title="All"
          onClick={onClickAllHandler}
        />
        <Button
          className={isActiveButton(todoPageStatus == TodoPageStatuses.Active)}
          title="Active"
          onClick={onClickActiveHandler}
        />
        <Button
          className={isActiveButton(todoPageStatus == TodoPageStatuses.Completed)}
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

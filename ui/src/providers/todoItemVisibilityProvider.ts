import { TodoPageStatuses } from 'types/frontend';

export const isVisible = (isCompleted: boolean, todoPageStatus: TodoPageStatuses): boolean =>
  todoPageStatus === TodoPageStatuses.All ||
  (isCompleted && todoPageStatus === TodoPageStatuses.Completed) ||
  (!isCompleted && todoPageStatus === TodoPageStatuses.Active);

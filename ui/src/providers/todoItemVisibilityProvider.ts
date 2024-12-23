import { TodoPageStatuses } from 'types/frontend';

export const isVisible = (isCompleted: boolean, todoPageStatus: TodoPageStatuses): boolean => {
  if (todoPageStatus === TodoPageStatuses.Completed) {
    return isCompleted;
  }

  if (todoPageStatus === TodoPageStatuses.Active) {
    return !isCompleted;
  }

  return todoPageStatus === TodoPageStatuses.All;
};

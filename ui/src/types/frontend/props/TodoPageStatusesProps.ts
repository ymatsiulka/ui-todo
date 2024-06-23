export enum TodoPageStatuses {
  All,
  Active,
  Completed,
}

export interface TodoPageProps {
  todoPageStatus: TodoPageStatuses;
}

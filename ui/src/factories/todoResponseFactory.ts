import { TodoResponse } from '../types/api/TodoResponse';

export const todoResponseFactory = {
  create: (name: string): TodoResponse => {
    return {
      id: 0,
      isCompleted: false,
      name,
      order: 0,
    };
  },
};

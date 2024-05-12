import { TodoResponse } from '../types/api/TodoResponse';

export const todoResponseFactory = {
  create: (id: number, name: string): TodoResponse => {
    return {
      id: id,
      isCompleted: false,
      name,
      order: 0,
    };
  },
};

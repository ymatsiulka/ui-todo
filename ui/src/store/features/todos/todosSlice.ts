import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { todoResponseFactory } from 'factories';
import { type TodoState } from 'types/redux/TodoState';

const initialState: TodoState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todoName: string }>) => {
      const todoName = action.payload.todoName;
      state.items = [todoResponseFactory.create(state.items.length + 1, todoName), ...state.items].map((t) => {
        return { ...t, order: t.order + 1 };
      });
    },
    checkTodo(state, action: PayloadAction<{ id: number; isChecked: boolean }>) {
      const { id, isChecked } = action.payload;
      const index = state.items.findIndex((el) => el.id === id);
      state.items[index].isCompleted = isChecked;
    },
    deleteTodo(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state.items = state.items.filter((el) => el.id !== id);
    },
    clearCompletedTodos(state) {
      state.items = state.items.filter((t) => !t.isCompleted);
    },
    moveTodos(state, action: PayloadAction<{ firstIndex: number; secondIndex: number }>) {
      const { firstIndex, secondIndex } = action.payload;
      const temp = state.items[firstIndex];
      state.items[firstIndex] = state.items[secondIndex];
      state.items[secondIndex] = temp;
    },
  },
});

export const uncompletedSelectItemsCount = (state: TodoState): number =>
  state.items.filter((t) => !t.isCompleted).length;

export const { addTodo, checkTodo, deleteTodo, clearCompletedTodos, moveTodos } = todosSlice.actions;
export default todosSlice.reducer;

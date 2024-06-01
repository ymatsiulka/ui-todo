import { configureStore } from '@reduxjs/toolkit';
import { storage } from 'appConstants';
import { loadFromLocalStorage, saveToLocalStorage } from 'storage';
import { TodoState } from 'types/redux/TodoState';
import todosReducer from 'store/features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: loadFromLocalStorage<TodoState>(storage.reduxTodos),
  },
});

store.subscribe(() => {
  saveToLocalStorage(storage.reduxTodos, store.getState().todos);
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;

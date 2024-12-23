import '@testing-library/jest-dom';
import reducer, {
  addTodo,
  checkTodo,
  clearCompletedTodos,
  deleteTodo,
  moveTodos,
  uncompletedSelectItemsCount,
} from './todosSlice';
import { type TodoState } from 'types/redux/TodoState';
import { type TodoResponse } from 'types/api';

const initialState: TodoState = {
  items: [],
  nextId: 0,
};

test('undefined reducer should return initial state', async () => {
  // Arrange
  // Act
  const result = reducer(undefined, { type: 'unknown' });

  // Assert
  expect(result).toEqual(initialState);
});

test('addTodo reducer should add todo to initial state', async () => {
  // Arrange
  const item: TodoResponse = {
    id: 1,
    order: 1,
    name: 'do smth',
    isCompleted: false,
  };
  const expectedState: TodoState = {
    items: [item],
    nextId: 1,
  };

  // Act
  const result = reducer(initialState, addTodo({ todoName: 'do smth' }));

  // Assert
  expect(result).toEqual(expectedState);
});

test('addTodo reducer when have initial item should add todo to initial state', async () => {
  // Arrange
  const item1: TodoResponse = {
    id: 1,
    order: 2,
    name: 'do smth1',
    isCompleted: false,
  };
  const item2: TodoResponse = {
    id: 2,
    order: 1,
    name: 'do smth2',
    isCompleted: false,
  };
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
    ],
    nextId: 1,
  };
  const expectedState: TodoState = {
    items: [item2, item1],
    nextId: 2,
  };

  // Act
  const result = reducer(state, addTodo({ todoName: 'do smth2' }));

  // Assert
  expect(result).toEqual(expectedState);
});

test('checkTodo reducer should complete todo', async () => {
  // Arrange
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth',
        isCompleted: false,
      },
    ],
    nextId: 0,
  };
  const expectedState: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth',
        isCompleted: true,
      },
    ],
    nextId: 0,
  };

  // Act
  const result = reducer(state, checkTodo({ id: 1, isChecked: true }));
  // Assert
  expect(result).toEqual(expectedState);
});

test('deleteTodo reducer should delete todo', async () => {
  // Arrange
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth',
        isCompleted: false,
      },
    ],
    nextId: 0,
  };
  const expectedState: TodoState = {
    items: [],
    nextId: 0,
  };

  // Act
  const result = reducer(state, deleteTodo({ id: 1 }));
  // Assert
  expect(result).toEqual(expectedState);
});

test('clearCompletedTodos reducer should leave only not completed todos', async () => {
  // Arrange
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
      {
        id: 2,
        order: 2,
        name: 'do smth2',
        isCompleted: true,
      },
    ],
    nextId: 0,
  };
  const expectedState: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
    ],
    nextId: 0,
  };

  // Act
  const result = reducer(state, clearCompletedTodos());
  // Assert
  expect(result).toEqual(expectedState);
});

test('moveTodos reducer should swap todos', async () => {
  // Arrange
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
      {
        id: 2,
        order: 2,
        name: 'do smth2',
        isCompleted: true,
      },
    ],
    nextId: 0,
  };
  const expectedState: TodoState = {
    items: [
      {
        id: 2,
        order: 2,
        name: 'do smth2',
        isCompleted: true,
      },
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
    ],
    nextId: 0,
  };

  // Act
  const result = reducer(state, moveTodos({ firstIndex: 0, secondIndex: 1 }));
  // Assert
  expect(result).toEqual(expectedState);
});

test('uncompletedSelectItemsCount should return expected result', async () => {
  // Arrange
  const state: TodoState = {
    items: [
      {
        id: 1,
        order: 1,
        name: 'do smth1',
        isCompleted: false,
      },
      {
        id: 2,
        order: 2,
        name: 'do smth2',
        isCompleted: true,
      },
    ],
    nextId: 0,
  };

  // Act
  const result = uncompletedSelectItemsCount(state);
  // Assert
  expect(result).toEqual(1);
});

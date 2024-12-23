import '@testing-library/jest-dom';
import store from './store';
import { type TodoState } from 'types/redux/TodoState';
import { loadFromLocalStorage, saveToLocalStorage } from 'storage';

const mockSaveToLocalStorage = saveToLocalStorage as jest.Mock;
const mockLoadFromLocalStorage = loadFromLocalStorage as jest.Mock;

jest.mock('storage', () => ({
  saveToLocalStorage: jest.fn(),
  loadFromLocalStorage: jest.fn(),
}));

test('configureStore should return expected object', async () => {
  // Arrange
  const todoState: TodoState = {
    items: [],
    nextId: 0,
  };
  const expectedInitState = {
    todos: todoState,
  };

  mockLoadFromLocalStorage.mockReturnValue(todoState);
  // Act
  const resultState = store.getState();

  // Assert
  expect(resultState).toEqual(expectedInitState);
});

test('configureStore should call expected subscribtions', async () => {
  // Arrange
  // Act
  store.dispatch({ type: '' });
  // Assert
  expect(mockSaveToLocalStorage).toHaveBeenCalled();
});

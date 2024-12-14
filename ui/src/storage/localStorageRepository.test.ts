import '@testing-library/jest-dom';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorageRepository';

test('saveToLocalStorage should save expected data', async () => {
  // Arrange
  const key = 'test-key-1';
  const data = {
    id: 1,
    property: 'value',
    object: {
      id: 12,
    },
  };
  const expected = JSON.stringify(data);
  // Act
  saveToLocalStorage(key, data);

  // Assert
  const result = localStorage.getItem(key);
  expect(result).toEqual(expected);
});

test('saveToLocalStorage when exception thrown should log error', async () => {
  // Arrange
  const key = 'test-key-4';
  const error = new Error();
  const consoleError = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  jest.spyOn(JSON, 'stringify').mockImplementationOnce(() => {
    throw error;
  });
  // Act
  saveToLocalStorage(key, 'data');

  // Assert
  expect(consoleError).toHaveBeenCalledWith('Could not save data to localStorage', error);
});

test('loadFromLocalStorage should return expected result', async () => {
  // Arrange
  const key = 'test-key-1';
  const expected = {
    id: 1,
    property: 'value',
    object: {
      id: 12,
    },
  };
  // Act
  saveToLocalStorage(key, expected);
  const result = loadFromLocalStorage(key);

  // Assert
  expect(result).toEqual(expected);
});

test('loadFromLocalStorage when no data should return undefined', async () => {
  // Arrange
  const key = 'test-key-2';
  // Act
  const result = loadFromLocalStorage(key);

  // Assert
  expect(result).toBeUndefined();
});

test('loadFromLocalStorage when exception thrown should return undefined and log error', async () => {
  // Arrange
  const key = 'test-key-3';
  const error = new Error();
  const consoleError = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
    throw error;
  });
  // Act
  saveToLocalStorage(key, 'data');
  const result = loadFromLocalStorage(key);

  // Assert
  expect(result).toBeUndefined();
  expect(consoleError).toHaveBeenCalledWith('Could not load data from localStorage', error);
});

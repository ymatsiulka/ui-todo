import '@testing-library/jest-dom';
import { saveToLocalStorage } from './localStorageRepository';

test('When saved by key in local storage valid data, then localstorage should contains the same data by key', async () => {
  // Arrange
  const key = 'test-key-1';
  const data: Record<string, string> = {
    TestFile: 'Map',
  };
  // Act
  saveToLocalStorage(key, data);

  // Assert
  const result = localStorage.getItem(key);
  expect(result).toEqual(data);
});

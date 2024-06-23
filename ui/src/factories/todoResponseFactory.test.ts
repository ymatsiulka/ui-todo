import '@testing-library/jest-dom';
import { todoResponseFactory } from './todoResponseFactory';

test('create when all data are valid, then should be created todoResponse', async () => {
  // Arrange
  const id = 1;
  const name = 'Task name 1';

  // Act
  const result = todoResponseFactory.create(id, name);

  // Assert
  expect(result.id).toEqual(id);
  expect(result.name).toEqual(name);
  expect(result.order).toEqual(0);
  expect(result.isCompleted).toEqual(false);
});

import { TodoPageStatuses } from 'types/frontend';
import { isVisible } from './todoItemVisibilityProvider';

test.each([true, false])('isVisible when todoPageStatus is All should return true', async (isCompleted: boolean) => {
  // Arrange
  // Act
  const result = isVisible(isCompleted, TodoPageStatuses.All);

  // Assert
  expect(result).toBe(true);
});

test.each([
  [true, false],
  [false, true],
])(
  'isVisible when todoPageStatus is Active should return expected result',
  async (isCompleted: boolean, expected: boolean) => {
    // Arrange
    // Act
    const result = isVisible(isCompleted, TodoPageStatuses.Active);

    // Assert
    expect(result).toBe(expected);
  },
);

test.each([
  [true, true],
  [false, false],
])(
  'isVisible when todoPageStatus is Completed should return expected result',
  async (isCompleted: boolean, expected: boolean) => {
    // Arrange
    // Act
    const result = isVisible(isCompleted, TodoPageStatuses.Completed);

    // Assert
    expect(result).toBe(expected);
  },
);

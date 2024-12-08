import '@testing-library/jest-dom';
import { useAppDispatch } from './useAppDispatch';

const mockUseDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    useDispatch: mockUseDispatch,
  };
});

test('useAppDispatch should return expected result', async () => {
  // Arrange
  // Act
  const result = useAppDispatch();

  // Assert
  expect(result).toEqual(mockUseDispatch);
});

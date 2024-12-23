import '@testing-library/jest-dom';
import { useAppDispatch } from './useAppDispatch';

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(mockUseDispatch),
}));

test('useAppDispatch should be expected function', async () => {
  // Arrange
  // Act
  // Assert
  expect(useAppDispatch.toString()).toEqual(mockUseDispatch.toString());
});

import '@testing-library/jest-dom';
import { useAppSelector } from './useAppSelector';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(mockUseSelector),
}));

test('useAppSelector should be expected function', async () => {
  // Arrange
  // Act
  // Assert
  expect(useAppSelector.toString()).toEqual(mockUseSelector.toString());
});

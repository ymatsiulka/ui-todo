import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useAppDispatch } from 'hooks';
import TodoItem from './TodoItem';

const mockUseState = useState as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn((x) => x()),
}));

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('store/features/todos/todosSlice', () => ({
  checkTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

jest.mock('modules/shared', () => ({
  Button: jest.fn((props) => <button data-testid="button" {...props} />),
  Checkbox: jest.fn(({ onCheckedHandler }) => (
    <input data-testid="checkbox" type="checkbox" onChange={onCheckedHandler} />
  )),
}));

beforeEach(() => {
  mockSetState.mockClear();
  mockUseState.mockImplementationOnce(() => [true, mockSetState]);
});

test('TodoItem should render properly', async () => {
  // Arrange
  const mockOnDragStartHandler = jest.fn();
  const mockOnDragEnterHandler = jest.fn();
  const mockOnDragEndHandler = jest.fn();

  // Act
  const { asFragment, container } = render(
    <TodoItem
      id={1}
      name="name"
      isCompleted={true}
      onDragStartHandler={mockOnDragStartHandler}
      onDragEnterHandler={mockOnDragEnterHandler}
      onDragEndHandler={mockOnDragEndHandler}
      isVisible={true}
    />,
  );

  const listItem = container.firstChild;
  fireEvent.dragStart(listItem);
  fireEvent.dragEnter(listItem);
  fireEvent.dragEnd(listItem);

  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(mockOnDragStartHandler).toHaveBeenCalled();
  expect(mockOnDragEnterHandler).toHaveBeenCalled();
  expect(mockOnDragEndHandler).toHaveBeenCalled();
});

test('TodoItem when hover should update hovering state', async () => {
  // Arrange
  // Act
  const { container } = render(
    <TodoItem
      id={1}
      name="name"
      isCompleted={true}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
      isVisible={true}
    />,
  );

  const listItem = container.firstChild;
  fireEvent.mouseOver(listItem);
  fireEvent.mouseOut(listItem);

  // Assert
  expect(mockSetState).toHaveBeenCalledTimes(2);
  expect(mockSetState).toHaveBeenCalledWith(true);
  expect(mockSetState).toHaveBeenCalledWith(false);
});

test('TodoItem when delete button clicked should delete todo', async () => {
  // Arrange
  const mockDispatch = jest.fn();
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);

  // Act
  const { getByTestId } = render(
    <TodoItem
      id={1}
      name="name"
      isCompleted={true}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
      isVisible={true}
    />,
  );

  const deleteButton = getByTestId('button');
  fireEvent.click(deleteButton);

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test('TodoItem when checkbox clicked should dispatch todo state', async () => {
  // Arrange
  const mockDispatch = jest.fn();
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);

  // Act
  const { getByTestId } = render(
    <TodoItem
      id={1}
      name="name"
      isCompleted={true}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
      isVisible={true}
    />,
  );

  const checkbox = getByTestId('checkbox');
  fireEvent.click(checkbox);

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test('TodoItem when not visible should change state to not hovering', async () => {
  // Arrange
  // Act
  render(
    <TodoItem
      id={1}
      name="name"
      isCompleted={true}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
      isVisible={false}
    />,
  );

  // Assert
  expect(mockSetState).toHaveBeenCalledTimes(1);
  expect(mockSetState).toHaveBeenCalledWith(false);
});

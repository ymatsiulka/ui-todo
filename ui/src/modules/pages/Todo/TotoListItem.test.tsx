import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TodoPageStatuses } from 'types/frontend';
import TodoListItem from './TotoListItem';
import { useAppDispatch } from 'hooks';

const mockUseState = useState as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
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
  Checkbox: jest.fn(({ isChecked, onCheckedHandler, ...props }) => (
    <input data-testid="checkbox" type="checkbox" checked={isChecked} onChange={onCheckedHandler} {...props} />
  )),
}));

beforeEach(() => {
  mockSetState.mockClear();
  mockUseState.mockImplementationOnce(() => [true, mockSetState]);
});

test('TodoListItem should render properly', async () => {
  // Arrange
  const mockOnDragStartHandler = jest.fn();
  const mockOnDragEnterHandler = jest.fn();
  const mockOnDragEndHandler = jest.fn();

  // Act
  const { asFragment, container } = render(
    <TodoListItem
      id={1}
      name="name"
      isCompleted={true}
      todoPageStatus={TodoPageStatuses.Completed}
      onDragStartHandler={mockOnDragStartHandler}
      onDragEnterHandler={mockOnDragEnterHandler}
      onDragEndHandler={mockOnDragEndHandler}
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

test('TodoListItem when hover should update hovering state', async () => {
  // Arrange
  // Act
  const { container } = render(
    <TodoListItem
      id={1}
      name="name"
      isCompleted={true}
      todoPageStatus={TodoPageStatuses.Completed}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
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

test('TodoListItem when delete button clicked should delete todo', async () => {
  // Arrange
  const mockDispatch = jest.fn();
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);

  // Act
  const { getByTestId } = render(
    <TodoListItem
      id={1}
      name="name"
      isCompleted={true}
      todoPageStatus={TodoPageStatuses.Completed}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
    />,
  );

  const deleteButton = getByTestId('button');
  fireEvent.click(deleteButton);

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test('TodoListItem when checkbox clicked should change todo state', async () => {
  // Arrange
  const mockDispatch = jest.fn();
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);

  // Act
  const { getByTestId } = render(
    <TodoListItem
      id={1}
      name="name"
      isCompleted={true}
      todoPageStatus={TodoPageStatuses.Completed}
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
    />,
  );

  const checkbox = getByTestId('checkbox');
  fireEvent.click(checkbox);

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockSetState).toHaveBeenCalledTimes(1);
});

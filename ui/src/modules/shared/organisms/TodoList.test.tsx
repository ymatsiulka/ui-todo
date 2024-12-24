import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TodoPageStatuses } from 'types/frontend';
import { useAppDispatch } from 'hooks';
import TodoList from './TodoList';

const mockDispatch = jest.fn();
const mockUseAppDispatch = useAppDispatch as jest.Mock;

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/shared/moleculas/TodoItem', () =>
  jest.fn(({ onDragStartHandler, onDragEnterHandler, onDragEndHandler }) => (
    <li
      data-testid="li"
      onDragStart={onDragStartHandler}
      onDragEnter={onDragEnterHandler}
      onDragEnd={onDragEndHandler}
    />
  )),
);

beforeEach(() => {
  mockDispatch.mockClear();
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);
});

test('TodoList should render properly', async () => {
  // Arrange
  // Act
  const { asFragment, getByTestId } = render(
    <TodoList
      todoItems={[
        {
          id: 1,
          order: 1,
          name: 'do smth',
          isCompleted: true,
        },
      ]}
      todoPageStatus={TodoPageStatuses.Completed}
    />,
  );

  const listItem = getByTestId('li');
  fireEvent.dragStart(listItem);
  fireEvent.dragEnter(listItem);
  fireEvent.dragEnd(listItem);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

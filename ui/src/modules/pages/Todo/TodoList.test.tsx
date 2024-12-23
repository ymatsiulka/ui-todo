import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TodoPageStatuses } from 'types/frontend';
import TodoList from './TodoList';

jest.mock('./TotoListItem', () => {
  return jest.fn(
    ({ isCompleted, todoPageStatus, onDragStartHandler, onDragEnterHandler, onDragEndHandler, ...props }) => (
      <li onDragStart={onDragStartHandler} onDragEnter={onDragEnterHandler} onDragEnd={onDragEndHandler} {...props}>
        test item
      </li>
    ),
  );
});

test('TodoList should render properly', async () => {
  // Arrange
  const mockOnDragStartHandler = jest.fn();
  const mockOnDragEnterHandler = jest.fn();
  const mockOnDragEndHandler = jest.fn();

  // Act
  const { asFragment, getByText } = render(
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
      onDragStartHandler={mockOnDragStartHandler}
      onDragEnterHandler={mockOnDragEnterHandler}
      onDragEndHandler={mockOnDragEndHandler}
    />,
  );

  const listItem = getByText('test item');
  fireEvent.dragStart(listItem);
  fireEvent.dragEnter(listItem);
  fireEvent.dragEnd(listItem);

  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(mockOnDragStartHandler).toHaveBeenCalled();
  expect(mockOnDragEnterHandler).toHaveBeenCalled();
  expect(mockOnDragEndHandler).toHaveBeenCalled();
});

import React from 'react';
import { render } from '@testing-library/react';
import { TodoPageStatuses } from 'types/frontend';
import TodoList from './TodoList';

test('TodoList should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
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
      onDragStartHandler={jest.fn()}
      onDragEnterHandler={jest.fn()}
      onDragEndHandler={jest.fn()}
    />,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

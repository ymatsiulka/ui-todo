import React from 'react';
import { render } from '@testing-library/react';
import TodoListActions from './TodoListActions';
import { TodoPageStatuses } from 'types/frontend';

jest.mock('modules/shared', () => ({
  Button: jest.fn((props) => <button {...props} />),
}));

test('TodoListActions should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
    <TodoListActions
      uncompletedItemsCount={1}
      todoPageStatus={TodoPageStatuses.Active}
      onClickAllHandler={jest.fn()}
      onClickActiveHandler={jest.fn()}
      onClickCompletedHandler={jest.fn()}
      onClickClearCompletedHandler={jest.fn()}
    />,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

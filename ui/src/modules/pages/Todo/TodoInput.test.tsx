import React from 'react';
import { render } from '@testing-library/react';
import TodoInput from './TodoInput';

jest.mock('modules/shared', () => {
  return {
    Input: jest.fn((props) => <div {...props} />),
  };
});

test('TodoInput should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<TodoInput value="" onKeyUpHandler={jest.fn()} onChangeHandler={jest.fn()} />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

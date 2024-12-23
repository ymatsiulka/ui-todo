import React from 'react';
import { render } from '@testing-library/react';
import App from 'App';

jest.mock('modules/pages', () => {
  return {
    Todo: jest.fn(() => <div />),
  };
});

test('App should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<App />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

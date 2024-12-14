import React from 'react';
import { render } from '@testing-library/react';
import App from 'App';

test('App should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<App />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

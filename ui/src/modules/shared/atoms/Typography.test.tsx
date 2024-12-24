import React from 'react';
import { render } from '@testing-library/react';
import Typography from './Typography';

test('Typography should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<Typography variant="h1" text="123" className="spacer"></Typography>);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

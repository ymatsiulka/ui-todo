import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('Button should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
    <Button className="btn-primary" type="button" title="primary">
      Some text
    </Button>,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('Button with children should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
    <Button className="btn-primary" type="button">
      Some text
    </Button>,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

test('Button with title should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<Button className="btn-primary" title="Some text" />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

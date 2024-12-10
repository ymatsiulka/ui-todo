import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

test('Input should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
    <Input name="input" label="label">
      Some text
    </Input>,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

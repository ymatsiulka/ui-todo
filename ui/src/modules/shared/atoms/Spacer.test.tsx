import React from 'react';
import { render } from '@testing-library/react';
import Spacer from './Spacer';

test('Spacer should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(
    <Spacer className="spacer" top={1} bottom={1} left={1} right={2}>
      Some text
    </Spacer>,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

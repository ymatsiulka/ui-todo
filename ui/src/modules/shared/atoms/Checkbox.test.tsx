import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Checkbox from './Checkbox';

test.each([true, false])('Checkbox should render properly', async (checked: boolean) => {
  // Arrange
  const mockCheckedHandler = jest.fn();

  // Act
  const { asFragment } = render(
    <Checkbox id={1} name="checkbox" label="label" onCheckedHandler={mockCheckedHandler} isChecked={checked} />,
  );

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

test('Checkbox should call checkHandler', () => {
  // Arrange
  const mockCheckedHandler = jest.fn();

  // Act
  const { getByLabelText } = render(
    <Checkbox id={1} name="checkbox" label="label" onCheckedHandler={mockCheckedHandler} isChecked={true} />,
  );
  const checkbox = getByLabelText('label');
  fireEvent.click(checkbox);

  // Assert
  expect(mockCheckedHandler).toHaveBeenCalledTimes(1);
  expect(mockCheckedHandler).toHaveBeenCalledWith(false);
});

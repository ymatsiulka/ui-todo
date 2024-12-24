import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { type TodoState } from 'types/redux/TodoState';
import { TodoPageStatuses } from 'types/frontend';
import Todo from './Todo';
import { keys } from 'appConstants';

const mockDispatch = jest.fn();
const mockSetTodoName = jest.fn();
const mockSetTodoPageStatus = jest.fn();
const mockUseState = useState as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;

const state: TodoState = {
  items: [
    {
      id: 1,
      order: 1,
      name: 'name1',
      isCompleted: false,
    },
    {
      id: 2,
      order: 2,
      name: 'name2',
      isCompleted: false,
    },
  ],
  nextId: 2,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn((x) => x()),
}));

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('modules/shared/organisms/TodoList', () =>
  jest.fn(() => (
    <ul>
      <li>some text</li>
    </ul>
  )),
);

jest.mock('modules/shared/moleculas/TodoInput', () =>
  jest.fn(({ onChangeHandler, onKeyUpHandler }) => (
    <input data-testid="input" type="text" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} />
  )),
);

jest.mock('modules/shared/organisms/TodoListActions', () =>
  jest.fn(({ onClickAllHandler, onClickActiveHandler, onClickCompletedHandler, onClickClearCompletedHandler }) => (
    <div>
      <button data-testid="all-button" onClick={onClickAllHandler} />
      <button data-testid="active-button" onClick={onClickActiveHandler} />
      <button data-testid="complete-button" onClick={onClickCompletedHandler} />
      <button data-testid="clear-button" onClick={onClickClearCompletedHandler} />
    </div>
  )),
);

beforeEach(() => {
  mockDispatch.mockClear();
  mockSetTodoName.mockClear();
  mockUseState.mockImplementationOnce(() => ['', mockSetTodoName]);
  mockSetTodoPageStatus.mockClear();
  mockUseState.mockImplementationOnce(() => [TodoPageStatuses.All, mockSetTodoPageStatus]);
  mockUseAppSelector.mockReturnValueOnce(state);
  mockUseAppDispatch.mockReturnValueOnce(mockDispatch);
});

test('Todo should render properly', async () => {
  // Arrange
  // Act
  const { asFragment } = render(<Todo />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

test('Todo when no items render properly', async () => {
  // Arrange
  mockUseAppSelector.mockReturnValueOnce({
    items: [],
    nextId: 0,
  });

  // Act
  const { asFragment } = render(<Todo />);

  // Assert
  expect(asFragment()).toMatchSnapshot();
});

test('Todo when all button clicked should update state', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const allButton = getByTestId('all-button');
  fireEvent.click(allButton);

  // Assert
  expect(mockSetTodoPageStatus).toHaveBeenCalledTimes(1);
  expect(mockSetTodoPageStatus).toHaveBeenCalledWith(TodoPageStatuses.All);
});

test('Todo when active button clicked should update state', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const activeButton = getByTestId('active-button');
  fireEvent.click(activeButton);

  // Assert
  expect(mockSetTodoPageStatus).toHaveBeenCalledTimes(1);
  expect(mockSetTodoPageStatus).toHaveBeenCalledWith(TodoPageStatuses.Active);
});

test('Todo when complete button clicked should update state', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const completeButton = getByTestId('complete-button');
  fireEvent.click(completeButton);

  // Assert
  expect(mockSetTodoPageStatus).toHaveBeenCalledTimes(1);
  expect(mockSetTodoPageStatus).toHaveBeenCalledWith(TodoPageStatuses.Completed);
});

test('Todo when clear button clicked should dispatch store', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const clearButton = getByTestId('clear-button');
  fireEvent.click(clearButton);

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test('Todo when input changed should update state', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'some text' } });

  // Assert
  expect(mockSetTodoName).toHaveBeenCalledTimes(1);
  expect(mockSetTodoName).toHaveBeenCalledWith('some text');
});

test('Todo when enter key up should dispatch store', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const input = getByTestId('input');
  fireEvent.keyUp(input, { key: keys.enter });

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockSetTodoName).toHaveBeenCalledTimes(1);
  expect(mockSetTodoName).toHaveBeenCalledWith('');
});

test('Todo when some key up should do nothing', async () => {
  // Arrange
  // Act
  const { getByTestId } = render(<Todo />);

  const input = getByTestId('input');
  fireEvent.keyUp(input, { key: 'F' });

  // Assert
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(mockSetTodoName).toHaveBeenCalledTimes(0);
});

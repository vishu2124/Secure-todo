import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemedTodoInput } from '@/components/ThemedTodoInput';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the `useThemeColor` hook to return predictable values for testing.
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('<ThemedTodoInput />', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the hook return values
    (useThemeColor as jest.Mock).mockReturnValue({
      background: 'white',
      text: 'black',
      buttonBackground: 'blue',
      buttonText: 'white',
    });
  });

  test('renders correctly and handles text input', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemedTodoInput
        value="Test Todo"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isEditing={false}
      />
    );

    const input = getByPlaceholderText('Add Todo...');
    fireEvent.changeText(input, 'New Todo');
    expect(mockOnChange).toHaveBeenCalledWith('New Todo');
  });

  test('calls onSubmit when the button is pressed', () => {
    const { getByText } = render(
      <ThemedTodoInput
        value="Test Todo"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isEditing={false}
      />
    );

    const button = getByText('Add Todo');
    fireEvent.press(button);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('displays the correct placeholder text when editing', () => {
    const { getByPlaceholderText } = render(
      <ThemedTodoInput
        value="Test Todo"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        isEditing={true}
      />
    );

    const input = getByPlaceholderText('Update Todo...');
    expect(input).toBeTruthy();
  });

 
});

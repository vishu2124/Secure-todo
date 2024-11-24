import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemedTodoList } from '@/components/ThemedTodoList';
import { Todo } from '@/hooks/useTodoList';
import * as Haptics from 'expo-haptics';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the Haptics and useThemeColor hooks to isolate the test

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(), // Mock the method
  ImpactFeedbackStyle: {
    Light: 'light', // Mock the constant
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('<ThemedTodoList />', () => {
  const todos: Todo[] = [
    { id: '1', title: 'Test Todo 1', checked: false }
  ];

  const mockOnEdit = jest.fn();
  const mockOnChecked = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the theme values
    (useThemeColor as jest.Mock).mockReturnValue({
      text: 'black',
      buttonBackground: 'blue',
    });
  });

  test('renders the todo list correctly', () => {
    const { getByText } = render(
      <ThemedTodoList todos={todos} onEdit={mockOnEdit} onChecked={mockOnChecked} readOnly={false} />
    );

    expect(getByText('Test Todo 1')).toBeTruthy();
  });

  test('calls onEdit when the Edit button is pressed', () => {
    const { getByText } = render(
      <ThemedTodoList todos={todos} onEdit={mockOnEdit} onChecked={mockOnChecked} readOnly={false} />
    );

    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(todos[0]);
  });

  test('calls onChecked when the Check button is pressed', () => {
    const { getByText } = render(
      <ThemedTodoList todos={todos} onEdit={mockOnEdit} onChecked={mockOnChecked} readOnly={false} />
    );

    const checkButton = getByText('Check');
    fireEvent.press(checkButton);
    expect(mockOnChecked).toHaveBeenCalledWith('1');
  });

  test('does not display action buttons when readOnly is true', () => {
    const { queryByText } = render(
      <ThemedTodoList todos={todos} onEdit={mockOnEdit} onChecked={mockOnChecked} readOnly={true} />
    );

    expect(queryByText('Edit')).toBeNull();
    expect(queryByText('Check')).toBeNull();
  });

  test('calls haptic feedback when Check button is pressed on iOS', () => {
    // Set the process environment for iOS
    process.env.EXPO_OS = 'ios';

    const { getByText } = render(
      <ThemedTodoList todos={todos} onEdit={mockOnEdit} onChecked={mockOnChecked} readOnly={false} />
    );

    const checkButton = getByText('Check');
    fireEvent.press(checkButton);

    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

});

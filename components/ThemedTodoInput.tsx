import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTodoInputProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
};

export function ThemedTodoInput({ value, onChange, onSubmit, isEditing }: ThemedTodoInputProps) {
  const backgroundColor = useThemeColor({}, 'background', 'background');
  const textColor = useThemeColor({}, 'text', 'text');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');
  const buttonTextColor = useThemeColor({}, 'buttonText', 'text');

  return (
    <>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={isEditing ? 'Update Todo...' : 'Add Todo...'}
        placeholderTextColor={textColor}
        style={[styles.input, { color: textColor, borderColor: textColor, backgroundColor }]}
      />
      <TouchableOpacity onPress={onSubmit} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={{ color: buttonTextColor }}>{isEditing ? 'Update Todo' : 'Add Todo'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
});

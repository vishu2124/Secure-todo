import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTodoInputProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
};

export function ThemedTodoInput({ value, onChange, onSubmit, isEditing }: ThemedTodoInputProps) {
  const textColor = useThemeColor({ light: '#333', dark: '#ccc' }, 'text', 'text');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={isEditing ? 'Update Todo...' : 'Add Todo...'}
        placeholderTextColor={textColor}
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <TouchableOpacity onPress={onSubmit} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={styles.buttonText}>{isEditing ? 'Update Todo' : 'Add Todo'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1, // Ensures the input takes most of the space
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10, // Adds spacing between the input and button
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

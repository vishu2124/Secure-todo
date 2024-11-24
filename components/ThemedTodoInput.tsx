import React, { useState } from 'react';
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
  
  // State to track if the input is focused
  const [isFocused, setIsFocused] = useState(false);

  // Change the input border color and text color when focused
  const borderColor = isFocused ? '#007BFF' : textColor; // Blue when focused, default textColor when not
  const inputTextColor = isFocused ? '#007BFF' : textColor; // Same color for text when focused

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={isEditing ? 'Update Todo...' : 'Add Todo...'}
        placeholderTextColor={textColor}
        style={[
          styles.input,
          { color: inputTextColor, borderColor: borderColor }
        ]}
        onFocus={() => setIsFocused(true)}  // Set focus state to true when the input is focused
        onBlur={() => setIsFocused(false)}  // Set focus state to false when the input loses focus
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

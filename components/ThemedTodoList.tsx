import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Todo = {
  id: number;
  text: string;
};

type ThemedTodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

export function ThemedTodoList({ todos, onEdit, onDelete }: ThemedTodoListProps) {
  const textColor = useThemeColor({ light: 'light', dark: 'dark' }, 'text', 'text');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');
  const deleteButtonColor = 'red';

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.todoContainer}>
          <Text style={[styles.todoText, { color: textColor }]}>{item.text}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onEdit(item)}
              style={[styles.actionButton, { backgroundColor: buttonBackgroundColor }]}>
              <Text style={{ color: '#fff' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={[styles.actionButton, { backgroundColor: deleteButtonColor }]}>
              <Text style={{ color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
});

import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Todo = {
  id: number;
  text: string;
};

type DeletedTodosListProps = {
  todos: Todo[];
};

export default function OldTodoScreen({ todos }: DeletedTodosListProps) {
  const textColor = useThemeColor({}, 'text', 'text');

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.todoContainer}>
          <Text style={[styles.todoText, { color: textColor }]}>{item.text}</Text>
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
});

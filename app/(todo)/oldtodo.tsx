import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedTodoList } from '@/components/ThemedTodoList';
import useTodos from '@/hooks/useTodoList';

export default function OldTodoScreen() {
  const { todos,deleteItem } = useTodos();
  const checkedItems = useMemo(() => {
    return todos.filter((item) => item.checked);
  }, [todos]);

  const handleDeleteTodo = (id: string) => {
    deleteItem(id);
  };
  return (
    <View style={styles.container}>
      <ThemedTodoList todos={checkedItems} onEdit={() => {}} onChecked={() => {}} onDelete={handleDeleteTodo}  readOnly={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

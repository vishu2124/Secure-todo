import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedTodoInput } from '@/components/ThemedTodoInput';
import { ThemedTodoList } from '@/components/ThemedTodoList';
import useTodos, { Todo } from '@/hooks/useTodoList';

export default function ListScreen() {
  const { todos, addItem, updateItem, checkedItem } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const checkedItems = useMemo(() => {
    return todos.filter((item) => !item.checked);
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addItem(newTodo);
      setNewTodo('');
    }
  };

  const handleUpdateTodo = () => {
    if (editingTodo && newTodo.trim()) {
      updateItem(editingTodo.id, newTodo.trim());
      setNewTodo('');
      setEditingTodo(null);
    }
  };

  const handleCompletedTodo = (id: string) => {
    checkedItem(id);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.title);
  };

  return (
    <View style={styles.container}>
      <ThemedTodoInput
        value={newTodo}
        onChange={setNewTodo}
        onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
        isEditing={!!editingTodo}
      />
      <ThemedTodoList todos={checkedItems} onEdit={handleEditTodo} onChecked={handleCompletedTodo} readOnly={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

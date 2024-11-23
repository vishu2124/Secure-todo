import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedTodoInput } from '@/components/ThemedTodoInput';
import { ThemedTodoList } from '@/components/ThemedTodoList';

type Todo = {
  id: number;
  text: string;
};

export default function ListScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleUpdateTodo = () => {
    if (editingTodo && newTodo.trim()) {
      setTodos((prev) => prev.map((todo) => (todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo)));
      setNewTodo('');
      setEditingTodo(null);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.text);
  };

  return (
    <View style={styles.container}>
      <ThemedTodoInput
        value={newTodo}
        onChange={setNewTodo}
        onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
        isEditing={!!editingTodo}
      />
      <ThemedTodoList todos={todos} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

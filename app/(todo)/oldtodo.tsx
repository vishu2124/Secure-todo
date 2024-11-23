import React, {useMemo} from 'react';
import {  View, StyleSheet } from 'react-native';
import { ThemedTodoList } from '@/components/ThemedTodoList';
import useTodos from '@/hooks/useTodoList';

export default function OldTodoScreen() {
  const { todos } = useTodos();
  const checkedItems = useMemo(() => {
    return todos.filter((item) => item.checked);
  }, [todos]);

  return (
    <View style={styles.container}>
      <ThemedTodoList todos={checkedItems} onEdit={()=>{}} onChecked={()=>{}} readOnly={true}/>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

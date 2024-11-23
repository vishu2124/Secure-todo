import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Todo }  from '@/hooks/useTodoList';
import * as Haptics from 'expo-haptics';



type ThemedTodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onChecked: (id: string) => void;
  readOnly:boolean;
};

export function ThemedTodoList({ todos, onEdit, onChecked,readOnly = false}: ThemedTodoListProps) {
  const textColor = useThemeColor({ light: 'light', dark: 'dark' }, 'text', 'text');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');
  const deleteButtonColor = 'green';

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.todoContainer}>
          <Text style={[styles.todoText, { color: textColor }]}>{item.title}</Text>
          <View style={styles.actions}>
            {!readOnly?(<><TouchableOpacity
              onPress={() => onEdit(item)}
              style={[styles.actionButton, { backgroundColor: buttonBackgroundColor }]}>
              <Text style={{ color: '#fff' }}>Edit</Text>
            </TouchableOpacity><TouchableOpacity
              onPress={() => {
                if (process.env.EXPO_OS === 'ios') {
                  // Add a soft haptic feedback when pressing down on the tabs.
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                onChecked(item.id)
              }}
              style={[styles.actionButton, { backgroundColor: deleteButtonColor }]}>
                <Text style={{ color: '#fff' }}>Check</Text>
              </TouchableOpacity></>)
            :null}
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

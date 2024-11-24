import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Todo } from '@/hooks/useTodoList';
import * as Haptics from 'expo-haptics';

type ThemedTodoListProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
  readOnly: boolean;
};

// Making ThemedTodoListProps optional by using Partial
type OptionalThemedTodoListProps = Partial<ThemedTodoListProps>;

export function ThemedTodoList({
  todos = [], // Default empty array for todos
  onEdit = () => {}, // Default no-op function
  onChecked = () => {}, // Default no-op function
  onDelete = () => {}, // Default no-op function
  readOnly = false, // Default readOnly as false
}: OptionalThemedTodoListProps) {
  const textColor = useThemeColor({ light: '#000', dark: '#000' }, 'text', 'text');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');
  const checkButtonColor = '#4CAF50'; // Green color for the "Check" button
  const deleteButtonColor = '#F44336'; // Red color for the "Delete" button

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.todoContainer}>
          <Text style={[styles.todoText, { color: textColor }]}>{item.title}</Text>
          <View style={styles.actions}>
            {!readOnly ? (
              <>
                <TouchableOpacity
                  onPress={() => onEdit(item)}
                  style={[styles.actionButton, { backgroundColor: buttonBackgroundColor }]}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (process.env.EXPO_OS === 'ios') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    onChecked(item.id);
                  }}
                  style={[styles.actionButton, { backgroundColor: checkButtonColor }]}>
                  <Text style={styles.buttonText}>Check</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  onDelete(item.id);
                }}
                style={[styles.actionButton, { backgroundColor: deleteButtonColor }]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      ListEmptyComponent={<Text style={[styles.emptyListText, { color: textColor }]}>{!readOnly ? 'No todos available!' : 'Non Completed!'}</Text>}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 5, // Adds spacing to the sides
    paddingVertical: 5, // Adds spacing between items
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8, // Adds spacing between items
    borderRadius: 8, // Adds a modern look
    backgroundColor: '#f9f9f9', // Light background for each item
    shadowColor: '#000', // Shadow for subtle elevation
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1, // Elevation for Android
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1, // Ensures the text takes up available space
    marginRight: 8, // Adds spacing between text and buttons
  },
  actions: {
    flexDirection: 'row',
    gap: 5, // Adds spacing between buttons
  },
  actionButton: {
    padding: 5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50, // Ensures consistent button size
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

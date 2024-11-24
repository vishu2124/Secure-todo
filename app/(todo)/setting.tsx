import React from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import useTodoList  from '@/hooks/useTodoList';

export default function SettingsPanel() {
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');
  const { clearAllTodos } = useTodoList();
  const { logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  // Handle clear all data
  const handleClearData = () => {
    // Clear app data (this is an example and may vary based on how you store data)
    // For example: clear localStorage, reset app state, etc.
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
          clearAllTodos();
          router.replace('/(todo)/todo');

          Alert.alert('Data Cleared', 'All data has been cleared successfully.');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText style={styles.title}>Settings</ThemedText>
      </ThemedView>
      <TouchableOpacity onPress={handleClearData} style={[styles.button, { backgroundColor: '#000' }]}>
        <Text style={styles.buttonText}>Erase All Data</Text>
      </TouchableOpacity>
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* Clear Data Button */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginTop: 20, 
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20, 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20, // Space between buttons
    marginHorizontal: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

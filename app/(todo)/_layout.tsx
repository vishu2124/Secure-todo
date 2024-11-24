import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '@/components/Header';
import { router } from 'expo-router';

export default function TodoLayout() {
  const [isTodo, setIsTodo] = useState(true);

  // Memoized navigation handlers to avoid re-creating them on every render
  const handleShowTodo = useCallback(() => {
    if (!isTodo) {
      setIsTodo(true);
      router.replace('/(todo)/todo');
    }
  }, [isTodo]);

  const handleShowOldTodo = useCallback(() => {
    if (isTodo) {
      setIsTodo(false);
      router.replace('/(todo)/oldtodo');
    }
  }, [isTodo]);

  const handleNavigateToSettings = useCallback(() => {
    router.replace('/(todo)/setting');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <Header
          onShowButtonLeft={handleShowTodo}
          onShowButtonRight={handleShowOldTodo}
          onNavigateToSettings={handleNavigateToSettings}
          isLeftActive={isTodo}
        />
        <Stack>
          <Stack.Screen name="todo" options={{ headerShown: false }} />
          <Stack.Screen name="oldtodo" options={{ headerShown: false }} />
          <Stack.Screen name="setting" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

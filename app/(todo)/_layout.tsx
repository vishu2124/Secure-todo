import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '@/components/Header';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // To handle safe area for both iOS and Android

export default function TodoLayout() {
  const [isTodo, setIsTodo] = useState(true);

  const insets = useSafeAreaInsets();

  const handleShowTodo = useCallback(() => {
      setIsTodo(true);
      router.replace('/(todo)/todo');
   }, [isTodo]);

  const handleShowOldTodo = useCallback(() => {
      setIsTodo(false);
      router.replace('/(todo)/oldtodo');
   }, []);

  const handleNavigateToSettings = useCallback(() => {
    router.replace('/(todo)/setting');
  }, []);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}>
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
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

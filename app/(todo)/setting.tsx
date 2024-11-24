import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from '@/components/ThemedButton';

export default function SettingsPanel() {
  const currentTheme = useColorScheme(); // 'light' or 'dark'
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === 'dark'); // Manage dark mode toggle
  const backgroundColor = useThemeColor({}, 'background', 'background');
  const textColor = useThemeColor({}, 'text', 'text');

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Optionally, you could store the user preference in async storage or context
    // to persist the theme choice across app restarts.
  };

  const handleLogout = () => {
    // Implement logout functionality (e.g., clear session, tokens, etc.)
    alert('Logged out');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: textColor }]}>Enable Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
      </View>

      {/* Logout Button */}
      <ThemedButton onPress={handleLogout} title="Logout" type="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
});

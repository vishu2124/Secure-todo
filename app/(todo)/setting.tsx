import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/hooks/useAuth';


export default function SettingsPanel() {
  const currentTheme = useColorScheme(); // 'light' or 'dark'
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === 'dark'); // Manage dark mode toggle
  const backgroundColor = useThemeColor({}, 'background', 'background');
  const textColor = useThemeColor({}, 'text', 'text');
  const { logout } = useAuth();

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
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

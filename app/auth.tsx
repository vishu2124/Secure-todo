import { StyleSheet, SafeAreaView, Alert, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function AuthScreen() {
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');

  const handlePress = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        router.replace('/(todo)/todo');
      } else {
        Alert.alert('Authentication Failed', result.error || 'Please try again.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText style={styles.title}>Let's Do Something Amazing Today!</ThemedText>
      </ThemedView>
      <TouchableOpacity onPress={handlePress} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
    paddingHorizontal: 20, 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14, 
    borderRadius: 8, 
    marginBottom: 40, 
    margin:20
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

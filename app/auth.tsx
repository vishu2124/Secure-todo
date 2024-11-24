import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

export default function homeScreen() {
  
  const handlePress = async () => {
    try {
      // Trigger the local authentication
      const result = await LocalAuthentication.authenticateAsync();

      console.log('Authentication Result:', result);

      if (result.success) {
        // Navigate to the desired route on successful authentication
        router.replace('/(todo)/todo');
      } else {
        Alert.alert('Authentication Failed', result.error || 'Please try again.', [{ text: 'OK' }]);
        // Handle failure cases (e.g., user canceling or authentication error)
        console.warn('Authentication failed:', result.error || 'Unknown error');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('An error occurred during authentication:', error);
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.titleContainer}>Index screen</ThemedText>
        <ThemedButton
          title="Login"
          onPress={handlePress}
          type="tertiary"
          lightColor="#007AFF"
          darkColor="#0A84FF"
          style={styles.button}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  viewContainer: {
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

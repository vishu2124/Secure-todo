import { StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

export default function homeScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.titleContainer}>Index screen</ThemedText>
        <ThemedButton
          title="Login"
          onPress={() => router.replace('/(todo)/todo')}
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

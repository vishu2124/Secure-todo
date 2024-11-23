import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function homeScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.titleContainer} >
          Index screen
        </ThemedText>
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
});

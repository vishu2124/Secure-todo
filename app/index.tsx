import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function homeScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.viewContainer}>
        <ThemedText style={styles.titleContainer} type="subtitle">
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
  viewContainer: {
    justifyContent: 'center',
    height: '100%',
  },
});

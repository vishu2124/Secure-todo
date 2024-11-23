import { StyleSheet, SafeAreaView, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.viewContainer}>
        <ThemedText style={styles.titleContainer} type="subtitle">todo deleted</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: 'center',
  },
  viewContainer: {
    justifyContent:'center',
    height: '100%',
  }
});

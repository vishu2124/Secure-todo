import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function homeScreen() {
  const { isAuthorized, authenticate, logout } = useAuth();

  return <Redirect href={isAuthorized ? '/(todo)/todo' : '/auth'} />;
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

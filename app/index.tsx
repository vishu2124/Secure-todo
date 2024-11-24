import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { isAuthorized } = useAuth();

  return <Redirect href={isAuthorized ? '/(todo)/todo' : '/auth'} />;
}

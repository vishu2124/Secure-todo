import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export type UseAuthReturnType = {
  isAuthorized: boolean;
  authenticate: () => Promise<boolean>;
  logout: () => void;
};

export const useAuth = (): UseAuthReturnType => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authenticate = useCallback(async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert(
          'Biometric Authentication Not Available',
          'Your device does not support biometric authentication or no biometric credentials are enrolled.',
        );
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        setIsAuthorized(true);
        return true;
      } else {
        Alert.alert('Authentication Failed', result.error || 'Please try again.');
        return false;
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      Alert.alert('Authentication Error', error.message || 'An unexpected error occurred.');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthorized(false);
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  }, []);

  return { isAuthorized, authenticate, logout };
};

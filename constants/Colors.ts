export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: '#007AFF',
    icon: '#1c1c1e',
    tabIconDefault: '#ccc',
    tabIconSelected: '#007AFF',
    buttonBackground: '#007AFF',
    buttonText: '#000',
    primaryBackground: '#f0f0f0', // Add additional colors here
    secondaryBackground: '#ffffff',
  },
  dark: {
    text: '#ffffff',
    background: '#000',
    tint: '#0A84FF',
    icon: '#f2f2f2',
    tabIconDefault: '#ccc',
    tabIconSelected: '#0A84FF',
    buttonBackground: '#000',
    buttonText: '#fff',
    primaryBackground: '#000',
    secondaryBackground: '#000',
  },
} as const; // `as const` ensures keys are strictly typed

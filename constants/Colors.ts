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
    text: '#000000',
    background: '#ffffff',
    tint: '#007AFF',
    icon: '#1c1c1e',
    tabIconDefault: '#ccc',
    tabIconSelected: '#007AFF',
    buttonBackground: '#007AFF',
    buttonText: '#000',
    primaryBackground: '#ffff', // Add additional colors here
    secondaryBackground: '#ffffff',
  },
} as const; // `as const` ensures keys are strictly typed

const tintColorLight = '#007AFF'; // Blue for light theme
const tintColorDark = '#0A84FF'; // Slightly darker blue for dark theme

export default {
  light: {
    text: '#007AFF', // Blue text for light mode
    background: '#FFFFFF', // White background
    tint: tintColorLight, // Blue accent
    icon: '#007AFF', // Blue icons for light theme
    tabIconDefault: '#C7C7CC', // Neutral for unselected tabs
    tabIconSelected: tintColorLight, // Blue for selected tabs
    buttonBackground: '#007AFF', // Blue button background
    buttonText: '#FFFFFF', // White text on buttons
  },
  dark: {
    text: '#ECEDEE', // Light gray text for dark mode
    background: '#000000', // Black background
    tint: tintColorDark, // Blue accent for dark mode
    icon: '#9BA1A6', // Neutral gray icons for dark theme
    tabIconDefault: '#3A3A3C', // Dark gray for unselected tabs
    tabIconSelected: tintColorDark, // Blue for selected tabs
    buttonBackground: tintColorDark, // Blue button background
    buttonText: '#FFFFFF', // White text on buttons
  },
};
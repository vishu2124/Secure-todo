import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
  type?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function ThemedButton({
  title,
  onPress,
  lightColor,
  darkColor,
  type = 'primary',
  style,
  textStyle,
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type === 'primary' ? 'primaryBackground' : 'secondaryBackground',
  );
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, type === 'outline' ? 'text' : 'buttonText');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === 'primary' ? { backgroundColor } : undefined,
        type === 'secondary' ? [styles.secondary, { backgroundColor }] : undefined,
        type === 'outline' ? [styles.outline, { borderColor: textColor }] : undefined,
        style,
      ]}>
      <Text
        style={[styles.text, { color: textColor }, type === 'outline' ? { fontWeight: 'bold' } : undefined, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

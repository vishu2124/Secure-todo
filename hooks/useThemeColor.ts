/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  colorType: 'background' | 'text' = 'text',
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  // Default to theme-based color if no custom props are provided
  const fallbackColor = Colors[theme][colorName];

  // Modify the color selection logic based on `colorType` if necessary
  if (colorType === 'background' && !colorFromProps) {
    return Colors[theme].buttonBackground || fallbackColor;
  }

  return colorFromProps || fallbackColor;
}

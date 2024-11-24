import { render } from '@testing-library/react-native';

import ListScreen from '@/app/(todo)/todo';
jest.mock('@react-native-async-storage/async-storage');

describe('<ListScreen />', () => {
  test('Text renders correctly on ListScreen', () => {
    const { getByText } = render(<ListScreen />);
    getByText('Add Todo');
  });
});
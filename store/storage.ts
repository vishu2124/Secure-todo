import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
  TODOS = 'TODOS',
}

class StorageUtil {
  async setItem<T>(key: StorageKeys, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving data for key "${key}":`, error);
    }
  }

  async getItem<T>(key: StorageKeys): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving data for key "${key}":`, error);
      return null;
    }
  }

  async removeItem(key: StorageKeys): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key "${key}":`, error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all data from storage:', error);
    }
  }
}

export default new StorageUtil();

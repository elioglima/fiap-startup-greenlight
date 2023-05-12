import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStoreData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getStoreData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

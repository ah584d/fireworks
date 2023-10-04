import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const hasUserName = (userName: string): boolean => storage.contains(userName);

export const storeUser = (key: string, data: unknown): void => {
  storage.set(key, JSON.stringify(data));
};

export const retrieveUserData = <T>(userName: string): T => {
  const jsonUser = storage.getString(userName);
  return JSON.parse(jsonUser ?? '');
};

export const deleteAccount = (userName: string): void => storage.delete(userName);

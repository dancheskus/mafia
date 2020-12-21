import { castArray } from 'lodash';

export const getFromLocalStorage = (item: string) => {
  try {
    return JSON.parse(localStorage[item]);
  } catch (e) {} // eslint-disable-line no-empty
};

export const addToLocalStorage = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach(key => {
    const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
    localStorage.setItem(key, value);
  });
};

export const removeFromLocalStorage = (keys: string | string[]) => {
  castArray(keys).forEach(key => localStorage.removeItem(key));
};

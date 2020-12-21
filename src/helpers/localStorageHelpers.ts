import { castArray } from 'lodash';

export const getFromLocalStorage = (item: string) => {
  try {
    return JSON.parse(localStorage[item]);
  } catch (e) {} // eslint-disable-line no-empty
};

export const addToLocalStorage = (obj: { [key: string]: any }) => {
  for (const [key, value] of Object.entries(obj)) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
};

export const removeFromLocalStorage = (keys: string | string[]) => {
  castArray(keys).forEach(key => localStorage.removeItem(key));
};

import { addToLocalStorage, getFromLocalStorage } from 'helpers/localStorageHelpers';

import { gameInitialState } from './reducers/gameReducer';

const compareKeys = (a: any, b: any) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

export const loadState = () => {
  const state = getFromLocalStorage('state');
  // Если добавлен новый элемент в gameState, то состояние сбрасывается, а не берется из localStorage
  if (!state || !compareKeys(gameInitialState, state.game)) return localStorage.clear();
  return state;
};

export const saveState = (state: any) => addToLocalStorage({ state });

import getFromLocalStorage from 'helpers/getFromLocalStorage';

import { initialState } from './reducers/gameReducer';

const compareKeys = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

export const loadState = () => {
  const state = getFromLocalStorage('state');
  // Если добавлен новый элемент в gameState, то состояние сбрасывается, а не берется из localStorage
  if (!state || !compareKeys(initialState, state.game)) return localStorage.clear();
  return state;
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

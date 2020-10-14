import { initialState } from './reducers/gameReducer';

const compareKeys = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.state;
    if (serializedState === null) {
      return undefined;
    }

    // Если добавлен новый элемент в gameState, то состояние сбрасывается, а не берется из localStorage
    if (!compareKeys(initialState, JSON.parse(serializedState).game)) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

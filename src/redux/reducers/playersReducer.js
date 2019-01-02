/* eslint-disable */
import produce from 'immer';

// const initialState = [
//   { role: 'МИРНЫЙ', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МИРНЫЙ', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МИРНЫЙ', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МИРНЫЙ', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МИРНЫЙ', isAlive: true, fouls: { amount: 0, muted: false } },
//   { role: 'МИРНЫЙ', isAlive: true, fouls: { amount: 0, muted: false } },
//   { role: 'ШЕРИФ', isAlive: true, fouls: { amount: 0, muted: false } },
//   { role: 'ДОН', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МАФИЯ', isAlive: false, fouls: { amount: 0, muted: false } },
//   { role: 'МАФИЯ', isAlive: false, fouls: { amount: 0, muted: false } },
// ];

export default (
  state = Array(10).fill({ role: 'МИРНЫЙ', isAlive: true, fouls: { amount: 0, muted: false } }),
  // state = initialState,
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD_ROLE':
        draft[action.payload.playerNumber].role = action.payload.role;
        return;
      case 'KILL_PLAYER':
        draft[action.playerNumber].isAlive = false;
        return;
      case 'ADD_FOUL': {
        const playerFouls = draft[action.playerNumber].fouls;
        playerFouls.amount === 2 && (playerFouls.muted = true);
        playerFouls.amount === 3 && (draft[action.playerNumber].isAlive = false);
        playerFouls.amount < 4 && playerFouls.amount++;
        return;
      }
      case 'REMOVE_FOUL': {
        const playerFouls = draft[action.playerNumber].fouls;
        playerFouls.amount < 4 && playerFouls.amount > 0 && playerFouls.amount-- && (playerFouls.muted = false);
        return;
      }
      case 'UNMUTE_PLAYER': {
        draft[action.playerNumber].fouls.muted = false;
        return;
      }
    }
  });

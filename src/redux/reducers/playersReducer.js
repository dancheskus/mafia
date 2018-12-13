/* eslint-disable */

import produce from 'immer';

export default (state = Array(10).fill({ role: '', isAlive: true, fouls: { amount: 0, muted: false } }), action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD_ROLE':
        draft[action.payload.playerNumber - 1].role = action.payload.role;
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
        playerFouls.amount < 4 && playerFouls.amount-- && (playerFouls.muted = false);
        return;
      }
    }
  });

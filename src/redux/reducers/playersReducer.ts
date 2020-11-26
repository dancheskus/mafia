/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import produce from 'immer';

import ROLE from 'common/playerEnums';

import { TPlayersState, TPlayersAction } from './types';

const initialState: TPlayersState = Array(10).fill({
  role: ROLE.MIRNIJ,
  isAlive: true,
  fouls: { amount: 0, muted: false },
});

export default (state = initialState, action: TPlayersAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD_ROLE':
        draft[action.payload.playerNumber].role = action.payload.role;
        return;

      case 'KILL_PLAYER':
        draft[action.playerNumber].isAlive = false;
        return;

      case 'RETURN_PLAYER_TO_GAME':
        draft[action.playerNumber].isAlive = true;
        draft[action.playerNumber].fouls.amount = 3;
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

      case 'RESET_PLAYERS_REDUCER':
        return initialState;
    }
  });

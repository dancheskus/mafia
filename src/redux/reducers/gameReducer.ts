/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { merge } from 'lodash';

import PHASE from 'common/phaseEnums';

import { TGameState, TCombinedReducers } from './types';

export const gameInitialState: TGameState = {
  opensTable: 0,
  activePlayer: 0,
  gameState: { phase: PHASE.SEATALLOCATOR, dayNumber: 0 },
  // SeatAllocator, RoleDealing, ZeroNight, Day, Night, Voting, EndOfGame
  lightMode: false,
  selectedNumbers: [],
  numbersPanelClickable: false,
  popupOpened: true,
  skipVoting: false,
  playerAddedToVotingList: [],
  killedAtNightPlayer: null,
  popupMinimized: false,
};

interface IAction {
  type: string;
  playerNumber: number;
  payload: { phase: PHASE; dayNumber: number };
}

export default (state = gameInitialState, action: IAction, root: TCombinedReducers) =>
  produce(state, draft => {
    switch (action.type) {
      case 'CHANGE_ACTIVE_PLAYER':
        draft.activePlayer = action.playerNumber;
        return;

      case 'CHANGE_GAME_STATE':
        draft.gameState = {
          phase: action.payload.phase,
          dayNumber: action.payload.dayNumber || state.gameState.dayNumber,
        };

        if (action.payload.phase === PHASE.DAY) draft.playerAddedToVotingList = [];

        if (action.payload.phase === PHASE.DAY && draft.gameState.dayNumber > 1) {
          const goToNextAlivePlayer = (i = state.opensTable + 1) => {
            root.players[i % 10].isAlive
              ? ((draft.activePlayer = i % 10), (draft.opensTable = i % 10))
              : goToNextAlivePlayer(i + 1);
          };

          goToNextAlivePlayer();
        }
        return;

      case 'LIGHT_MODE_ON':
        draft.lightMode = true;
        return;

      case 'LIGHT_MODE_OFF':
        draft.lightMode = false;
        return;

      case 'ADD_TO_SELECTED_NUMBERS':
        draft.selectedNumbers.push(action.playerNumber);
        draft.playerAddedToVotingList = [draft.activePlayer, action.playerNumber];
        return;

      case 'REPLACE_SELECTED_NUMBERS_WITH':
        draft.selectedNumbers = [action.playerNumber];
        return;

      case 'REMOVE_LAST_SELECTED_NUMBER':
        draft.playerAddedToVotingList = [];
        draft.selectedNumbers.pop();
        return;

      case 'CLEAR_SELECTED_NUMBERS':
        draft.selectedNumbers = [];
        return;

      case 'NUMBERS_PANEL_NOT_CLICKABLE':
        draft.numbersPanelClickable = false;
        return;

      case 'NUMBERS_PANEL_CLICKABLE':
        draft.numbersPanelClickable = true;
        return;

      case 'CLOSE_POPUP':
        draft.popupOpened = false;
        return;

      case 'OPEN_POPUP':
        draft.popupOpened = true;
        return;

      case 'MINIMIZE_MAXIMAIZE_POPUP':
        draft.popupMinimized = !draft.popupMinimized;
        return;

      case 'SKIP_VOTING_ENABLE':
        draft.skipVoting = true;
        return;

      case 'SKIP_VOTING_DISABLE':
        draft.skipVoting = false;
        return;

      case 'ADD_KILLED_AT_NIGHT_PLAYER':
        draft.killedAtNightPlayer = action.playerNumber;
        return;

      case 'REMOVE_KILLED_AT_NIGHT_PLAYER':
        draft.killedAtNightPlayer = null;
        return;

      case 'RESET_GAME_REDUCER':
        return merge({}, gameInitialState, {
          gameState: { phase: root.settings.seatAllocator ? PHASE.SEATALLOCATOR : PHASE.ROLEDEALING },
        });
    }
  });

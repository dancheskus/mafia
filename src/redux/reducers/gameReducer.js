/* eslint-disable */

import produce from 'immer';

const initialState = {
  opensTable: 0,
  activePlayer: 0,
  gameState: { phase: 'SeatAllocator', dayNumber: 0 },
  // SeatAllocator, RoleDealing, ZeroNight, Day, Night, Voting, EndOfGame
  lightMode: false,
  selectedNumbers: [],
  numbersPanelClickable: false,
  popupOpened: true,
  skipVoting: 0,
  playerAddedToVotingList: [],
};

export default (state = initialState, action, root) =>
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

        if (action.payload.phase === 'Day') draft.playerAddedToVotingList = [];

        if (action.payload.phase === 'Day' && draft.gameState.dayNumber > 1) {
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

      case 'SKIP_VOTING_INC':
        draft.skipVoting++;
        return;

      case 'SKIP_VOTING_DEC':
        draft.skipVoting > 0 && draft.skipVoting--;
        return;

      case 'RESET_GAME_REDUCER':
        return { ...initialState, gameState: { phase: root.settings.seatAllocator ? 'SeatAllocator' : 'RoleDealing' } };
    }
  });

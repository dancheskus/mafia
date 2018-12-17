/* eslint-disable */

import produce from 'immer';

export default (
  state = {
    opensTable: 1,
    activePlayer: 1,
    gameState: { phase: 'Day', dayNumber: 0 }, // startScreen, SeatAllocator, RoleDealing, ZeroNight, Day, Night, Voting, CarCrash, EndOfGame
    lightMode: false,
    selectedNumbers: [],
    numbersPanelClickable: false,
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'OPENS_TABLE':
        draft.opensTable = action.playerNumber;
        return;

      case 'CHANGE_ACTIVE_PLAYER':
        draft.activePlayer = action.playerNumber;
        return;

      case 'CHANGE_GAME_STATE':
        draft.gameState = {
          phase: action.payload.phase,
          dayNumber: action.payload.dayNumber || state.gameState.dayNumber,
        };
        return;

      case 'LIGHT_MODE_ON':
        draft.lightMode = true;
        return;

      case 'LIGHT_MODE_OFF':
        draft.lightMode = false;
        return;

      case 'ADD_TO_SELECTED_NUMBERS':
        draft.selectedNumbers.push(action.playerNumber);
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
    }
  });

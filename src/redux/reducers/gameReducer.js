/* eslint-disable */

import produce from 'immer';

export default (
  state = {
    thisRoundFirstPlayer: 0,
    activePlayer: 0,
    gameState: { phase: 'numberDealing', dayNumber: 0 },
    votingList: [],
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'THIS_ROUND_FIRST_PLAYER':
        draft.thisRoundFirstPlayer = action.playerNumber;
      case 'CHANGE_ACTIVE_PLAYER':
        draft.activePlayer = action.playerNumber;
      case 'CHANGE_GAME_STATE':
        draft.gameState = {
          phase: action.payload.phase,
          dayNumber: action.payload.dayNumber || state.gameState.dayNumber,
        };
      case 'ADD_TO_VOTING_LIST':
        draft.votingList.push(action.playerNumber);
      case 'CLEAR_VOTING_LIST':
        draft.votingList = [];
    }
  });

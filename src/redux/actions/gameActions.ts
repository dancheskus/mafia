import PHASE from 'common/phaseEnums';

export const changeActivePlayer = (playerNumber: number) => ({ type: 'CHANGE_ACTIVE_PLAYER', playerNumber });
export const changeGameState = (payload: { phase: PHASE; dayNumber?: number }) => ({
  type: 'CHANGE_GAME_STATE',
  payload,
});
export const addToSelectedNumbers = (playerNumber: number) => ({ type: 'ADD_TO_SELECTED_NUMBERS', playerNumber });
export const replaceSelectedNumbersWith = (playerNumber: number) => ({
  type: 'REPLACE_SELECTED_NUMBERS_WITH',
  playerNumber,
});
export const removeLastSelectedNumber = () => ({ type: 'REMOVE_LAST_SELECTED_NUMBER' });
export const clearSelectedNumbers = () => ({ type: 'CLEAR_SELECTED_NUMBERS' });
export const lightModeOn = () => ({ type: 'LIGHT_MODE_ON' });
export const lightModeOff = () => ({ type: 'LIGHT_MODE_OFF' });
export const numbersPanelNotClickable = () => ({ type: 'NUMBERS_PANEL_NOT_CLICKABLE' });
export const numbersPanelClickable = () => ({ type: 'NUMBERS_PANEL_CLICKABLE' });
export const closePopup = () => ({ type: 'CLOSE_POPUP' });
export const openPopup = () => ({ type: 'OPEN_POPUP' });
export const minimizeMaximaizePopup = () => ({ type: 'MINIMIZE_MAXIMAIZE_POPUP' });
export const skipVotingEnable = () => ({ type: 'SKIP_VOTING_ENABLE' });
export const skipVotingDisable = () => ({ type: 'SKIP_VOTING_DISABLE' });
export const resetGameReducer = () => ({ type: 'RESET_GAME_REDUCER' });
export const addKilledAtNightPlayer = (playerNumber: number) => ({ type: 'ADD_KILLED_AT_NIGHT_PLAYER', playerNumber });
export const removeKilledAtNightPlayer = () => ({ type: 'REMOVE_KILLED_AT_NIGHT_PLAYER' });

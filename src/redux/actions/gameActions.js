export const opensTable = playerNumber => ({ type: 'OPENS_TABLE', playerNumber });
export const changeActivePlayer = playerNumber => ({ type: 'CHANGE_ACTIVE_PLAYER', playerNumber });
export const changeGameState = payload => ({ type: 'CHANGE_GAME_STATE', payload });
export const addToSelectedNumbers = playerNumber => ({ type: 'ADD_TO_SELECTED_NUMBERS', playerNumber });
export const clearSelectedNumbers = () => ({ type: 'CLEAR_SELECTED_NUMBERS' });
export const lightModeOn = () => ({ type: 'LIGHT_MODE_ON' });
export const lightModeOff = () => ({ type: 'LIGHT_MODE_OFF' });
export const numbersPanelNotClickable = () => ({ type: 'NUMBERS_PANEL_NOT_CLICKABLE' });
export const numbersPanelClickable = () => ({ type: 'NUMBERS_PANEL_CLICKABLE' });

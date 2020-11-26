import ROLE from 'common/playerEnums';

export const addRole = (payload: { playerNumber: number; role: ROLE }) => ({ type: 'ADD_ROLE', payload });
export const killPlayer = (playerNumber: number) => ({ type: 'KILL_PLAYER', playerNumber });
export const returnPlayerToGame = (playerNumber: number) => ({ type: 'RETURN_PLAYER_TO_GAME', playerNumber });
export const addFoul = (playerNumber: number) => ({ type: 'ADD_FOUL', playerNumber });
export const removeFoul = (playerNumber: number) => ({ type: 'REMOVE_FOUL', playerNumber });
export const unmutePlayer = (playerNumber: number) => ({ type: 'UNMUTE_PLAYER', playerNumber });
export const resetPlayersReducer = () => ({ type: 'RESET_PLAYERS_REDUCER' });

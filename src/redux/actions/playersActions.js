export const addRole = payload => ({ type: 'ADD_ROLE', payload });
export const killPlayer = playerNumber => ({ type: 'KILL_PLAYER', playerNumber });
export const addFoul = playerNumber => ({ type: 'ADD_FOUL', playerNumber });
export const removeFoul = playerNumber => ({ type: 'REMOVE_FOUL', playerNumber });
export const unmutePlayer = playerNumber => ({ type: 'UNMUTE_PLAYER', playerNumber });

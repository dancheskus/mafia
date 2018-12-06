export const addRole = payload => ({ type: 'ADD_ROLE', payload });
export const killPlayer = playerNumber => ({ type: 'KILL_PLAYER', playerNumber });
export const addFoul = payload => ({ type: 'ADD_FOUL', payload });
export const removeFoul = playerNumber => ({ type: 'REMOVE_FOUL', playerNumber });

export const thisRoundFirstPlayer = playerNumber => ({ type: 'THIS_ROUND_FIRST_PLAYER', playerNumber });
export const changeActivePlayer = playerNumber => ({ type: 'CHANGE_ACTIVE_PLAYER', playerNumber });
export const changeGameState = payload => ({ type: 'CHANGE_GAME_STATE', payload });
export const addToSelectedNumbers = playerNumber => ({ type: 'ADD_TO_SELECTED_NUMBERS', playerNumber });
export const clearSelectedNumbers = () => ({ type: 'CLEAR_SELECTED_NUMBERS' });

// import { thisRoundFirstPlayer, changeActivePlayer, changeGameState, addToSelectedNumbers, clearSelectedNumbers } from '../redux/actions/gameActions';

// const mapStateToProps = state => ({
//   game: state.game,
// });

// const mapDispatchToProps = dispatch => ({
//   thisRoundFirstPlayer: playerNumber => dispatch(changeGameState(playerNumber)),
//   changeActivePlayer: playerNumber => dispatch(changeGameState(playerNumber)),
//   changeGameState: payload => dispatch(changeGameState(payload)),
//   addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
//   clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
// });

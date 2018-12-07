export const addRole = payload => ({ type: 'ADD_ROLE', payload });
export const killPlayer = playerNumber => ({ type: 'KILL_PLAYER', playerNumber });
export const addFoul = playerNumber => ({ type: 'ADD_FOUL', playerNumber });
export const removeFoul = playerNumber => ({ type: 'REMOVE_FOUL', playerNumber });

// import { addRole, killPlayer, addFoul, removeFoul } from '../redux/actions/playersActions';

// const mapStateToProps = state => ({
//   players: state.players,
// });

// const mapDispatchToProps = dispatch => ({
//   addRole: payload => dispatch(addRole(payload)),
//   killPlayer: playerNumber => dispatch(killPlayer(playerNumber)),
//   addFoul: playerNumber => dispatch(addFoul(playerNumber)),
//   removeFoul: playerNumber => dispatch(removeFoul(playerNumber)),
// });

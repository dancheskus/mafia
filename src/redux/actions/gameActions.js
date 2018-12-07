export const thisRoundFirstPlayer = playerNumber => ({ type: 'THIS_ROUND_FIRST_PLAYER', playerNumber });
export const changeActivePlayer = playerNumber => ({ type: 'CHANGE_ACTIVE_PLAYER', playerNumber });
export const changeGameState = payload => ({ type: 'CHANGE_GAME_STATE', payload });
export const addToVotingList = playerNumber => ({ type: 'ADD_TO_VOTING_LIST', playerNumber });
export const clearVotingList = () => ({ type: 'CLEAR_VOTING_LIST' });

// import { thisRoundFirstPlayer, changeActivePlayer, changeGameState, addToVotingList, clearVotingList } from '../redux/actions/gameActions';

// const mapStateToProps = state => ({
//   game: state.game,
// });

// const mapDispatchToProps = dispatch => ({
//   thisRoundFirstPlayer: playerNumber => dispatch(changeGameState(playerNumber)),
//   changeActivePlayer: playerNumber => dispatch(changeGameState(playerNumber)),
//   changeGameState: payload => dispatch(changeGameState(payload)),
//   addToVotingList: playerNumber => dispatch(changeGameState(playerNumber)),
//   clearVotingList: () => dispatch(changeGameState()),
// });

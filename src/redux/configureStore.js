import { createStore } from 'redux';

import gameReducer from './reducers/gameReducer';
import playersReducer from './reducers/playersReducer';
import { loadState } from 'redux/localStorage';

export default () =>
  createStore(
    (state = {}, action) => ({
      game: gameReducer(state.game, action, state),
      players: playersReducer(state.players, action, state),
    }),
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

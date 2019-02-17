import { createStore } from 'redux';

import gameReducer from './reducers/gameReducer';
import playersReducer from './reducers/playersReducer';
import settingsReducer from './reducers/settingsReducer';
import { loadState } from 'redux/localStorage';

export default () =>
  createStore(
    (state = {}, action) => ({
      game: gameReducer(state.game, action, state),
      players: playersReducer(state.players, action, state),
      settings: settingsReducer(state.settings, action, state),
    }),
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

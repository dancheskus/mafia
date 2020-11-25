import { createStore } from 'redux';

import { loadState } from 'redux/localStorage';

import gameReducer from './reducers/gameReducer';
import playersReducer from './reducers/playersReducer';
import settingsReducer from './reducers/settingsReducer';

export default () =>
  createStore(
    (state: any = {}, action: any) => ({
      game: gameReducer(state.game, action, state),
      players: playersReducer(state.players, action),
      settings: settingsReducer(state.settings, action),
    }),
    loadState(),
    // @ts-expect-error
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

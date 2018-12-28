import { createStore, combineReducers } from 'redux';

import gameReducer from './reducers/gameReducer';
import playersReducer from './reducers/playersReducer';

export default () =>
  createStore(
    combineReducers({ game: gameReducer, players: playersReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

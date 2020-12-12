import { createStore as reduxCreateStore } from 'redux';

import { loadState } from 'redux/localStorage';

import gameReducer from './reducers/gameReducer';
import playersReducer from './reducers/playersReducer';
import settingsReducer from './reducers/settingsReducer';
import { TCombinedReducers } from './reducers/types';

export const createStoreInstance = (initialState: TCombinedReducers = loadState()) =>
  reduxCreateStore(
    (state: any = {}, action: any) => ({
      game: gameReducer(state.game, action, state),
      players: playersReducer(state.players, action),
      settings: settingsReducer(state.settings, action),
    }),
    initialState,

    // @ts-expect-error
    window.__REDUX_DEVTOOLS_EXTENSION__?.(),
  );

export const store = createStoreInstance();

export type TState = ReturnType<typeof store['getState']>;

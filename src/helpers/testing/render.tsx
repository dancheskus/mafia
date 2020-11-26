import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import gameReducer from 'redux/reducers/gameReducer';
import playersReducer from 'redux/reducers/playersReducer';
import settingsReducer from 'redux/reducers/settingsReducer';

export default function render(ui, options = {}) {
  // @ts-ignore
  const { initialGameState, initialPlayersState, initialSettingsState, ...rtlOptions } = options;

  const store = createStore((state: any = {}, action: any) => {
    const game = { ...gameReducer(state.game, action, state), ...initialGameState };
    const players = playersReducer(state.players, action);
    const settings = { ...settingsReducer(state.settings, action), ...initialSettingsState };

    return { game, players: initialPlayersState || players, settings };
  });

  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }), store };
}

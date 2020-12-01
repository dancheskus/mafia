import React, { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import createStore from 'redux/reduxStore';
import { gameInitialState } from 'redux/reducers/gameReducer';
import { settingsInitialState } from 'redux/reducers/settingsReducer';

const render = (ui: ReactElement, options: any = {}) => {
  const { initialPlayersState, initialGameState, initialSettingsState, ...rtlOptions } = options;

  const store = createStore({
    players: initialPlayersState,
    game: { ...gameInitialState, ...initialGameState },
    settings: { ...settingsInitialState, ...initialSettingsState },
  });

  // eslint-disable-next-line react/prop-types
  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
    getState: store.getState,
    dispatch: store.dispatch,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };

import React, { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';

import createStore, { store } from 'redux/reduxStore';
import { gameInitialState } from 'redux/reducers/gameReducer';
import { settingsInitialState } from 'redux/reducers/settingsReducer';
import { playersInitialState } from 'redux/reducers/playersReducer';
import { TGameState, TPlayer, TSettingsState } from 'redux/reducers/types';

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
interface IChangePlayersState extends DeepPartial<TPlayer> {
  playerNumber?: number;
}

export interface IOptions {
  changePlayersState?: IChangePlayersState[];
  initialPlayersState?: DeepPartial<TPlayer[]>;
  initialGameState?: Partial<TGameState>;
  initialSettingsState?: Partial<TSettingsState>;
}

export const getRenderer = <T extends (...args: any[]) => JSX.Element>(Component: T, props: Parameters<T>[0]) => (
  overrideProps?: Partial<Parameters<T>[0]>,
) => {
  const RenderComponent = ({ overrideProps }: { overrideProps: Partial<Parameters<T>>[0] }) => (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} {...overrideProps} />
    </Provider>
  );

  const helpers = rtlRender(<RenderComponent overrideProps={overrideProps} />);

  return {
    ...helpers,
    rerender: (rerenderOverrideProps: Partial<Parameters<T>[0]>) =>
      helpers.rerender(<RenderComponent overrideProps={rerenderOverrideProps} />),
  };
};

const render = (ui: ReactElement, options: Partial<IOptions> = {}) => {
  const { changePlayersState, initialPlayersState, initialGameState, initialSettingsState, ...rtlOptions } = options;

  let playerOverwrite: TPlayer[];

  if (changePlayersState) {
    playerOverwrite = JSON.parse(JSON.stringify(playersInitialState));
    changePlayersState.forEach((el, i) => {
      const { playerNumber = i, fouls, ...rest } = el;

      playerOverwrite[playerNumber] = {
        ...playerOverwrite[playerNumber],
        ...{ ...rest, fouls: { ...playerOverwrite[playerNumber].fouls, ...fouls } },
      };
    });
  }

  const store = createStore({
    players: playerOverwrite! || initialPlayersState,
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
export { render, user };

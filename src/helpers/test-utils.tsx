/* eslint-disable react/prop-types */
import React, { FC, ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import gameReducer from 'redux/reducers/gameReducer';
import playersReducer from 'redux/reducers/playersReducer';
import settingsReducer from 'redux/reducers/settingsReducer';

// @ts-ignore
const createReducer = ({ initialGameState, initialPlayersState, initialSettingsState }) => {
  return (state: any = {}, action: any) => {
    const game = { ...gameReducer(state.game, action, state), ...initialGameState };
    const players = playersReducer(state.players, action);
    const settings = { ...settingsReducer(state.settings, action), ...initialSettingsState };

    return { game, players: initialPlayersState || players, settings };
  };
};

const render = (ui: ReactElement, options = {}) => {
  // @ts-ignore
  const { initialGameState, initialPlayersState, initialSettingsState, ...rtlOptions } = options;

  const store = createStore(createReducer({ initialGameState, initialPlayersState, initialSettingsState }));

  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }), store };
};

// export default function render(ui, options = {}) {
//   const { initialGameState, initialPlayersState, initialSettingsState, ...rtlOptions } = options;
//   const reducer = (state: any = {}, action: any) => {
//     const game = { ...gameReducer(state.game, action, state), ...initialGameState };
//     const players = playersReducer(state.players, action);
//     const settings = { ...settingsReducer(state.settings, action), ...initialSettingsState };

//     return { game, players: initialPlayersState || players, settings };
//   };
//   const store = createStore(reducer);

//   const obj = {
//     ...rtlRender(<Provider store={store}>{ui}</Provider>),
//     store,
//   };
//   obj.rerender = (el, nextState) => {
//     if (nextState) {
//       store.replaceReducer(() => nextState);
//       store.dispatch({ type: '__TEST_ACTION_REPLACE_STATE__' });
//       store.replaceReducer(reducer);
//     }
//     return render(el, { store }, obj.rerender);
//   };
//   return obj;
// }

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };

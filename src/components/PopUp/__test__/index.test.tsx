import React from 'react';

import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import { changeGameState, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';
import mockStore, { MockStore } from 'test/MockStore';
import { killPlayer } from 'redux/actions/playersActions';
import { gameSelector, playersSelector } from 'redux/selectors';
import { TPlayersState } from 'redux/reducers/types';

import PopUp from '..';

const PopupChild = () => <div>1</div>;

let store: MockStore;

beforeEach(() => {
  store = mockStore();
});

const render = getRenderer(PopUp, { PopupChild, opened: true });

// const selectPlayers = (store:)

// it('should have overriden store value', () => {
//   // store.dispatch(killPlayer(4));

//   // expect(playersSelector(store.state)[0].isAlive).toBe(true);
//   // expect(playersSelector(store.state)[1].isAlive).toBe(false);
//   // expect(playersSelector(store.state)[3].isAlive).toBe(true);
//   // expect(playersSelector(store.state)[4].isAlive).toBe(false);
//   // expect(playersSelector(store.state)[5].isAlive).toBe(true);

//   expect(store.dispatchSpy).not.toHaveBeenCalled();
// });

// it('should have default store value', () => {
//   render({ opened: false });

//   expect(playersSelector(store.state)[0].isAlive).toBe(true);
//   expect(playersSelector(store.state)[1].isAlive).toBe(false);
//   expect(playersSelector(store.state)[4].isAlive).toBe(true);
// });

// describe('<PopUp />', () => {
//   it('should render PopupChild if popup is opened', () => {
//     const { rerender } = render(<PopUp PopupChild={PopupChild} opened />);

//     const childNode = screen.getByText('1');

//     expect(childNode).toBeVisible();

//     rerender(<PopUp PopupChild={PopupChild} opened={false} />);
//     expect(childNode).not.toBeVisible();
//   });

//   it('should render minimize button if phase is not SEATALLOCATOR, ROLEDEALING or ENDOFGAME', () => {
//     const { dispatch } = render(<PopUp PopupChild={PopupChild} opened />);
//     const buttonId = 'minimizeButton';

//     [PHASE.SEATALLOCATOR, PHASE.ROLEDEALING, PHASE.ENDOFGAME].forEach(phase => {
//       dispatch(changeGameState({ phase }));
//       expect(screen.queryByTestId(buttonId)).not.toBeInTheDocument();
//     });

//     [(PHASE.ZERONIGHT, PHASE.DAY, PHASE.NIGHT, PHASE.VOTING)].forEach(phase => {
//       dispatch(changeGameState({ phase }));
//       expect(screen.getByTestId(buttonId)).toBeInTheDocument();
//     });
//   });

it('should minimize and maximize popup', () => {
  store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 2 }));

  render({ opened: false });

  const minimizeIcon = screen.getByTestId(/minimizeIcon/i);
  user.click(minimizeIcon);

  // expect(gameSelector(store.state).popupMinimized).toBe(true);

  expect(store.dispatchSpy).toHaveBeenNthCalledWith(1, minimizeMaximaizePopup());

  const maximizeIcon = screen.getByTestId(/maximizeIcon/i);
  user.click(maximizeIcon);
  // expect(store.state.game.popupMinimized).toBe(false);

  expect(store.dispatchSpy).toHaveBeenNthCalledWith(2, minimizeMaximaizePopup());
});
// });

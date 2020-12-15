import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import createTestStore, { TestStore } from 'test/createTestStore';
import {
  addKilledAtNightPlayer,
  changeActivePlayer,
  changeGameState,
  closePopup,
  openPopup,
  removeKilledAtNightPlayer,
} from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';

import Day from '../Day';

let store: TestStore;

beforeEach(() => {
  store = createTestStore();
});

const playerNumber = 4;

const render = getRenderer(Day);
describe('PopUp - <Day />', () => {
  it('should show "НЕСОСТРЕЛ" if no player were killed after night', () => {
    render();

    expect(screen.getByText(/несострел/i)).toBeInTheDocument();
  });

  it('should show killed player number after night', () => {
    store.dispatch(addKilledAtNightPlayer(playerNumber));
    render();

    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('should dispatch "openPopup" and "removeKilledAtNightPlayer" on unmount', () => {
    store.dispatch(addKilledAtNightPlayer(playerNumber));
    store.dispatch(closePopup());
    const { unmount } = render();

    unmount();

    expect(store.dispatchSpy).toHaveBeenCalledWith(openPopup());
    expect(store.dispatchSpy).toHaveBeenCalledWith(removeKilledAtNightPlayer());
  });

  it('should close popup and dispatch killPlayer if playerShouldBeKilled', () => {
    store.dispatch(addKilledAtNightPlayer(playerNumber));
    render();

    expect(store.state.players[playerNumber].isAlive).toBe(true);

    user.click(screen.getByText(/закрыть/i));
    expect(store.dispatchSpy).toHaveBeenCalledWith(closePopup());
    expect(store.dispatchSpy).toHaveBeenCalledWith(killPlayer(playerNumber));
  });

  it('should increase activePlayer and opensTable by 1 (if killedPlayer = activePlayer)', () => {
    store.dispatch(changeGameState({ dayNumber: 2, phase: PHASE.DAY }));
    store.dispatch(changeActivePlayer(playerNumber));
    store.dispatch(addKilledAtNightPlayer(playerNumber));
    store.state.game.opensTable = playerNumber;

    render();

    expect(store.state.game.opensTable).toBe(playerNumber);
    expect(store.state.game.activePlayer).toBe(playerNumber);

    user.click(screen.getByText(/закрыть/i));
    expect(store.state.game.opensTable).toBe(playerNumber + 1);
    expect(store.state.game.activePlayer).toBe(playerNumber + 1);
  });
});

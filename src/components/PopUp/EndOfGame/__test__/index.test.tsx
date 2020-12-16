import { clickButton, getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import { addToSelectedNumbers, minimizeMaximaizePopup, resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import TestStore from 'test/TestStore';

import EndOfGame from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(EndOfGame);

describe('<EndOfGame />', () => {
  it.each`
    popupMinimized
    ${true}
    ${false}
  `('should call "minimizeMaximaizePopup" if popup is minimized', ({ popupMinimized }) => {
    store.state.game.popupMinimized = popupMinimized;
    render();

    popupMinimized
      ? expect(store.dispatchSpy).toHaveBeenCalledWith(minimizeMaximaizePopup())
      : expect(store.dispatchSpy).not.toHaveBeenCalledWith(minimizeMaximaizePopup());
  });

  it('should write "Победа черных" if black team won', () => {
    store.setEqualPlayersInTeam();
    render();

    expect(screen.getByText(/победа черных/i)).toBeInTheDocument();
  });

  it('should write "Победа красных" if red team won', () => {
    render();

    expect(screen.getByText(/победа красных/i)).toBeInTheDocument();
  });

  it('should call reset reducers if new game clicked', () => {
    render();

    clickButton(/новая игра/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(resetGameReducer());
    expect(store.dispatchSpy).toHaveBeenCalledWith(resetPlayersReducer());
  });

  it('should not show "Ночью был убит" message if no selectedNumbers', () => {
    render();

    expect(screen.queryByText(/Ночью был убит/i)).not.toBeInTheDocument();
  });

  it('should show "Ночью был убит + playerNumber" message if selectedNumbers has first value', () => {
    store.dispatch(addToSelectedNumbers(4));
    render();

    expect(screen.getByText(/Ночью был убит 5/i)).toBeInTheDocument();
  });
});

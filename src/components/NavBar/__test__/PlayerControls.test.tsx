import PHASE from 'common/phaseEnums';
import repeat from 'helpers/repeat';
import { clickByTestId, getRenderer, screen, waitFor } from 'helpers/testingHelpers/test-utils';
import { changeActivePlayer, changeGameState, skipVotingDisable } from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import PlayerControls from '../PlayerControls';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.dispatch(changeGameState({ phase: PHASE.DAY }));
});

const render = getRenderer(PlayerControls);

const clickNextUntillLastPlayer = () => repeat(() => clickByTestId(/nextPlayerButton/i), 9);

describe('<PlayerControls />', () => {
  it('should render controls button. Previous player button should be disabled.', () => {
    render();

    expect(screen.getByTestId(/previeousPlayerButton/i)).toBeDisabled();
    expect(screen.getByTestId(/nextPlayerButton/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/goToVotingButton/i)).not.toBeInTheDocument();
  });

  it('should show "goToVotingButton" instead of "nextPlayerButton" on last player.', () => {
    render();

    clickNextUntillLastPlayer();

    expect(screen.queryByTestId(/nextPlayerButton/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/goToVotingButton/i)).toBeInTheDocument();
  });

  it('should call skipVotingDisble and change phase to Night if no selectedNubers', () => {
    render();

    clickNextUntillLastPlayer();

    clickByTestId(/goToVotingButton/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(skipVotingDisable());
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.NIGHT }));
  });

  it('should not call skipVotingDisble and change phase to Voting if selectedNubers.length', () => {
    store.setSelectedNumbers([4, 9]);
    render();

    clickNextUntillLastPlayer();

    clickByTestId(/goToVotingButton/i);

    expect(store.dispatchSpy).not.toHaveBeenCalledWith(skipVotingDisable());
    expect(store.dispatchSpy).not.toHaveBeenCalledWith(changeGameState({ phase: PHASE.NIGHT }));
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.VOTING }));
  });

  it('should enable "previeousPlayerButton" after "nextPlayerButton" clicked, and disable it after player kill', async () => {
    render();

    clickByTestId(/nextPlayerButton/i);

    expect(screen.getByTestId(/previeousPlayerButton/i)).toBeEnabled();

    store.killPlayers(5);
    await waitFor(() => expect(screen.getByTestId(/previeousPlayerButton/i)).toBeDisabled());
  });

  it('should disable "previeousPlayerButton" after it is clicked', () => {
    render();

    clickByTestId(/nextPlayerButton/i);

    expect(screen.getByTestId(/previeousPlayerButton/i)).toBeEnabled();

    clickByTestId(/previeousPlayerButton/i);
    expect(screen.getByTestId(/previeousPlayerButton/i)).toBeDisabled();
  });

  it('should skip dead players when going to the next alive player', () => {
    store.killPlayers([2, 5, 6, 7, 8, 9]);
    store.state.game.opensTable = 1;
    store.state.game.activePlayer = 1;
    render();

    clickByTestId(/nextPlayerButton/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeActivePlayer(3));

    clickByTestId(/nextPlayerButton/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeActivePlayer(4));

    clickByTestId(/nextPlayerButton/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeActivePlayer(0));
  });

  it.each`
    opensTable | nextPlayerNumber
    ${1}       | ${3}
    ${4}       | ${0}
  `('should skip dead players when going to the previeous alive player', ({ opensTable, nextPlayerNumber }) => {
    store.killPlayers([2, 5, 6, 7, 8, 9]);
    store.state.game.opensTable = opensTable;
    store.state.game.activePlayer = opensTable;
    render();

    clickByTestId(/nextPlayerButton/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeActivePlayer(nextPlayerNumber));

    clickByTestId(/previeousPlayerButton/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeActivePlayer(opensTable));
  });
});

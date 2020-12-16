import { clickByTestId, getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import ROLE from 'common/playerEnums';
import colors from 'style/colors';
import { mockSetIntervalOnce } from 'helpers/testingHelpers/mockTimers';
import { changeGameState } from 'redux/actions/gameActions';
import { addFoul, addRole, killPlayer } from 'redux/actions/playersActions';
import repeat from 'helpers/repeat';
import TestStore from 'test/TestStore';

import SingleCard from '../SingleCard';

const render = getRenderer(SingleCard, { order: 0, playerNumber: 0 });

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
  store.dispatch(addRole({ playerNumber: 1, role: ROLE.MAFIA }));
});

describe('<SingleCard />', () => {
  it('should not show foulContainer if player is dead', () => {
    store.dispatch(killPlayer(0));

    render();

    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).not.toBeVisible();
  });

  it('should show indicator in top left corner if player opens table', () => {
    const { rerender } = render({ playerNumber: 0 });

    const playerNumber = screen.getByTestId(/playerNumber/i);

    expect(playerNumber).toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });

    rerender({ playerNumber: 1 });

    expect(playerNumber).not.toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });
  });

  it('should kill player after 4th foul', () => {
    repeat(() => store.dispatch(addFoul(0)), 3);

    render();

    mockSetIntervalOnce();

    // Player number "0" should be alive
    expect(store.state.players[0].isAlive).toBe(true);

    // Killing player with 4th foul
    clickByTestId(/addFoul/i);

    // Foul container should be hidden
    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).not.toBeVisible();

    // Player number "0" should be killed
    expect(store.state.players[0].isAlive).toBe(false);

    expect(setInterval).toHaveBeenCalledTimes(3);
  });

  it('should not kill player if back button was clicked after 4th foul. And kill player after 4th foul is clicked again', () => {
    repeat(() => store.dispatch(addFoul(0)), 3);

    render();

    mockSetIntervalOnce();

    // Player number "0" should be alive
    expect(store.state.players[0].isAlive).toBe(true);

    // Killing player with 4th foul
    clickByTestId(/addFoul/i);

    // Returning player to life
    clickByTestId(/backButton/i);

    // Foul container should be visible
    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).toBeVisible();

    // Player number "0" should be killed
    expect(store.state.players[0].isAlive).toBe(true);

    expect(setInterval).toHaveBeenCalledTimes(3);

    // Killing again to validate killing function is still accessible
    clickByTestId(/addFoul/i);

    expect(setInterval).toHaveBeenCalledTimes(4);
  });

  it('should increase and decrease amount of fouls and change styles according to amount of fouls', () => {
    render();

    const removeFoul = screen.getByTestId(/removeFoul/i);
    const addFoul = screen.getByTestId(/addFoul/i);
    const playerNumber = screen.getByTestId(/playerNumber/i);

    // Checking that foul amount is not going negative
    user.click(removeFoul);
    expect(screen.queryByText(/!/)).not.toBeInTheDocument();

    expect(screen.queryByText(/!/)).not.toBeInTheDocument();
    expect(addFoul).toHaveStyleRule('background', colors.Day.addFoulBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addFoulBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addSecondFoulBackground);
    expect(playerNumber).toHaveStyleRule('background', colors.Day.playerCardBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!!!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addThirdFoulBackground);
    expect(playerNumber).toHaveStyleRule('background', colors.Day.warningPlayerCardBackground);

    user.dblClick(removeFoul);
    expect(addFoul).toHaveTextContent('!');
  });

  it('should mute player on 3d foul and unmute him if foul decreased', () => {
    const playerNumber = 3;
    render({ playerNumber });

    const addFoul = screen.getByTestId(/addFoul/i);
    const removeFoul = screen.getByTestId(/removeFoul/i);

    user.click(addFoul);
    user.click(addFoul);

    expect(store.state.players[playerNumber].fouls.muted).toBe(false);
    user.click(addFoul);
    expect(store.state.players[playerNumber].fouls.muted).toBe(true);

    user.click(removeFoul);
    expect(store.state.players[playerNumber].fouls.muted).toBe(false);
  });
});

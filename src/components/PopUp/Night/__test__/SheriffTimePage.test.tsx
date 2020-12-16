import PHASE from 'common/phaseEnums';
import { clickByText, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import { changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import TestStore from 'test/TestStore';

import SheriffTimePage from '../SheriffTimePage';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const playerToKill = undefined;
const setSheriffTime = jest.fn();

const render = getRenderer(SheriffTimePage, { setSheriffTime, playerToKill });

describe('<SheriffTimePage />', () => {
  it('should show correct sheriff playerNumber', () => {
    store.defaultTestRoles();

    render();

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it('should kill "playerToKill" after "День" is pressed if checkForEnd.status is true', () => {
    render({ playerToKill: 4 });

    clickByText(/день/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(killPlayer(4));
  });

  it('should go to day', () => {
    store.defaultTestRoles();
    render();

    clickByText(/день/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ dayNumber: 1, phase: PHASE.DAY }));
  });
});

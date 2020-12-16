import { clickButton, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import { disableTutorial, enableTutorial, switchMafiaTimer } from 'redux/actions/settingsActions';
import { changeGameState, closePopup } from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import ZeroNight from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.dispatch(disableTutorial());
  store.dispatch(changeGameState({ phase: PHASE.ZERONIGHT, dayNumber: 0 }));
});

const render = getRenderer(ZeroNight);

describe('<ZeroNight />', () => {
  it('should render "Договорка" screen. And should not if next button is clicked', () => {
    render();

    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
    clickButton(/далее/i);
    expect(screen.queryByText(/договорка/i)).not.toBeInTheDocument();
  });

  it('should not click on next button if tutorialEnabled = true', () => {
    store.dispatch(enableTutorial());
    render();

    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
    clickButton(/далее/i);
    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
  });

  it('should render timer if mafiaTimer enabled', () => {
    render();

    expect(screen.getByText(/1:00/i)).toBeInTheDocument();
    store.dispatch(switchMafiaTimer());
    expect(screen.queryByText(/1:00/i)).not.toBeInTheDocument();
  });

  it('should show correct Sheriff and Don player numbers', () => {
    store.defaultTestRoles();

    render();

    clickButton(/далее/i);

    expect(screen.getByTestId(/donPlayerNumber/i)).toHaveTextContent('3');
    expect(screen.getByTestId(/shariffPlayerNumber/i)).toHaveTextContent('4');
  });

  it('should closePopup and set phase to Day and dayNumber to 1', () => {
    render();

    clickButton(/далее/i);
    clickButton(/день/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(closePopup());
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ dayNumber: 1, phase: PHASE.DAY }));
  });
});

import PHASE from 'common/phaseEnums';
import { addPortal, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import { changeGameState } from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import NavBar from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.state.settings.appMusic = false;
});

addPortal();

const render = getRenderer(NavBar);

describe('<NavBar />', () => {
  it('should rendre correct game phase name and day number', () => {
    render();

    const expectTitle = (title: RegExp) => expect(screen.getByTestId(/phaseTitle/i)).toHaveTextContent(title);

    expectTitle(/navBarTitles.seatAllocator/i);

    store.dispatch(changeGameState({ phase: PHASE.ROLEDEALING }));
    expectTitle(/navBarTitles.roleDealing/i);

    store.dispatch(changeGameState({ phase: PHASE.ZERONIGHT }));
    expectTitle(/navBarTitles.zeroNight/i);

    store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
    expectTitle(/1 navBarTitles.day/i);

    store.dispatch(changeGameState({ phase: PHASE.VOTING }));
    expectTitle(/navBarTitles.voting/i);

    store.dispatch(changeGameState({ phase: PHASE.NIGHT, dayNumber: 2 }));
    expectTitle(/2 navBarTitles.night/i);

    store.dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
    expectTitle(/navBarTitles.endOfGame/i);
  });

  it('should render player controls on Day', () => {
    render();

    expect(screen.queryByTestId(/nextPlayerButton/i)).not.toBeInTheDocument();

    store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
    expect(screen.getByTestId(/nextPlayerButton/i)).toBeInTheDocument();
  });

  it('should notify about music server not working', () => {});

  it('should render player if music is reachable', () => {});
});

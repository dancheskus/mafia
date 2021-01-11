import { act } from 'react-dom/test-utils';

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

    expectTitle(/раздача номеров/i);

    store.dispatch(changeGameState({ phase: PHASE.ROLEDEALING }));
    expectTitle(/раздача ролей/i);

    store.dispatch(changeGameState({ phase: PHASE.ZERONIGHT }));
    expectTitle(/0 ночь/i);

    store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
    expectTitle(/1 день/i);

    store.dispatch(changeGameState({ phase: PHASE.VOTING }));
    expectTitle(/голосование/i);

    store.dispatch(changeGameState({ phase: PHASE.NIGHT, dayNumber: 2 }));
    expectTitle(/2 ночь/i);

    store.dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
    expectTitle(/конец игры/i);
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

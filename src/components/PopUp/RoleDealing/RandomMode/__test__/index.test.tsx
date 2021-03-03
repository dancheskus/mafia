import { clickButton, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import { playersInitialState } from 'redux/reducers/playersReducer';
import ROLE from 'common/playerEnums';
import { mockSetInterval } from 'helpers/testingHelpers/mockTimers';
import repeat from 'helpers/repeat';
import PHASE from 'common/phaseEnums';
import { changeGameState, clearSelectedNumbers, replaceSelectedNumbersWith } from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import RandomMode from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(RandomMode, { resetMode: jest.fn() });

describe('<RandomMode />', () => {
  it('should show eye icon with text "НАЖМИ" by default', () => {
    render();

    expect(screen.getByText(/нажми/i)).toBeInTheDocument();
    expect(screen.getByTestId(/eyeIcon/i)).toBeInTheDocument();
  });

  it('should push random roles and change selectedNumber to 0 in redux on mount', () => {
    render();

    expect(store.state.players).not.toEqual(playersInitialState);
    expect(store.dispatchSpy).toHaveBeenCalledWith(replaceSelectedNumbersWith(0));
  });

  it.each`
    changePlayersState         | roleText     | roleIcon            | isLightMode
    ${[ROLE.MIRNIJ, ROLE.DON]} | ${/мирный/i} | ${/thumbUpIcon/i}   | ${true}
    ${[ROLE.SHERIF, ROLE.DON]} | ${/шериф/i}  | ${/sheriffOkIcon/i} | ${true}
    ${[ROLE.DON]}              | ${/дон/i}    | ${/donRingIcon/i}   | ${false}
    ${[ROLE.MAFIA]}            | ${/мафия/i}  | ${/thumbDownIcon/i} | ${false}
  `(
    'should show correct role, role icon and lightMode for $roleText on card clicked',
    ({ changePlayersState, roleText, roleIcon, isLightMode }) => {
      store.changeRoles({ role: changePlayersState[0] });
      changePlayersState[1] && store.changeRoles({ playerNumber: 1, role: changePlayersState[1] });

      render();

      clickButton(/нажми/i);
      expect(store.state.game.lightMode).toBe(isLightMode);
      expect(screen.getByText(roleText)).toBeInTheDocument();
      expect(screen.getByTestId(roleIcon)).toBeInTheDocument();
    },
  );

  it.each`
    fakeTimerEnabled | cardShouldBeClosed
    ${false}         | ${false}
    ${true}          | ${true}
  `('should autoclose card after timer ended', ({ fakeTimerEnabled, cardShouldBeClosed }) => {
    render();

    fakeTimerEnabled && mockSetInterval();

    clickButton(/нажми/i);

    if (cardShouldBeClosed) {
      expect(screen.queryByText(/нажми/i)).toBeInTheDocument();
    } else {
      expect(screen.queryByText(/нажми/i)).not.toBeInTheDocument();
    }
  });

  it('should change selectedNumbers to correct player number. Should stop increasing number after 9th', () => {
    render();

    mockSetInterval();

    expect(store.state.game.selectedNumbers[0]).toBe(0);

    repeat(i => {
      clickButton(/нажми/i);
      expect(store.state.game.selectedNumbers[0]).toBe(i + 1);
    }, 9);

    clickButton(/нажми/i);
    expect(store.state.game.selectedNumbers[0]).toBe(9);
  });

  it('should render "ИГРАТЬ" button when lastCardRevealed is true in localStorage. When button clicked, selectedNumbers and PHASE should be changed', () => {
    localStorage.__STORE__.lastCardRevealed = true;
    render();

    clickButton(/играть/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(clearSelectedNumbers());
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.ZERONIGHT }));
  });
});

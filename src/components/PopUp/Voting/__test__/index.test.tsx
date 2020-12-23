import PHASE from 'common/phaseEnums';
import repeat from 'helpers/repeat';
import { clickButton, clickByTestId, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import {
  addToSelectedNumbers,
  changeGameState,
  clearSelectedNumbers,
  skipVotingEnable,
} from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import Voting from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.defaultTestRoles();
  store.dispatch(changeGameState({ phase: PHASE.VOTING, dayNumber: 2 }));
});

const VotingWithPortal = () => (
  <>
    <div id='portal' />
    <Voting />
  </>
);

const checkSelectedNumbersResetted = (newSelectedNumbers: number[]) => {
  expect(store.dispatchSpy).toHaveBeenCalledWith(clearSelectedNumbers());
  newSelectedNumbers.forEach(num => expect(store.dispatchSpy).toHaveBeenCalledWith(addToSelectedNumbers(num)));
};

const render = getRenderer(VotingWithPortal);

describe('<Voting />', () => {
  it.each`
    killedPlayers
    ${[]}
    ${[0, 1, 2]}
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
  `(
    'should render correct amount of active buttons depend on alive players amount',
    ({ killedPlayers }: { killedPlayers: number[] }) => {
      store.killPlayers(killedPlayers);
      render();

      const buttons = screen.getAllByTestId('votingSingleElement');

      const amountOfEnabledButtons = 10 - killedPlayers.length;
      const amountOfDisabledButtons = killedPlayers.length;

      repeat(i => expect(buttons[i]).not.toBeDisabled(), amountOfEnabledButtons);
      repeat(i => expect(buttons[i + amountOfEnabledButtons]).toBeDisabled(), amountOfDisabledButtons);
    },
  );

  it('should exit to EndOfGame if voting result makes "red <= black"', () => {
    store.setSelectedNumbers(9).killPlayers([3, 4, 5]);
    render();

    clickButton(/ок/i);

    expect(screen.getByText(/10/i)).toBeInTheDocument();

    clickButton(/ночь/i);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeGameState({ phase: PHASE.ENDOFGAME }));
  });

  it('should not render reset voting button on first player, but should render it on next stages', () => {
    store.setSelectedNumbers([0, 1, 2]);
    render();

    expect(screen.queryByTestId(/resetButton/i)).not.toBeInTheDocument();

    repeat(() => {
      clickButton(/далее/i);
      expect(screen.getByTestId(/resetButton/i)).toBeInTheDocument();
    }, 2);

    expect(screen.getByText(/завершить/i)).toBeInTheDocument();
  });

  it('should reset voting to initial state W/O car crash', () => {
    const selectedNumbers = [0, 1, 2];
    store.setSelectedNumbers(selectedNumbers);
    render();

    clickButton(/далее/i);
    clickByTestId(/resetButton/i);
    clickButton(/ок/i);

    checkSelectedNumbersResetted(selectedNumbers);
  });

  it('should reset voting to initial state W/ car crash', () => {
    const selectedNumbers = [0, 1, 2];
    store.setSelectedNumbers(selectedNumbers);
    render();

    clickButton(/5/i);
    repeat(() => clickButton(/далее/i), 2);
    clickButton(/завершить/i);

    expect(screen.getByText(/переголосовка/i)).toBeInTheDocument();
    checkSelectedNumbersResetted([0, 2]);
    clickButton(/ок/i);

    clickByTestId(/resetButton/i);
    clickButton(/ок/i);

    checkSelectedNumbersResetted(selectedNumbers);
  });

  it('should render correct player nubmer in big circle', () => {});

  it('should enable only left amount of votes on last voting screen and diable other buttons. Should render "ЗАВЕРШИТЬ" button on last step', () => {});

  it('should remove initialSelectedNumbers from localStorage on unmount', () => {});

  it('should skip voting if this IS 1st day and only 1 selectedNumber', () => {
    store.setSelectedNumbers(9).dispatch(changeGameState({ phase: PHASE.VOTING, dayNumber: 1 }));
    render();

    expect(screen.getByText(/голосование не проводится/i)).toBeInTheDocument();

    clickButton(/ночь/i);

    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeGameState({ phase: PHASE.NIGHT }));
  });

  it('should skip voting if this is NOT 1st day and skipVoting was enabled', () => {
    store.setSelectedNumbers([9, 4]);
    store.dispatch(skipVotingEnable());
    render();

    expect(screen.getByText(/голосование не проводится/i)).toBeInTheDocument();

    clickButton(/ночь/i);

    expect(store.dispatchSpy).toHaveBeenLastCalledWith(changeGameState({ phase: PHASE.NIGHT }));
  });

  it('should render EndOfVoting if voting ended or voting skipped', () => {});

  it('should render CarCrash if carCrash enabled', () => {});

  it('should exit CarCrash if carCrash ended', () => {});

  it('should create new voting list on carCrash exit', () => {});

  it('should render car crash 2d time differently', () => {});

  it('should kill all selected players if killAll was selected', () => {});

  it('should kill player immediately if only 1 player in voting list', () => {});
});

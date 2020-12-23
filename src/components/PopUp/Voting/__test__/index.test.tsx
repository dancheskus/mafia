import { act } from 'react-dom/test-utils';

import PHASE from 'common/phaseEnums';
import repeat from 'helpers/repeat';
import { clickButton, clickByTestId, getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import {
  addToSelectedNumbers,
  changeGameState,
  clearSelectedNumbers,
  skipVotingDisable,
  skipVotingEnable,
} from 'redux/actions/gameActions';
import { addFoul, killPlayer } from 'redux/actions/playersActions';
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

    clickButton([/5/i, /далее/i, /далее/i, /завершить/i]);

    expect(screen.getByText(/переголосовка/i)).toBeInTheDocument();
    checkSelectedNumbersResetted([0, 2]);
    clickButton(/ок/i);

    clickByTestId(/resetButton/i);
    clickButton(/ок/i);

    checkSelectedNumbersResetted(selectedNumbers);
  });

  it('should render correct player nubmer in big circle', () => {
    store.setSelectedNumbers([7, 0, 3]);
    render();

    const сircle = screen.getByTestId(/votingForPlayerCircle/i);

    expect(сircle).toHaveTextContent('8');

    clickButton(/далее/i);
    expect(сircle).toHaveTextContent('1');

    clickButton(/далее/i);
    expect(сircle).toHaveTextContent('4');
  });

  it('should enable only left amount of votes on last voting screen and diable other buttons. Should render "ЗАВЕРШИТЬ" button on last step', () => {
    const selectedNumbers = [0, 1, 2];
    store.setSelectedNumbers(selectedNumbers);
    render();

    clickButton(/далее/i);
    repeat(i => expect(screen.getByRole('button', { name: String(i + 1) })).toBeEnabled(), 10);

    clickButton(/далее/i);
    repeat(i => expect(screen.getByRole('button', { name: String(i + 1) })).toBeDisabled(), 9);

    expect(screen.getByRole('button', { name: '10' })).toBeEnabled();
  });

  it('should remove initialSelectedNumbers from localStorage on unmount', () => {
    store.setSelectedNumbers([0, 1, 2]);
    const { unmount } = render();
    unmount();

    expect(localStorage.removeItem).toHaveBeenCalledWith('initialSelectedNumbers');
  });

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

  it('should render EndOfVoting if voting ended', () => {
    store.setSelectedNumbers([0, 1]);
    render();

    clickButton([/далее/i, /завершить/i]);

    expect(screen.getByText(/игру покидает/i)).toBeInTheDocument();
  });

  it('should render EndOfVoting if voting skipped', () => {
    store.setSelectedNumbers([0, 1]).dispatch(skipVotingEnable());
    render();

    expect(screen.getByText(/голосование не проводится/i)).toBeInTheDocument();
  });

  it.each`
    votesForKillingAll | shouldKillPlayers
    ${/4/i}            | ${false}
    ${/5/i}            | ${false}
    ${/6/i}            | ${true}
  `('should render CarCrash. And test killAll argument', ({ votesForKillingAll, shouldKillPlayers }) => {
    store.setSelectedNumbers([0, 1, 2]);
    render();

    clickButton([/5/i, /далее/i, /далее/i, /завершить/i]);

    expect(screen.getByText(/переголосовка/i)).toBeInTheDocument();
    clickButton([/ок/i, /далее/i, /завершить/i, /5/i, /далее/i, /завершить/i]);

    expect(screen.getByText(/вывести всех выставленных/i)).toBeInTheDocument();
    shouldKillPlayers && clickButton([votesForKillingAll, /завершить/i, /ок/i, /далее/i, /ночь/i]);
    !shouldKillPlayers && clickButton([votesForKillingAll, /завершить/i, /ночь/i]);

    shouldKillPlayers && [0, 2].forEach(num => expect(store.dispatchSpy).toHaveBeenCalledWith(killPlayer(num)));
    !shouldKillPlayers && [0, 2].forEach(num => expect(store.dispatchSpy).not.toHaveBeenCalledWith(killPlayer(num)));
  });

  it('should kill player immediately if only 1 player in voting list', () => {
    store.setSelectedNumbers(4);
    render();

    expect(screen.getByText(/игру покидает/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();

    clickButton([/ок/i, /ночь/i]);
    expect(store.dispatchSpy).toHaveBeenCalledWith(killPlayer(4));
  });

  // it('should leave "skipVoting" after component unmount', () => {
  //   store.setSelectedNumbers([0, 1]);
  //   const { unmount } = render();

  //   clickButton([/далее/i, /завершить/i]);

  //   repeat(() => store.dispatch(addFoul(7)), 4);
  //   store.dispatch(skipVotingEnable());

  //   unmount();
  // });

  // fit('should disable "skipVoting" after component unmount', () => {
  //   store.setSelectedNumbers([0, 1]);
  //   const { unmount } = render();

  //   clickButton([/далее/i, /завершить/i, /ок/i, /ночь/i]);

  //   repeat(() => store.dispatch(addFoul(1)), 4);
  //   act(() => {
  //     store.dispatch(skipVotingEnable());
  //   });

  //   console.log(store.state.game.skipVoting);

  //   // screen.debug();
  //   // unmount();
  //   // expect(store.dispatchSpy).toHaveBeenCalledWith(skipVotingDisable());
  //   // console.log(store.state.game.skipVoting);
  // });
});

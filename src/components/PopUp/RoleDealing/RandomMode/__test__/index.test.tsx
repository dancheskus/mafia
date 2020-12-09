import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';
import { playersInitialState } from 'redux/reducers/playersReducer';
import ROLE from 'common/playerEnums';
import { mockSetInterval } from 'helpers/testingHelpers/mockTimers';
import repeat from 'helpers/repeat';
import PHASE from 'common/phaseEnums';

import RandomMode from '..';

const resetMode = jest.fn();

describe('<RandomMode />', () => {
  it('should show eye icon with text "НАЖМИ" by default', () => {
    render(<RandomMode resetMode={resetMode} />);

    expect(screen.getByText(/нажми/i)).toBeInTheDocument();
    expect(screen.getByTestId(/eyeIcon/i)).toBeInTheDocument();
  });

  it('should push random roles and change selectedNumber to 0 in redux on mount', () => {
    const { getState } = render(<RandomMode resetMode={resetMode} />);

    expect(getState().players).not.toEqual(playersInitialState);
    expect(getState().game.selectedNumbers).toEqual([0]);
  });

  it.each`
    changePlayersState                             | roleText     | roleIcon            | isLightMode
    ${[{ role: ROLE.MIRNIJ }, { role: ROLE.DON }]} | ${/мирный/i} | ${/thumbUpIcon/i}   | ${true}
    ${[{ role: ROLE.SHERIF }, { role: ROLE.DON }]} | ${/шериф/i}  | ${/sheriffOkIcon/i} | ${true}
    ${[{ role: ROLE.DON }]}                        | ${/дон/i}    | ${/donRingIcon/i}   | ${false}
    ${[{ role: ROLE.MAFIA }]}                      | ${/мафия/i}  | ${/thumbDownIcon/i} | ${false}
  `(
    'should show correct role, role icon and lightMode for $roleText on card clicked',
    ({ changePlayersState, roleText, roleIcon, isLightMode }) => {
      const { getState } = render(<RandomMode resetMode={resetMode} />, { changePlayersState });

      user.click(screen.getByRole('button', { name: /нажми/i }));
      expect(getState().game.lightMode).toBe(isLightMode);
      expect(screen.getByText(roleText)).toBeInTheDocument();
      expect(screen.getByTestId(roleIcon)).toBeInTheDocument();
    },
  );

  it.each`
    fakeTimerEnabled | cardShouldBeClosed
    ${false}         | ${false}
    ${true}          | ${true}
  `('should autoclose card after timer ended', ({ fakeTimerEnabled, cardShouldBeClosed }) => {
    render(<RandomMode resetMode={resetMode} />);

    fakeTimerEnabled && mockSetInterval();

    const button = screen.getByRole('button', { name: /нажми/i });
    user.click(button);

    if (cardShouldBeClosed) {
      expect(screen.queryByText(/нажми/i)).toBeInTheDocument();
    } else {
      expect(screen.queryByText(/нажми/i)).not.toBeInTheDocument();
    }
  });

  it('should change selectedNumbers to correct player number. Should stop increasing number after 9th', () => {
    const { getState } = render(<RandomMode resetMode={resetMode} />);
    const button = screen.getByRole('button', { name: /нажми/i });

    mockSetInterval();

    expect(getState().game.selectedNumbers[0]).toBe(0);

    repeat(i => {
      user.click(button);
      expect(getState().game.selectedNumbers[0]).toBe(i + 1);
    }, 9);

    user.click(button);
    expect(getState().game.selectedNumbers[0]).toBe(9);
  });

  it('should render "ИГРАТЬ" button when lastCardRevealed is true in localStorage. When button clicked, selectedNumbers and PHASE should be changed', () => {
    localStorage.__STORE__.lastCardRevealed = true;
    const { getState } = render(<RandomMode resetMode={resetMode} />);

    user.click(screen.getByRole('button', { name: /играть/i }));

    expect(getState().game.selectedNumbers).toEqual([]);
    expect(getState().game.gameState.phase).toBe(PHASE.ZERONIGHT);
  });
});

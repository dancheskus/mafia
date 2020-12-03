import React from 'react';

import { IOptions, render, screen, user } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import { switchMafiaTimer } from 'redux/actions/settingsActions';
import ROLE from 'common/playerEnums';

import ZeroNight from '..';

const setup = (reduxSettings?: Partial<IOptions>) =>
  render(<ZeroNight />, {
    initialSettingsState: { tutorialEnabled: false, ...reduxSettings?.initialSettingsState },
    initialGameState: { gameState: { phase: PHASE.ZERONIGHT, dayNumber: 0 }, ...reduxSettings?.initialGameState },
    changePlayersState: reduxSettings?.changePlayersState,
  });

describe('<ZeroNight />', () => {
  it('should render "Договорка" screen. And should not if next button is clicked', () => {
    setup();

    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /далее/i }));
    expect(screen.queryByText(/договорка/i)).not.toBeInTheDocument();
  });

  it('should not click on next button if tutorialEnabled = true', () => {
    setup({ initialSettingsState: { tutorialEnabled: true } });

    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /далее/i }));
    expect(screen.getByText(/договорка/i)).toBeInTheDocument();
  });

  it('should render timer if mafiaTimer enabled', () => {
    const { dispatch } = setup();

    expect(screen.getByText(/1:00/i)).toBeInTheDocument();
    dispatch(switchMafiaTimer());
    expect(screen.queryByText(/1:00/i)).not.toBeInTheDocument();
  });

  it('should show correct Sheriff and Don player numbers', () => {
    setup({ changePlayersState: [{ role: ROLE.DON }, { role: ROLE.SHERIF }] });

    user.click(screen.getByRole('button', { name: /далее/i }));

    expect(screen.getByTestId(/donPlayerNumber/i)).toHaveTextContent('1');
    expect(screen.getByTestId(/shariffPlayerNumber/i)).toHaveTextContent('2');
  });

  it('should closePopup and set phase to Day and dayNumber to 1', () => {
    const { getState } = setup();

    user.click(screen.getByRole('button', { name: /далее/i }));
    user.click(screen.getByRole('button', { name: /день/i }));

    expect(getState().game.popupOpened).toBe(false);
    expect(getState().game.gameState).toEqual({ phase: PHASE.DAY, dayNumber: 1 });
  });
});

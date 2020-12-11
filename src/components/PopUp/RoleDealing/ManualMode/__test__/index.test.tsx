import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import ROLE from 'common/playerEnums';
import { addToSelectedNumbers, clearSelectedNumbers } from 'redux/actions/gameActions';

import ManualMode from '..';

const resetMode = jest.fn();

const selectPlayer = (dispatch: any, playerNumber: number) => {
  dispatch(clearSelectedNumbers());
  dispatch(addToSelectedNumbers(playerNumber));
};

describe('<ManualMode />', () => {
  it('should show notification about role selection and disable "ИГРАТЬ" button until required roles selected.', () => {
    const { dispatch } = render(<ManualMode resetMode={resetMode} />);

    const nextButton = screen.getByRole('button', { name: /играть/i });
    const notification = screen.getByTestId(/roleNotification/i);

    expect(nextButton).toBeDisabled();
    expect(notification).not.toHaveStyleRule('color', 'transparent');

    [/donButton/i, /mafiaButton/i, /sheriffButton/i].forEach((roleIcon, i) => {
      user.click(screen.getByTestId(roleIcon));
      expect(nextButton).toBeDisabled();
      expect(notification).not.toHaveStyleRule('color', 'transparent');

      selectPlayer(dispatch, i + 1);
    });

    user.click(screen.getByTestId(/mafiaButton/i));
    expect(nextButton).toBeEnabled();
    expect(notification).toHaveStyleRule('color', 'transparent');
  });

  it('should disable role button if other player has this role', () => {
    const { dispatch } = render(<ManualMode resetMode={resetMode} />);

    const mafiaButton = screen.getByTestId(/mafiaButton/i);
    const donButton = screen.getByTestId(/donButton/i);
    const sheriffButton = screen.getByTestId(/sheriffButton/i);

    expect(mafiaButton).toBeEnabled();
    expect(donButton).toBeEnabled();
    expect(sheriffButton).toBeEnabled();

    user.click(mafiaButton);
    selectPlayer(dispatch, 1);
    user.click(mafiaButton);
    selectPlayer(dispatch, 2);

    expect(mafiaButton).toBeDisabled();

    user.click(donButton);
    selectPlayer(dispatch, 3);

    expect(donButton).toBeDisabled();

    user.click(sheriffButton);
    selectPlayer(dispatch, 4);

    expect(sheriffButton).toBeDisabled();
  });

  it('should remember role if selectedPlayer changed', () => {
    const { dispatch } = render(<ManualMode resetMode={resetMode} />);

    const donButton = screen.getByTestId(/donButton/i);

    user.click(donButton);
    selectPlayer(dispatch, 1);

    expect(donButton).toBeDisabled();
    selectPlayer(dispatch, 0);
    expect(donButton).toBeEnabled();
  });

  it('should change selectedNumbers and PHASE when "ИГРАТЬ" button clicked', () => {
    const { getState } = render(<ManualMode resetMode={resetMode} />, {
      changePlayersState: [{ role: ROLE.DON }, { role: ROLE.MAFIA }, { role: ROLE.MAFIA }, { role: ROLE.SHERIF }],
    });

    user.click(screen.getByRole('button', { name: /играть/i }));

    expect(getState().game.selectedNumbers).toEqual([]);
    expect(getState().game.gameState.phase).toBe(PHASE.ZERONIGHT);
  });
});

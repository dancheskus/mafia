import React from 'react';
import user from '@testing-library/user-event';

import { render, screen } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';

import Day from '../Day';

describe('PopUp - <Day />', () => {
  it('should show "НЕСОСТРЕЛ" if no player were killed after night', () => {
    render(<Day />);

    expect(screen.getByText(/несострел/i)).toBeInTheDocument();
  });

  it('should show killed player number after night', () => {
    render(<Day />, { initialGameState: { killedAtNightPlayer: 4 } });

    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('should dispatch "openPopup" and "removeKilledAtNightPlayer" on unmount', () => {
    const { getState, unmount } = render(<Day />, { initialGameState: { popupOpened: false, killedAtNightPlayer: 4 } });

    unmount();
    expect(getState().game.popupOpened).toBe(true);
    expect(getState().game.killedAtNightPlayer).toBe(null);
  });

  it('should close popup and dispatch killPlayer if playerShouldBeKilled', () => {
    const playerNumber = 4;
    const { getState } = render(<Day />, { initialGameState: { killedAtNightPlayer: playerNumber } });

    expect(getState().players[playerNumber].isAlive).toBe(true);

    user.click(screen.getByText(/закрыть/i));
    expect(getState().game.popupOpened).toBe(false);
    expect(getState().players[playerNumber].isAlive).toBe(false);
  });

  it('should increase activePlayer and opensTable by 1 (if killedPlayer = activePlayer)', () => {
    const playerNumber = 4;
    const { getState } = render(<Day />, {
      initialGameState: {
        gameState: { phase: PHASE.DAY, dayNumber: 2 },
        activePlayer: playerNumber,
        killedAtNightPlayer: playerNumber,
        opensTable: playerNumber,
      },
    });

    expect(getState().game.opensTable).toBe(4);
    expect(getState().game.activePlayer).toBe(4);

    user.click(screen.getByText(/закрыть/i));
    expect(getState().game.opensTable).toBe(5);
    expect(getState().game.activePlayer).toBe(5);
  });
});

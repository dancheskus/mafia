import React from 'react';
import user from '@testing-library/user-event';

import { render, screen } from 'helpers/testingHelpers/test-utils';
import basicPlayersState from 'helpers/testingHelpers/basicPlayersState';
import PHASE from 'common/phaseEnums';
import ROLE from 'common/playerEnums';
import colors from 'style/colors';

import SingleCard from '../SingleCard';

// const playerNumber = screen.getByTestId(/playerNumber/i);
// const foulContainer = screen.getByTestId(/foulContainer/i);
// const removeFoul = screen.getByTestId(/removeFoul/i);
// const addFoul = screen.getByTestId(/addFoul/i);

const mockSetInterval = () => jest.spyOn(window, 'setInterval').mockImplementationOnce(callback => callback());
const initialGameState = { gameState: { phase: PHASE.DAY, dayNumber: 1 } };
const changePlayersState = [{ fouls: { amount: 3 } }, { role: ROLE.MAFIA }];

describe('<SingleCard />', () => {
  it('should not show foulContainer if player is dead', () => {
    render(<SingleCard order={0} playerNumber={0} />, { changePlayersState: [{ isAlive: false }] });

    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).not.toBeVisible();
  });

  it('should show indicator in top left corner if player opens table', () => {
    const { rerender } = render(<SingleCard order={0} playerNumber={0} />, {
      initialGameState,
      initialPlayersState: basicPlayersState,
    });

    const playerNumber = screen.getByTestId(/playerNumber/i);

    expect(playerNumber).toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });

    rerender(<SingleCard order={0} playerNumber={1} />);

    expect(playerNumber).not.toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });
  });

  it('should kill player after 4th foul', () => {
    const { getState } = render(<SingleCard order={0} playerNumber={0} />, { initialGameState, changePlayersState });

    mockSetInterval();

    // Player number "0" should be alive
    expect(getState().players[0].isAlive).toBe(true);

    // Killing player with 4th foul
    const addFoul = screen.getByTestId(/addFoul/i);
    user.click(addFoul);

    // Foul container should be hidden
    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).not.toBeVisible();

    // Player number "0" should be killed
    expect(getState().players[0].isAlive).toBe(false);

    expect(setInterval).toHaveBeenCalledTimes(3);

    // Перезаписать только часть игроков
  });

  it('should not kill player if back button was clicked after 4th foul. And kill player after 4th foul is clicked again', () => {
    const { getState } = render(<SingleCard order={0} playerNumber={0} />, { initialGameState, changePlayersState });

    mockSetInterval();

    // Player number "0" should be alive
    expect(getState().players[0].isAlive).toBe(true);

    // Killing player with 4th foul
    const addFoul = screen.getByTestId(/addFoul/i);
    user.click(addFoul);

    // Returning player to life
    const backButton = screen.getByTestId(/backButton/i);
    user.click(backButton);

    // Foul container should be visible
    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).toBeVisible();

    // Player number "0" should be killed
    expect(getState().players[0].isAlive).toBe(true);

    expect(setInterval).toHaveBeenCalledTimes(3);

    // Killing again to validate killing function is still accessible
    user.click(addFoul);

    expect(setInterval).toHaveBeenCalledTimes(4);
  });

  it('should increase and decrease amount of fouls and change styles according to amount of fouls', () => {
    render(<SingleCard order={0} playerNumber={3} />, { initialGameState, changePlayersState });

    const removeFoul = screen.getByTestId(/removeFoul/i);
    const addFoul = screen.getByTestId(/addFoul/i);
    const playerNumber = screen.getByTestId(/playerNumber/i);

    expect(screen.queryByText(/!/)).not.toBeInTheDocument();
    expect(addFoul).toHaveStyleRule('background', colors.Day.addFoulBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addFoulBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addSecondFoulBackground);
    expect(playerNumber).toHaveStyleRule('background', colors.Day.playerCardBackground);

    user.click(addFoul);
    expect(addFoul).toHaveTextContent('!!!');
    expect(addFoul).toHaveStyleRule('background', colors.Day.addThirdFoulBackground);
    expect(playerNumber).toHaveStyleRule('background', colors.Day.warningPlayerCardBackground);

    user.dblClick(removeFoul);
    expect(addFoul).toHaveTextContent('!');
  });
});

// --------------------- ЕСЛИ ЖИВ: ----------------------
// При получении 3-го фола mute игрока. Смена стиля на красный. Как номера, так и поля "+"
// При получении 4-го фола запускается таймер, по прошествии которого удаляется поле фолов. Добавляется кнопка назад и запускается новый таймер
// При нажатии на "-" уменьшаем фолы. !!. Если фолов 0, не уменьшаем.

// --------------------- ЕСЛИ МЕРТВ: --------------------
// только номер игрока. Стиль черный

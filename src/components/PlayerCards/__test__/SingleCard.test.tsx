import React from 'react';

import { render, screen } from 'helpers/testingHelpers/test-utils';
import { allAlivePlayers } from 'helpers/testingHelpers/testingPlayersStates';

import SingleCard from '../SingleCard';

// const playerNumber = screen.getByTestId(/playerNumber/i);
// const foulContainer = screen.getByTestId(/foulContainer/i);
// const removeFoul = screen.getByTestId(/removeFoul/i);
// const addFoul = screen.getByTestId(/addFoul/i);

describe('<SingleCard />', () => {
  it('should not show foulContainer if player is dead', () => {
    const initialPlayersState = [{ isAlive: false, fouls: { amount: 0, muted: false } }];
    render(<SingleCard order={0} playerNumber={0} />, { initialPlayersState });

    const foulContainer = screen.getByTestId(/foulContainer/i);
    expect(foulContainer).not.toBeVisible();
  });

  it('should show indicator in top left corner if player opens table', () => {
    const initialGameState = { gameState: { phase: 'Day', dayNumber: 1 } };
    const { rerender } = render(<SingleCard order={0} playerNumber={0} />, {
      initialPlayersState: allAlivePlayers,
      initialGameState,
    });

    const playerNumber = screen.getByTestId(/playerNumber/i);

    expect(playerNumber).toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });

    rerender(<SingleCard order={0} playerNumber={1} />);

    expect(playerNumber).not.toHaveStyleRule('background', '#8A8A8A', { modifier: '::before' });
  });
});

// --------------------- ЕСЛИ ЖИВ: ----------------------
// Активный игрок - кружок слева
// Есть как номер игрока, так и панель фолов
// При нажатии на "+" увеличиваем фолы. !!!. "+" исчезает. Стили меняются (серый, желтый, красный)
// При получении 3-го фола mute игрока. Смена стиля на красный. Как номера, так и поля "+"
// При получении 4-го фола запускается таймер, по прошествии которого удаляется поле фолов. Добавляется кнопка назад и запускается новый таймер
// При нажатии на "-" уменьшаем фолы. !!. Если фолов 0, не уменьшаем.

// --------------------- ЕСЛИ МЕРТВ: --------------------
// только номер игрока. Стиль черный

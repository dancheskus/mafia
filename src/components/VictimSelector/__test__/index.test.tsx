/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import render from 'helpers/testing/render';

import VictimSelector from '..';

const onNumberSelected = jest.fn();

const props = { lastPlayer: false, votesLeft: 10, onNumberSelected };

describe('<VictimSelector />', () => {
  it('should change clicked button classNames and call callback function onClick', () => {
    render(<VictimSelector {...props} />);

    const buttonNumber = 4;
    const secondButton = screen.getByRole('button', { name: buttonNumber.toString() });
    const buttonNotClickedClassName = secondButton.className;
    user.click(secondButton);
    const buttonClickedClassName = secondButton.className;
    expect(onNumberSelected).toHaveBeenCalledTimes(1);
    expect(onNumberSelected).toHaveBeenCalledWith(buttonNumber - 1);
    expect(buttonNotClickedClassName).not.toBe(buttonClickedClassName);
    user.click(secondButton);
    expect(secondButton.className).toBe(buttonNotClickedClassName);
  });

  it('should render 10 buttons with player numbers', () => {
    render(<VictimSelector {...props} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(10);
  });

  it('should render 5 disabled (not clickable) buttons if votesLeft=4', () => {
    render(<VictimSelector {...props} votesLeft={4} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => user.click(button));
    expect(onNumberSelected).toHaveBeenCalledTimes(5);
  });

  it('should render 2 disabled buttons at Night if players are dead', () => {
    const initialPlayersState = [
      { isAlive: true },
      { isAlive: false },
      { isAlive: true },
      { isAlive: true },
      { isAlive: true },
      { isAlive: false },
      { isAlive: true },
      { isAlive: true },
      { isAlive: true },
      { isAlive: true },
    ];
    render(<VictimSelector onNumberSelected={onNumberSelected} shooting />, { initialPlayersState });
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => user.click(button));
    expect(onNumberSelected).toHaveBeenCalledTimes(8);
  });
});

// днем, если 5 игроков убито, при голосовании 5 кнопок должно быть disabled
// Если голосуют за последнюю кандидатуру (lastPlayer), голос нельзя снять. Все остальные кнопки disabled
// Если передан selectedNumber, он должен быть активен.

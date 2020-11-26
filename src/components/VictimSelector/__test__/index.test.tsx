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
    const initialGameState = { opensTable: 5 };
    render(<VictimSelector {...props} votesLeft={4} />, { initialGameState });

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => user.click(button));
    expect(onNumberSelected).toHaveBeenCalledTimes(5);
  });
});

// ночью, если игрок убит, его номер не активен
// Если голосуют за последнюю кандидатуру (lastPlayer), голос нельзя снять. Все остальные кнопки disabled
// Если передан selectedNumber, он должен быть активен.

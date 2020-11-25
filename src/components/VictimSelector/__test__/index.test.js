/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';

import configureStore from 'redux/configureStore';

import VictimSelector from '..';

describe('<VictimSelector />', () => {
  it('should render without problems', () => {
    const store = configureStore();
    const onNumberSelected = jest.fn();
    const props = { lastPlayer: false, votesLeft: 10, shooting: false, onNumberSelected };

    render(
      <Provider store={store}>
        <VictimSelector {...props} />
      </Provider>
    );
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
});

// номерков должно быть 10
// при нажатии на номер, должна вызываться функция с этим номером, цвет кнопки меняется.
// при votesLeft=5, остальные номера должны быть заблокированными
// ночью, если игрок убит, его номер не активен
// Если голосуют за последнюю кандидатуру (lastPlayer), голос нельзя снять
// Если передан selectedNumber, он должен быть активен.

import React from 'react';

import { getRenderer, screen, user, act } from 'helpers/testingHelpers/test-utils';
import { mockSetInterval, mockSetIntervalOnce } from 'helpers/testingHelpers/mockTimers';
import repeat from 'helpers/repeat';
import {
  addToSelectedNumbers,
  changeGameState,
  clearSelectedNumbers,
  resetGameReducer,
} from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';
import createTestStore, { TestStore } from 'test/createTestStore';

import SeatAllocator from '..';

let store: TestStore;

beforeEach(() => {
  store = createTestStore();
});

const render = getRenderer(SeatAllocator);

const getTextOrNumber = (val: string) => +val || val;

describe('<SeatAllocator />', () => {
  it('should render "НАЖМИ" button if it was not clicked, and random number if button clicked.', () => {
    render();

    mockSetIntervalOnce();

    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    expect(randomNumberButton).toHaveTextContent(/нажми/i);
    user.click(randomNumberButton);
    expect(getTextOrNumber(randomNumberButton.textContent!)).toEqual(expect.any(Number));
  });

  it('should render 10 different numbers', () => {
    render();

    mockSetInterval();

    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    repeat(() => user.click(randomNumberButton), 10);

    expect([...store.state.game.selectedNumbers].sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should disable button after 10 clicks and show last number instead of "НАЖМИ"', () => {
    render();

    mockSetInterval();

    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    repeat(() => user.click(randomNumberButton), 10);

    expect(randomNumberButton).toBeDisabled();

    const { selectedNumbers } = store.state.game;
    const expectedNumber = selectedNumbers[selectedNumbers.length - 1] + 1;
    expect(randomNumberButton).toHaveTextContent(String(expectedNumber));
  });

  it('should be disabled if animation is working', () => {
    render();

    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    user.click(randomNumberButton);
    expect(randomNumberButton).toBeDisabled();
  });

  it('should render "ПРОПУСТИТЬ" button, or "ИГРАТЬ" if all numbers received', () => {
    render();
    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    mockSetInterval();

    expect(screen.getByRole('button', { name: /пропустить/i })).toBeInTheDocument();

    repeat(() => user.click(randomNumberButton), 9);
    expect(screen.getByRole('button', { name: /пропустить/i })).toBeInTheDocument();

    user.click(randomNumberButton);
    expect(screen.getByRole('button', { name: /играть/i })).toBeInTheDocument();
  });

  it('should reset component state if "Start new game" was pressed before unmounting this component', () => {
    render();
    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    mockSetInterval();

    repeat(() => user.click(randomNumberButton), 10);

    expect(getTextOrNumber(randomNumberButton.textContent!)).toEqual(expect.any(Number));

    act(() => {
      store.dispatch(resetGameReducer());
    });

    expect(randomNumberButton).toHaveTextContent(/нажми/i);
    expect(screen.getByRole('button', { name: /пропустить/i })).toBeInTheDocument();
  });

  it('should clearSelectedNumbers on mount', () => {
    repeat(i => store.dispatch(addToSelectedNumbers(i + 1)), 3);
    render();

    expect(store.state.game.selectedNumbers).toEqual([]);
  });

  it('should change game phase to "ROLEDEALING" and clearSelectedNumbers when next button is clicked', () => {
    render();
    const randomNumberButton = screen.getByTestId(/randomNumberButton/i);

    mockSetInterval();
    repeat(() => user.click(randomNumberButton), 10);

    user.click(screen.getByRole('button', { name: /играть/i }));

    expect(store.dispatchSpy).toHaveBeenCalledWith(clearSelectedNumbers());
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.ROLEDEALING }));
  });
});

import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import colors from 'style/colors';
import testStore, { TestStore } from 'test/TestStore';
import { killPlayer } from 'redux/actions/playersActions';

import VictimSelector from '..';

let store: TestStore;

beforeEach(() => {
  store = testStore();
});

const onNumberSelected = jest.fn();

const render = getRenderer(VictimSelector, { votesLeft: 9, onNumberSelected });

describe('<VictimSelector />', () => {
  it('should change clicked button classNames and call callback function onClick', () => {
    render();

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
    render();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(10);
  });

  it('should render 5 disabled (not clickable) buttons if votesLeft=4', () => {
    render({ votesLeft: 4 });

    const buttons = screen.getAllByRole('button');
    [1, 2, 3, 4, 5].forEach(button => expect(buttons[button - 1]).not.toBeDisabled());
    [6, 7, 8, 9, 10].forEach(button => expect(buttons[button - 1]).toBeDisabled());
  });

  it('should render 2 disabled buttons at Night if players are dead', () => {
    store.dispatch(killPlayer(1));
    store.dispatch(killPlayer(5));

    render({ shooting: true });
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => user.click(button));
    [1, 3, 4, 5, 7, 8, 9, 10].forEach(button => expect(buttons[button - 1]).not.toBeDisabled());
    [2, 6].forEach(button => expect(buttons[button - 1]).toBeDisabled());
  });

  it('should render 2 disabled buttons at Day if players are dead', () => {
    render({ votesLeft: 7 });
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => user.click(button));
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(button => expect(buttons[button - 1]).not.toBeDisabled());
    [9, 10].forEach(button => expect(buttons[button - 1]).toBeDisabled());
  });

  it('should render all disabled buttons with one button not clickable if last player is voting', () => {
    render({ votesLeft: 7, lastPlayer: true });
    const buttons = screen.getAllByRole('button');
    [1, 2, 3, 4, 5, 6, 7, 9, 10].forEach(button => expect(buttons[button - 1]).toBeDisabled());

    const activeButton = screen.getByRole('button', { name: /8/i });
    user.click(activeButton);
    expect(onNumberSelected).toHaveBeenCalledTimes(0);
  });

  it('should render passed selectedNumber as active button', () => {
    render({ selectedNumber: 3 });

    const buttons = screen.getAllByRole('button');
    const activeButton = screen.getByRole('button', { name: /4/i });
    expect(activeButton).toHaveStyleRule('background', colors.Voting.handsAmountSelectedBackground);
    expect(activeButton).toHaveStyleRule('color', colors.Voting.popupTextInverse);

    [1, 2, 3, 5, 6, 7, 8, 9, 10].forEach(button => {
      expect(buttons[button - 1]).not.toHaveStyleRule('background', colors.Voting.handsAmountSelectedBackground);
      expect(buttons[button - 1]).not.toHaveStyleRule('color', colors.Voting.popupTextInverse);
    });
  });
});

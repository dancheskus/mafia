import { clickButton, clickByTestId, getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import PHASE from 'common/phaseEnums';
import { changeGameState, clearSelectedNumbers, replaceSelectedNumbersWith } from 'redux/actions/gameActions';
import TestStore from 'test/TestStore';

import ManualMode from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(ManualMode, { resetMode: jest.fn() });

describe('<ManualMode />', () => {
  it('should show notification about role selection and disable "ИГРАТЬ" button until required roles selected.', () => {
    render();

    const nextButton = screen.getByRole('button', { name: /играть/i });
    const notification = screen.getByTestId(/roleNotification/i);

    expect(nextButton).toBeDisabled();
    expect(notification).not.toHaveStyleRule('color', 'transparent');

    [/donButton/i, /mafiaButton/i, /sheriffButton/i].forEach((roleIcon, i) => {
      clickByTestId(roleIcon);
      expect(nextButton).toBeDisabled();
      expect(notification).not.toHaveStyleRule('color', 'transparent');

      store.dispatch(replaceSelectedNumbersWith(i + 1));
    });

    clickByTestId(/mafiaButton/i);
    expect(nextButton).toBeEnabled();
    expect(notification).toHaveStyleRule('color', 'transparent');
  });

  it('should disable role button if other player has this role', () => {
    render();

    const mafiaButton = screen.getByTestId(/mafiaButton/i);
    const donButton = screen.getByTestId(/donButton/i);
    const sheriffButton = screen.getByTestId(/sheriffButton/i);

    expect(mafiaButton).toBeEnabled();
    expect(donButton).toBeEnabled();
    expect(sheriffButton).toBeEnabled();

    user.click(mafiaButton);
    store.dispatch(replaceSelectedNumbersWith(1));
    user.click(mafiaButton);
    store.dispatch(replaceSelectedNumbersWith(2));

    expect(mafiaButton).toBeDisabled();

    user.click(donButton);
    store.dispatch(replaceSelectedNumbersWith(3));

    expect(donButton).toBeDisabled();

    user.click(sheriffButton);
    store.dispatch(replaceSelectedNumbersWith(4));

    expect(sheriffButton).toBeDisabled();
  });

  it('should remember role if selectedPlayer changed', () => {
    render();

    const donButton = screen.getByTestId(/donButton/i);

    user.click(donButton);
    store.dispatch(replaceSelectedNumbersWith(1));

    expect(donButton).toBeDisabled();
    store.dispatch(replaceSelectedNumbersWith(0));
    expect(donButton).toBeEnabled();
  });

  it('should change selectedNumbers and PHASE when "ИГРАТЬ" button clicked', () => {
    store.defaultTestRoles();
    render();

    clickButton(/играть/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(clearSelectedNumbers());
    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.ZERONIGHT }));
  });
});

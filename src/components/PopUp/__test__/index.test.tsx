import React from 'react';

import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import { changeGameState, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';
import createTestStore, { TestStore } from 'test/createTestStore';

import PopUp from '..';

const PopupChild = () => <div>1</div>;

let store: TestStore;

beforeEach(() => {
  store = createTestStore();
});

const render = getRenderer(PopUp, { PopupChild, opened: true });

describe('<PopUp />', () => {
  it('should render PopupChild if popup is opened', () => {
    const { rerender } = render();

    const childNode = screen.getByText('1');

    expect(childNode).toBeVisible();

    rerender({ opened: false });
    expect(childNode).not.toBeVisible();
  });

  it('should render minimize button if phase is not SEATALLOCATOR, ROLEDEALING or ENDOFGAME', () => {
    render();
    const buttonId = 'minimizeButton';

    [PHASE.SEATALLOCATOR, PHASE.ROLEDEALING, PHASE.ENDOFGAME].forEach(phase => {
      store.dispatch(changeGameState({ phase }));
      expect(screen.queryByTestId(buttonId)).not.toBeInTheDocument();
    });

    [(PHASE.ZERONIGHT, PHASE.DAY, PHASE.NIGHT, PHASE.VOTING)].forEach(phase => {
      store.dispatch(changeGameState({ phase }));
      expect(screen.getByTestId(buttonId)).toBeInTheDocument();
    });
  });

  it('should minimize and maximize popup', () => {
    store.dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 2 }));

    render({ opened: false });

    const minimizeIcon = screen.getByTestId(/minimizeIcon/i);
    user.click(minimizeIcon);

    expect(store.dispatchSpy).toHaveBeenNthCalledWith(1, minimizeMaximaizePopup());

    const maximizeIcon = screen.getByTestId(/maximizeIcon/i);
    user.click(maximizeIcon);

    expect(store.dispatchSpy).toHaveBeenNthCalledWith(2, minimizeMaximaizePopup());
  });
});

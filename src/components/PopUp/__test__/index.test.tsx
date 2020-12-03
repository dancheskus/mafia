import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';
import { changeGameState } from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';

import PopUp from '..';

const PopupChild = () => <div>1</div>;

describe('<PopUp />', () => {
  it('should render PopupChild if popup is opened', () => {
    const { rerender } = render(<PopUp PopupChild={PopupChild} opened />);

    const childNode = screen.getByText('1');

    expect(childNode).toBeVisible();

    rerender(<PopUp PopupChild={PopupChild} opened={false} />);
    expect(childNode).not.toBeVisible();
  });

  it('should render minimize button if phase is not SEATALLOCATOR, ROLEDEALING or ENDOFGAME', () => {
    const { dispatch } = render(<PopUp PopupChild={PopupChild} opened />);
    const buttonId = 'minimizeButton';

    [PHASE.SEATALLOCATOR, PHASE.ROLEDEALING, PHASE.ENDOFGAME].forEach(phase => {
      dispatch(changeGameState({ phase }));
      expect(screen.queryByTestId(buttonId)).not.toBeInTheDocument();
    });

    [(PHASE.ZERONIGHT, PHASE.DAY, PHASE.NIGHT, PHASE.VOTING)].forEach(phase => {
      dispatch(changeGameState({ phase }));
      expect(screen.getByTestId(buttonId)).toBeInTheDocument();
    });
  });

  it('should minimize and maximize popup', () => {
    const { getState } = render(<PopUp PopupChild={PopupChild} opened />, {
      initialGameState: { gameState: { phase: PHASE.DAY, dayNumber: 2 } },
    });

    const minimizeIcon = screen.getByTestId(/minimizeIcon/i);
    user.click(minimizeIcon);
    expect(getState().game.popupMinimized).toBe(true);

    const maximizeIcon = screen.getByTestId(/maximizeIcon/i);
    user.click(maximizeIcon);
    expect(getState().game.popupMinimized).toBe(false);
  });
});

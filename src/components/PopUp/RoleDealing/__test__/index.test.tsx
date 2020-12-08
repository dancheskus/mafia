import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';

import RoleDealing from '..';

const setup = () => render(<RoleDealing />, { initialSettingsState: { tutorialEnabled: false } });

beforeEach(() => {
  localStorage.clear();
});

describe('<RoleDealing />', () => {
  it('should render with randomModeSelected by default. Changing mode should also change next button text.', () => {
    setup();

    const randomIcon = screen.getByTestId(/randomCubeIcon/i);
    const listIcon = screen.getByTestId(/listIcon/i);
    const nextButton = screen.getByTestId(/nextButton/i);

    expect(listIcon).not.toHaveClass('selected');
    expect(randomIcon).toHaveClass('selected');
    expect(nextButton).toHaveTextContent(/автоматически/i);

    user.click(listIcon);

    expect(nextButton).toHaveTextContent(/вручную/i);
  });

  it('should clear localStorage on unmount', () => {
    const { unmount } = setup();

    unmount();

    ['randomModeSelected', 'modeApproved'].forEach(key => {
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  it('should update localStorage if randomModeSelected or modeApproved changed', () => {
    setup();

    expect(localStorage.setItem).toHaveBeenCalledWith('randomModeSelected', true);
    expect(localStorage.setItem).toHaveBeenCalledWith('modeApproved', false);

    const listIcon = screen.getByTestId(/listIcon/i);
    const nextButton = screen.getByTestId(/nextButton/i);

    user.click(listIcon);
    expect(localStorage.setItem).toHaveBeenCalledWith('randomModeSelected', false);

    user.click(nextButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('modeApproved', true);
  });
});

import { clickByTestId, getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import { disableTutorial } from 'redux/actions/settingsActions';
import TestStore from 'test/TestStore';

import RoleDealing from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
  store.dispatch(disableTutorial());

  localStorage.clear();
});

const render = getRenderer(RoleDealing);

describe('<RoleDealing />', () => {
  it('should render with randomModeSelected by default. Changing mode should also change next button text.', () => {
    render();

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
    const { unmount } = render();

    unmount();

    ['randomModeSelected', 'modeApproved'].forEach(key => {
      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  it('should update localStorage if randomModeSelected or modeApproved changed', () => {
    render();

    expect(localStorage.setItem).toHaveBeenCalledWith('randomModeSelected', true);
    expect(localStorage.setItem).toHaveBeenCalledWith('modeApproved', false);

    clickByTestId(/listIcon/i);
    expect(localStorage.setItem).toHaveBeenCalledWith('randomModeSelected', false);

    clickByTestId(/nextButton/i);
    expect(localStorage.setItem).toHaveBeenCalledWith('modeApproved', true);
  });
});

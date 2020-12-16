import ROLE from 'common/playerEnums';
import { getRenderer, screen } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';

import DonTimePage from '../DonTimePage';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const setDonTime = jest.fn();
const setPlayerToKill = jest.fn();
const setSheriffTime = jest.fn();

const render = getRenderer(DonTimePage, { setDonTime, setPlayerToKill, setSheriffTime });

describe('<DonTimePage />', () => {
  it('should show correct sheriff playerNumber', () => {
    store.changeRoles({ playerNumber: 3, role: ROLE.SHERIF });
    render();

    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
});

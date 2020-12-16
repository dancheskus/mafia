import TestStore from 'test/TestStore';
import { getRenderer, screen } from 'helpers/testingHelpers/test-utils';

import SheriffTimePage from '../SheriffTimePage';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const playerToKill = undefined;
const setSheriffTime = jest.fn();

const render = getRenderer(SheriffTimePage, { setSheriffTime, playerToKill });

describe('<SheriffTimePage />', () => {
  it('should show correct sheriff playerNumber', () => {
    store.defaultTestRoles();

    render();

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
});

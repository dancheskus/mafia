import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';

import Voting from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(Voting);

describe('<Voting />', () => {
  it('', () => {});
});

import { addPortal, getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';

import NavBar from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

addPortal();

const render = getRenderer(NavBar);

describe('<NavBar />', () => {
  it('should rendre correct game phase name and day number', () => {
    render();
  });

  it('should notify about music server not working', () => {});

  it('should render player if music is reachable', () => {});

  it('should render player controls on Day', () => {});
});

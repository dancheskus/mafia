import { addPortal, getRenderer } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';

import AudioPlayer from '../AudioPlayer';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

addPortal();

const render = getRenderer(AudioPlayer);

describe('<AudioPlayer />', () => {
  it('should rendre correct game phase name and day number', () => {});

  it('should notify about music server not working', () => {});

  it('should render player if music is reachable', () => {});

  it('should render player controls on Day', () => {});
});

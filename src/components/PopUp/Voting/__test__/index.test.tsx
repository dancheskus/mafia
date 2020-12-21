import { getRenderer, screen, user } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';

import Voting from '..';

let store: TestStore;

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(Voting);

describe('<Voting />', () => {
  it('should render correct amount of active buttons depend on alive players amount', () => {});

  it('should exit to EndOfGame if voting result makes "red <= black"', () => {});

  it('should not render reset voting button on first player, but should render it on next stages', () => {});

  it('should reset voting to initial state W/O car crash', () => {});

  it('should reset voting to initial state W/ car crash', () => {});

  it('should render correct player nubmer in big circle', () => {});

  it('should enable only left amount of votes on last voting screen and diable other buttons. Should render "ЗАВЕРШИТЬ" button on last step', () => {});

  it('should remove initialSelectedNumbers from localStorage on unmount', () => {});

  it('should skip voting if this IS 1st day and only 1 selectedNumber', () => {});

  it('should skip voting if this is NOT 1st day and skipVoting was enabled', () => {});

  it('should render EndOfVoting if voting ended or voting skipped', () => {});

  it('should render CarCrash if carCrash enabled', () => {});

  it('should exit CarCrash if carCrash ended', () => {});

  it('should create new voting list on carCrash exit', () => {});

  it('should render car crash 2d time differently', () => {});

  it('should kill all selected players if killAll was selected', () => {});

  it('should kill player immediately if only 1 player in voting list', () => {});
});

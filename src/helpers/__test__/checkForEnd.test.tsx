import { act } from 'react-dom/test-utils';

import ROLE from 'common/playerEnums';
import { checkForEnd, useCheckForEnd } from 'helpers/checkForEnd';
import repeat from 'helpers/repeat';
import TestStore from 'test/TestStore';
import { getRenderer } from 'helpers/testingHelpers/test-utils';
import { changeGameState } from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';

let store: TestStore;

describe('checkForEnd', () => {
  beforeEach(() => {
    store = new TestStore();
  });

  it('should return "true" if all players are red', () => {
    expect(checkForEnd(store.state.players)).toBe(true);
  });

  it('should return "true" if all players are black', () => {
    repeat(i => store.changeRoles({ role: ROLE.MAFIA, playerNumber: i }), 10);
    expect(checkForEnd(store.state.players)).toBe(true);
  });

  it('should return "false" if "standart case"', () => {
    store.defaultTestRoles();
    expect(checkForEnd(store.state.players)).toBe(false);
  });

  it('should return "true" if "black = red"', () => {
    store.defaultTestRoles().killPlayer(9).killPlayer(8).killPlayer(7).killPlayer(6);
    expect(checkForEnd(store.state.players)).toBe(true);
  });

  it('should return "true" if "black > red"', () => {
    store.defaultTestRoles().killPlayer(9).killPlayer(8).killPlayer(7).killPlayer(6).killPlayer(5);
    expect(checkForEnd(store.state.players)).toBe(true);
  });

  it('should return "true" if "black = 3 && red = 5 && lastRemovedPlayers is array of 2 alive red players"', () => {
    store.defaultTestRoles().killPlayer(9).killPlayer(8).killPlayer(7);
    expect(checkForEnd(store.state.players, [6, 5])).toBe(true);
  });

  it('should return "true" if "black = 3 && red = 4 && lastRemovedPlayers is number of 1 alive red player"', () => {
    store.defaultTestRoles().killPlayer(9).killPlayer(8).killPlayer(7).killPlayer(6);
    expect(checkForEnd(store.state.players, 5)).toBe(true);
  });

  it('should return "true" if "all black players are in lastRemovedPlayers"', () => {
    store.defaultTestRoles();
    expect(checkForEnd(store.state.players, [0, 1, 2])).toBe(true);
  });
});

describe('useCheckForEnd', () => {
  const Component = () => {
    useCheckForEnd();
    return <></>;
  };

  const render = getRenderer(Component);

  beforeEach(() => {
    store = new TestStore();
    store.defaultTestRoles();
  });

  it('should not change phase to endOfGame in the beginning of game', () => {
    render();

    expect(store.dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('should change phase to endOfGame when black = red', () => {
    render();

    repeat(i => {
      // killing last 3 players to make 3 black and 4 red players
      act(() => {
        store.killPlayer(i + 7);
      });
      expect(store.dispatchSpy).toHaveBeenCalledTimes(0);
    }, 3);

    act(() => {
      store.killPlayer(6);
    });

    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.ENDOFGAME }));
  });

  it('should change phase to endOfGame when all black are dead', () => {
    render();

    act(() => {
      store.killPlayer(0).killPlayer(1);
    });

    expect(store.dispatchSpy).toHaveBeenCalledTimes(0);

    act(() => {
      store.killPlayer(2);
    });

    expect(store.dispatchSpy).toHaveBeenCalledWith(changeGameState({ phase: PHASE.ENDOFGAME }));
  });
});

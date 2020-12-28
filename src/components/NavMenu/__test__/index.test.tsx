import { clickByText, getRenderer, screen, user, addPortal, clickButton } from 'helpers/testingHelpers/test-utils';
import TestStore from 'test/TestStore';
import { changeGameState, resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import {
  enableTutorial,
  switchAppMusic,
  switchMafiaTimer,
  switchMultiplePlayerRemove,
  switchSeatAllocator,
  switchTimerSounds,
} from 'redux/actions/settingsActions';
import PHASE from 'common/phaseEnums';

import NavMenu from '..';

let store: TestStore;

addPortal();

beforeEach(() => {
  store = new TestStore();
});

const render = getRenderer(NavMenu);

describe('<NavMenu />', () => {
  it('should start new game', () => {
    render();

    clickByText(/новая игра/i);
    expect(store.dispatchSpy).toHaveBeenCalledWith(resetGameReducer());
    expect(store.dispatchSpy).toHaveBeenCalledWith(resetPlayersReducer());
  });

  it('should start new game after modal ok button', () => {
    store.dispatch(changeGameState({ phase: PHASE.NIGHT }));

    render();

    clickByText(/новая игра/i);
    expect(store.dispatchSpy).not.toHaveBeenCalledWith(resetGameReducer());
    expect(store.dispatchSpy).not.toHaveBeenCalledWith(resetPlayersReducer());

    clickButton(/ок/i);
    expect(store.dispatchSpy).toHaveBeenCalledWith(resetGameReducer());
    expect(store.dispatchSpy).toHaveBeenCalledWith(resetPlayersReducer());
  });

  it('should show settings and hide new game button', () => {
    render();

    expect(screen.getByText(/Раздача номеров в начале игры/i)).not.toBeVisible();

    clickByText(/настройки/i);
    expect(screen.getByText(/новая игра/i)).not.toBeVisible();
    expect(screen.getByText(/Раздача номеров в начале игры/i)).toBeVisible();
  });

  it('should toggle correct settings', () => {
    render();

    clickByText(/настройки/i);

    const allToggles = screen.getAllByText((_, element) => element.style.borderRadius === '15px');

    expect(store.dispatchSpy).not.toHaveBeenCalled();

    user.click(allToggles[0]);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(switchSeatAllocator());

    user.click(allToggles[1]);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(switchAppMusic());

    user.click(allToggles[2]);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(switchTimerSounds());

    user.click(allToggles[3]);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(switchMafiaTimer());

    user.click(allToggles[4]);
    expect(store.dispatchSpy).toHaveBeenLastCalledWith(switchMultiplePlayerRemove());
  });

  it('should start tutorial', () => {
    render();

    clickByText(/настройки/i);
    clickByText(/включить обучение/i);

    expect(store.dispatchSpy).toHaveBeenCalledWith(enableTutorial());
  });
});

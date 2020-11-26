/* eslint-disable no-param-reassign */
import produce from 'immer';

import { TSettingsState } from './types';

const savedSettings = localStorage.settings ? JSON.parse(localStorage.settings) : {};

const initialState: TSettingsState = {
  appMusic: savedSettings.appMusic ?? true,
  timerSounds: savedSettings.timerSounds ?? true,
  mafiaTimer: savedSettings.mafiaTimer ?? true,
  multiplePlayerRemove: savedSettings.multiplePlayerRemove ?? true,
  seatAllocator: savedSettings.seatAllocator ?? true,
  tutorialEnabled: savedSettings.tutorialEnabled ?? true,
};

export default (state = initialState, action: { type: string }) => {
  const newState = produce(state, draft => {
    switch (action.type) {
      case 'SWITCH_APP_MUSIC':
        draft.appMusic = !draft.appMusic;
        return;
      case 'SWITCH_TIMER_SOUNDS':
        draft.timerSounds = !draft.timerSounds;
        return;
      case 'SWITCH_MAFIA_TIMER':
        draft.mafiaTimer = !draft.mafiaTimer;
        return;
      case 'SWITCH_MULTIPLE_PLAYER_REMOVE':
        draft.multiplePlayerRemove = !draft.multiplePlayerRemove;
        return;
      case 'SWITCH_SEAT_ALLOCATOR':
        draft.seatAllocator = !draft.seatAllocator;
        return;
      case 'DISABLE_TUTORIAL':
        draft.tutorialEnabled = false;
        return;
      case 'ENABLE_TUTORIAL':
        draft.tutorialEnabled = true;
    }
  });
  localStorage.setItem('settings', JSON.stringify(newState));
  return newState;
};
/* eslint-disable */

import produce from 'immer';

const initialState = {
  appMusic: true,
  timerSounds: true,
  mafiaTimer: true,
  multiplePlayerRemove: true,
  seatAllocator: true,
};

export default (state = initialState, action, root) =>
  produce(state, draft => {
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
    }
  });

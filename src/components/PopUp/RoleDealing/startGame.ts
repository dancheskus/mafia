import { batch } from 'react-redux';

import PHASE from 'common/phaseEnums';
import { changeGameState, clearSelectedNumbers } from 'redux/actions/gameActions';

export default (dispatch: (dispatchFN: any) => void) => {
  batch(() => {
    dispatch(clearSelectedNumbers());
    dispatch(changeGameState({ phase: PHASE.ZERONIGHT }));
  });
};

import { batch } from 'react-redux';

import { changeGameState, clearSelectedNumbers } from 'redux/actions/gameActions';

export default dispatch => {
  batch(() => {
    dispatch(clearSelectedNumbers());
    dispatch(changeGameState({ phase: 'ZeroNight' }));
  });
};

import { useSelector } from 'react-redux';
import { range } from 'lodash';

import { gameSelector } from 'redux/selectors';

export default () => {
  const { selectedNumbers } = useSelector(gameSelector);
  return range(0, 10).filter(e => !selectedNumbers.includes(e));
};

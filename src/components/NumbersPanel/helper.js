import { useSelector } from 'react-redux';
import { range } from 'lodash';

export const useNotSelectedNumbers = () => {
  const {
    game: { selectedNumbers },
  } = useSelector(state => state);
  return range(0, 10).filter(e => !selectedNumbers.includes(e));
};

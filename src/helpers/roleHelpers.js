import { countBy } from 'lodash';
import { useSelector } from 'react-redux';

import { playersSelector } from 'redux/selectors';

export const playerIsBlack = role => role === 'ДОН' || role === 'МАФИЯ';
export const playerIsRed = role => role === 'МИРНЫЙ' || role === 'ШЕРИФ';

export const getAllAlivePlayers = players => players?.filter(({ isAlive }) => isAlive);
export const getAllDeadPlayers = players => players?.filter(({ isAlive }) => !isAlive);

export const useGetAlivePlayersAmountByColor = color => {
  const players = useSelector(playersSelector);
  return countBy(getAllAlivePlayers(players), ({ role }) => (playerIsBlack(role) ? 'black' : 'red'))[color];
};

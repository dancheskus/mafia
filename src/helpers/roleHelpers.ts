import { countBy } from 'lodash';
import { useSelector } from 'react-redux';

import ROLE from 'common/playerEnums';
import { TPlayersState } from 'redux/reducers/types';
import { playersSelector } from 'redux/selectors';

export const playerIsBlack = (role: ROLE) => role === ROLE.DON || role === ROLE.MAFIA;
export const playerIsRed = (role: ROLE) => role === ROLE.MIRNIJ || role === ROLE.SHERIF;

export const getAllAlivePlayers = (players: TPlayersState) => players?.filter(({ isAlive }) => isAlive);
export const getAllDeadPlayers = (players: TPlayersState) => players?.filter(({ isAlive }) => !isAlive);

export const useGetAlivePlayersAmountByColor = (color: string) => {
  const players = useSelector(playersSelector);
  return countBy(getAllAlivePlayers(players), ({ role }) => (playerIsBlack(role) ? 'black' : 'red'))[color];
};

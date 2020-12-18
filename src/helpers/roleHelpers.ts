import { useSelector } from 'react-redux';

import ROLE from 'common/playerEnums';
import { TPlayersState } from 'redux/reducers/types';
import { playersSelector } from 'redux/selectors';

export const playerIsBlack = (role: ROLE) => role === ROLE.DON || role === ROLE.MAFIA;
export const playerIsRed = (role: ROLE) => role === ROLE.MIRNIJ || role === ROLE.SHERIF;

export const getAllAlivePlayers = (players: TPlayersState) => players?.filter(({ isAlive }) => isAlive);
export const getAllDeadPlayers = (players: TPlayersState) => players?.filter(({ isAlive }) => !isAlive);

export const getAllAlivePlayersByTeam = (players: TPlayersState) => {
  const allAlivePlayers = getAllAlivePlayers(players);

  const black = allAlivePlayers.filter(({ role }) => playerIsBlack(role)).length;
  const red = allAlivePlayers.length - black;

  return { black, red };
};

export function useGetAlivePlayersAmountByTeam(team: 'black' | 'red'): number;
export function useGetAlivePlayersAmountByTeam(team: 'all'): { black: number; red: number };
export function useGetAlivePlayersAmountByTeam(team: 'black' | 'red' | 'all') {
  const players = useSelector(playersSelector);

  const alivePlayersAmountByTeam = getAllAlivePlayersByTeam(players);

  return team === 'all' ? alivePlayersAmountByTeam : alivePlayersAmountByTeam[team];
}

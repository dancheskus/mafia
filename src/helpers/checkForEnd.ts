import { castArray } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PHASE from 'common/phaseEnums';
import { changeGameState } from 'redux/actions/gameActions';
import { TPlayersState } from 'redux/reducers/types';
import { playersSelector } from 'redux/selectors';

import { getAllAlivePlayers, getAllAlivePlayersByTeam } from './roleHelpers';

export const checkForEnd = (players: TPlayersState, lastRemovedPlayer?: number[] | number) => {
  const allAlivePlayers = getAllAlivePlayers(players).filter((_, i) => !castArray(lastRemovedPlayer)?.includes(i));

  const alivePlayersAmountByTeam = getAllAlivePlayersByTeam(allAlivePlayers);

  return alivePlayersAmountByTeam.red <= alivePlayersAmountByTeam.black || !alivePlayersAmountByTeam.black;
};

export const useCheckForEnd = () => {
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkForEnd(players)) dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
  }, [players, dispatch]);
};

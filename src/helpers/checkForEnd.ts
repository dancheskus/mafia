import { countBy } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PHASE from 'common/phaseEnums';
import { changeGameState } from 'redux/actions/gameActions';
import { TPlayersState } from 'redux/reducers/types';
import { playersSelector } from 'redux/selectors';

import { getAllAlivePlayers, playerIsBlack } from './roleHelpers';

const checkForEnd = (players: TPlayersState, lastRemovedPlayer?: number[]) => {
  const allAlivePlayers = countBy(getAllAlivePlayers(players), ({ role }) => (playerIsBlack(role) ? 'black' : 'red'));

  if (lastRemovedPlayer && lastRemovedPlayer[0] >= 0) {
    lastRemovedPlayer.forEach(playerNumber => {
      playerIsBlack(players[playerNumber].role) ? allAlivePlayers.black-- : allAlivePlayers.red--;
    });
  }

  const status = allAlivePlayers.red <= allAlivePlayers.black || !allAlivePlayers.black;

  return { status, allAlivePlayers };
};

export const useCheckForEnd = () => {
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkForEnd(players).status) dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
  }, [players, dispatch]);
};

export default checkForEnd;

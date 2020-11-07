import { countBy } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeGameState } from 'redux/actions/gameActions';
import { playersSelector } from 'redux/selectors';

const checkForEnd = (players, lastRemovedPlayer) => {
  const allAlivePlayers = countBy(
    players.map(({ isAlive, role }) => isAlive && (role === 'ДОН' || role === 'МАФИЯ' ? 'black' : 'red'))
  );

  if (lastRemovedPlayer && lastRemovedPlayer[0] >= 0) {
    lastRemovedPlayer.forEach(playerNumber => {
      const { role } = players[playerNumber];
      role === 'ДОН' || role === 'МАФИЯ' ? (allAlivePlayers.black -= 1) : (allAlivePlayers.red -= 1);
      allAlivePlayers.false += 1;
    });
  }

  return { status: allAlivePlayers.red <= allAlivePlayers.black || !allAlivePlayers.black, allAlivePlayers };
};

export const useCheckForEnd = () => {
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkForEnd(players).status) dispatch(changeGameState({ phase: 'EndOfGame' }));
  }, [players, dispatch]);
};

export default checkForEnd;

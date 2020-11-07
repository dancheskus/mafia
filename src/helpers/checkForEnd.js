import { countBy } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeGameState } from 'redux/actions/gameActions';
import { playersSelector } from 'redux/selectors';

import { playerIsBlack } from './roleHelpers';

const checkForEnd = (players, lastRemovedPlayer) => {
  const allAlivePlayers = countBy(
    players.map(({ isAlive, role }) => isAlive && (playerIsBlack(role) ? 'black' : 'red'))
  );
  // console.log(allAlivePlayers);

  if (lastRemovedPlayer?.[0] >= 0) {
    lastRemovedPlayer.forEach(playerNumber => {
      const { role } = players[playerNumber];
      playerIsBlack(role) ? (allAlivePlayers.black -= 1) : (allAlivePlayers.red -= 1);
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

// КОМПОНЕНТ ДОЛЖЕН ПРИНИМАТЬ:
// 1. список уходящих игроков
// 2. коллбэк уводящий в ночь

import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import Timer from 'components/Timer';
import checkForEnd from 'helpers/checkForEnd';
import { changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import useOnComponentMount from 'helpers/useOnComponentMount';

import { PopUpCircle, PopUpButton } from '../styled-components';

export default ({ listOfPlayers, lastMinuteFor, goToNight }) => {
  const dispatch = useDispatch();
  const players = useSelector(({ players }) => players);
  const killedOnLastMinute = lastMinuteFor.map(plNum => !players[plNum].isAlive);

  const [currentPlayer, setCurrentPlayer] = useState(0);

  useOnComponentMount(() => {
    if (checkForEnd(players, listOfPlayers).status) {
      batch(() => {
        listOfPlayers.map(plNum => dispatch(killPlayer(plNum)));
        dispatch(changeGameState({ phase: 'EndOfGame' }));
      });
    }
  });

  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);

  const lastPlayer = listOfPlayers.length - 1 - currentPlayer === 0;

  return (
    <>
      <PopUpCircle>{listOfPlayers[currentPlayer] + 1}</PopUpCircle>

      <Timer
        key={currentPlayer}
        killedOnLastMinute={killedOnLastMinute[currentPlayer]}
        time={listOfPlayers.length > 1 && 30}
      />

      <PopUpButton color='Voting' onClick={lastPlayer ? goToNight : nextPlayer}>
        {lastPlayer ? 'Ночь' : 'Далее'}
      </PopUpButton>
    </>
  );
};

// КОМПОНЕНТ ДОЛЖЕН ПРИНИМАТЬ:
// 1. список уходящих игроков
// 2. коллбэк уводящий в ночь

import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import useOnMount from 'helpers/useOnMount';
import Timer from 'components/Timer';
import checkForEnd from 'helpers/checkForEnd';
import { changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { gameSelector, playersSelector } from 'redux/selectors';
import { PopUpButton, PopUpCircle } from 'components/PopUp/styled-components';
import PHASE from 'common/phaseEnums';

import ResetButton from '../ResetButton';

interface Props {
  listOfPlayers: number[];
  lastMinuteFor: number[];
  goToNight: () => void;
  resetFn: () => void;
}

export default ({ listOfPlayers, lastMinuteFor, goToNight, resetFn }: Props) => {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const { selectedNumbers } = useSelector(gameSelector);
  const killedOnLastMinute = lastMinuteFor.map(plNum => !players[plNum].isAlive);

  const [currentPlayer, setCurrentPlayer] = useState(0);

  useOnMount(() => {
    if (checkForEnd(players, listOfPlayers).status) {
      batch(() => {
        listOfPlayers.map((plNum: number) => dispatch(killPlayer(plNum)));
        dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
      });
    }
  });

  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);

  const lastPlayer = listOfPlayers.length - 1 - currentPlayer === 0;

  return (
    <>
      {selectedNumbers.length > 1 && <ResetButton onClick={resetFn} />}

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

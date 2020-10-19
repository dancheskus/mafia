import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Timer from 'components/Timer';
import VictimSelector from 'components/common/VictimSelector';

import CarCrashNotification from './CarCrashNotification';
import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';

export default ({ secondTime, closeCarCrash, votingFinishedClicked }) => {
  const {
    players,
    game: { selectedNumbers },
    settings: { multiplePlayerRemove },
  } = useSelector(store => store);

  const [selectedNumber, setSelectedNumber] = useState(null);
  const [notification, setNotification] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const stopVoting = useCallback(() => {
    const alivePlayers = players.filter(({ isAlive }) => isAlive).length;

    votingFinishedClicked(selectedNumber > alivePlayers / 2);
  }, [players, selectedNumber, votingFinishedClicked]);

  useEffect(() => {
    if (secondTime && !multiplePlayerRemove) stopVoting();
  }, [secondTime, multiplePlayerRemove, stopVoting]);

  const onNumberSelected = num => setSelectedNumber(num + 1 === selectedNumber ? null : num + 1);
  const deadPlayers = players.filter(player => !player.isAlive).length;

  if (secondTime)
    return (
      <>
        <PopUpLabel className='h2 text-warning'>Вывести всех выставленных?</PopUpLabel>

        <VictimSelector onNumberSelected={onNumberSelected} votesLeft={9 - deadPlayers} />

        <PopUpButton color='Voting' onClick={stopVoting}>
          Завершить
        </PopUpButton>
      </>
    );

  if (notification) return <CarCrashNotification closeNotification={() => setNotification(false)} />;

  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);
  const lastPlayer = currentPlayer === selectedNumbers.length - 1;

  return (
    <>
      <PopUpCircle>{selectedNumbers[currentPlayer] + 1}</PopUpCircle>

      <Timer time={30} key={currentPlayer} />

      <PopUpButton color='Voting' onClick={lastPlayer ? closeCarCrash : nextPlayer}>
        {lastPlayer ? 'Завершить' : 'Далее'}
      </PopUpButton>
    </>
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Timer from 'components/Timer';
import VictimSelector from 'components/VictimSelector';
import { gameSelector, playersSelector, settingsSelector } from 'redux/selectors';
import { getAllAlivePlayers, getAllDeadPlayers } from 'helpers/roleHelpers';

import CarCrashNotification from './CarCrashNotification';
import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';

interface Props {
  secondTime: boolean;
  closeCarCrash: () => void;
  endVoting: (killAll: boolean) => void;
}

export default function CarCrash({ secondTime, closeCarCrash, endVoting }: Props) {
  const { multiplePlayerRemove } = useSelector(settingsSelector);
  const { selectedNumbers } = useSelector(gameSelector);
  const players = useSelector(playersSelector);

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [notification, setNotification] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const alivePlayers = getAllAlivePlayers(players).length;
  const deadPlayers = getAllDeadPlayers(players).length;

  const stopVoting = useCallback(() => {
    endVoting(selectedNumber! > alivePlayers / 2);
  }, [selectedNumber, endVoting, alivePlayers]);

  useEffect(() => {
    if (secondTime && !multiplePlayerRemove) stopVoting();
  }, [secondTime, multiplePlayerRemove, stopVoting]);

  const onNumberSelected = (num: number) => setSelectedNumber(num + 1 === selectedNumber ? null : num + 1);

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
}

import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'use-timer';
import { Howl } from 'howler';

// @ts-expect-error
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import VictimSelector from 'components/VictimSelector';
import { gameSelector, playersSelector } from 'redux/selectors';
import getFromLocalStorage from 'helpers/getFromLocalStorage';
import { getAllDeadPlayers } from 'helpers/roleHelpers';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import { BottomButtonGroup } from './style';
import ResetButton from './ResetButton';

const stopVotingSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });

interface Props {
  resetVoting: () => void;
  votesPerPlayer: number[];
  setVotesPerPlayer: Dispatch<any>;
  votingFinishedClicked: () => void;
  carCrashClosed: boolean;
}

export default ({ resetVoting, votesPerPlayer, setVotesPerPlayer, votingFinishedClicked, carCrashClosed }: Props) => {
  const players = useSelector(playersSelector);
  const { selectedNumbers } = useSelector(gameSelector);

  const deadPleayersAmount = getAllDeadPlayers(players).length;

  const [avaliableVoters, setAvaliableVoters] = useState(
    getFromLocalStorage('avaliableVoters') ?? 9 - deadPleayersAmount,
  ); // Кол-во живых и не проголосовавших
  const [currentPlayer, setCurrentPlayer] = useState(getFromLocalStorage('currentPlayer') ?? 0); // За кого голосуют в данный момент (от 0 до кол-во выставленных)
  const [buttonOncePressed, setButtonOncePressed] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentPlayer', currentPlayer);
    localStorage.setItem('avaliableVoters', avaliableVoters);

    return () => {
      localStorage.removeItem('currentPlayer');
      localStorage.removeItem('avaliableVoters');
    };
  }, [currentPlayer, avaliableVoters]);

  const resetState = () => {
    setAvaliableVoters(9 - deadPleayersAmount);
    setCurrentPlayer(0);
    setButtonOncePressed(false);
  };
  const firstPlayer = selectedNumbers[currentPlayer] === selectedNumbers[0];
  const lastPlayer = currentPlayer === selectedNumbers.length - 1;
  const votesAgainstCurrentPlayer = votesPerPlayer[currentPlayer];

  const { start: startVotingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 1400,
    onTimeOver: () => stopVotingSound.play('oneSec'),
  });

  const onNumberSelected = (num: number) => {
    const arr = [...votesPerPlayer];
    arr[currentPlayer] = votesAgainstCurrentPlayer === num + 1 ? 0 : num + 1;
    setVotesPerPlayer(arr);
  };

  const countAvaliableVoters = () => {
    const newAvaliableVoters = votesPerPlayer.length >= 1 ? 9 - votesPerPlayer.reduce((a, b) => a + b) : 9;
    setAvaliableVoters(newAvaliableVoters - deadPleayersAmount);
  };

  const nextButtonClicked = () => {
    const votingPlayersAmount = selectedNumbers.length;
    const votersLeft = avaliableVoters - votesAgainstCurrentPlayer + 1;

    countAvaliableVoters();
    setButtonOncePressed(false);

    if (currentPlayer < votingPlayersAmount - 1) {
      // Если НЕ последний игрок, увеличиваем игрока на 1 и вычисляем оставшееся кол-во рук. Если руки закончились, завершаем голосование.
      if (votersLeft === 0) return votingFinishedClicked();
      setCurrentPlayer(currentPlayer + 1);
    }

    if (votingPlayersAmount - 2 === currentPlayer) {
      // Если последний игрок, в него голосуют оставшиеся руки минус мертвые игроки
      const arr = [...votesPerPlayer];
      arr[currentPlayer + 1] = votersLeft;
      setVotesPerPlayer(arr);
    }
  };

  const timerClicked = () => {
    if (timerStatus === 'RUNNING') return;

    !buttonOncePressed && setButtonOncePressed(true);
    startVotingTimer();
  };

  return (
    <>
      {(!firstPlayer || carCrashClosed) && (
        <ResetButton
          onClick={() => {
            resetState();
            resetVoting();
          }}
        />
      )}

      {carCrashClosed && <PopUpLabel className='h2'>Повторное голосование</PopUpLabel>}

      <PopUpCircle mini={carCrashClosed}>{selectedNumbers[currentPlayer] + 1 || null}</PopUpCircle>

      <VictimSelector
        lastPlayer={lastPlayer} // для автоматической подсветки при последнем игроке
        votesLeft={avaliableVoters} // для disabled кнопки
        key={currentPlayer} // чтобы перерендеривался каждый раз
        onNumberSelected={onNumberSelected}
        selectedNumber={votesAgainstCurrentPlayer - 1}
      />

      <BottomButtonGroup buttonOncePressed={buttonOncePressed}>
        <PopUpButton light color='Voting' onClick={timerClicked}>
          таймер
        </PopUpButton>

        <PopUpButton color='Voting' onClick={lastPlayer ? votingFinishedClicked : nextButtonClicked}>
          {lastPlayer ? 'Завершить' : 'Далее'}
        </PopUpButton>
      </BottomButtonGroup>
    </>
  );
};

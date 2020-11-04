import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'use-timer';
import { Howl } from 'howler';

import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import VictimSelector from 'components/VictimSelector';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import { BottomButtonGroup } from './style';
import ResetButton from './ResetButton';

const stopVotingSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });

export default ({ resetVoting, votesPerPlayer, setVotesPerPlayer, votingFinishedClicked, carCrashClosed }) => {
  const {
    players,
    game: { selectedNumbers },
  } = useSelector(store => store);

  const deadPleayersAmount = players.filter(({ isAlive }) => !isAlive).length;

  const [avaliableVoters, setAvaliableVoters] = useState(9 - deadPleayersAmount); // Кол-во живых и не проголосовавших
  const [currentPlayer, setCurrentPlayer] = useState(0); // За кого голосуют в данный момент (от 0 до кол-во выставленных)
  const [buttonOncePressed, setButtonOncePressed] = useState(false);

  const resetState = () => {
    setAvaliableVoters(9 - deadPleayersAmount);
    setCurrentPlayer(0);
    setButtonOncePressed(false);
  };

  const lastPlayer = currentPlayer === selectedNumbers.length - 1;

  const { start: startVotingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 2000,
    onTimeOver: () => stopVotingSound.play('oneSec'),
  });

  const onNumberSelected = num => {
    const arr = [...votesPerPlayer];
    arr[currentPlayer] = votesPerPlayer[currentPlayer] === num + 1 ? null : num + 1;
    setVotesPerPlayer(arr);
  };

  const countAvaliableVoters = () => {
    const avaliableVoters = votesPerPlayer.length >= 1 ? 9 - votesPerPlayer.reduce((a, b) => a + b) : 9;
    setAvaliableVoters(avaliableVoters - deadPleayersAmount);
  };

  const nextButtonClicked = () => {
    const votingPlayersAmount = selectedNumbers.length;
    const votersLeft = avaliableVoters - votesPerPlayer[currentPlayer] + 1;

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
      <ResetButton
        onClick={() => {
          resetState();
          resetVoting();
        }}
      />

      {carCrashClosed && <PopUpLabel className='h2'>Повторное голосование</PopUpLabel>}

      <PopUpCircle mini={carCrashClosed}>{selectedNumbers[currentPlayer] + 1 || null}</PopUpCircle>

      <VictimSelector
        lastPlayer={lastPlayer} // для автоматической подсветки при последнем игроке
        votesLeft={avaliableVoters} // для disabled кнопки
        key={currentPlayer} // чтобы перерендеривался каждый раз
        onNumberSelected={onNumberSelected}
      />

      <BottomButtonGroup buttonOncePressed={buttonOncePressed}>
        <PopUpButton color='Voting' onClick={timerClicked}>
          2 сек
        </PopUpButton>

        <PopUpButton color='Voting' onClick={lastPlayer ? votingFinishedClicked : nextButtonClicked}>
          {lastPlayer ? 'Завершить' : 'Далее'}
        </PopUpButton>
      </BottomButtonGroup>
    </>
  );
};

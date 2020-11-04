import React, { useEffect, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Howl } from 'howler';
import { useTimer } from 'use-timer';

import { clearSelectedNumbers, addToSelectedNumbers, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';
import VictimSelector from 'components/VictimSelector';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import EndOfVoting from './EndOfVoting';
import CarCrash from './CarCrash';
import ResetButton from './ResetButton';
import { BottomButtonGroup } from './style';

const stopVotingSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });

export default () => {
  const dispatch = useDispatch();
  const {
    players,
    game: {
      selectedNumbers,
      skipVoting,
      gameState: { dayNumber },
    },
  } = useSelector(store => store);

  const initialState = {
    votesPerPlayer: Array(selectedNumbers.length).fill(0), // Кол-во проголосовавших за каждого игрока
    avaliableVoters: 9 - players.filter(({ isAlive }) => !isAlive).length, // Кол-во живых и не проголосовавших
    currentPlayer: 0, // За кого голосуют в данный момент (от 0 до кол-во выставленных)
    carCrash: false, // Стадия автокатастрофы. 0 - нет. 1 - переголосовка. 2 - Повторная ничья. НУЖНО ПРОВЕРИТЬ, ИСПОЛЬЗУЕТСЯ ЛИ 2 УРОВЕНЬ.
    carCrashClosed: false, // true, после первой автокатастрофы
    endOfVoting: false,
    lastMinuteFor: [], // Игрок(и), которых выводят из города
    buttonOncePressed: false,
  };

  const { current: initialSelectedNumbers } = useRef(selectedNumbers);

  const [votesPerPlayer, setVotesPerPlayer] = useState(initialState.votesPerPlayer);
  const [avaliableVoters, setAvaliableVoters] = useState(initialState.avaliableVoters);
  const [currentPlayer, setCurrentPlayer] = useState(initialState.currentPlayer);
  const [carCrash, setCarCrash] = useState(initialState.carCrash);
  const [carCrashClosed, setCarCrashClosed] = useState(initialState.carCrashClosed);
  const [endOfVoting, setEndOfVoting] = useState(initialState.endOfVoting);
  const [lastMinuteFor, setLastMinuteFor] = useState(initialState.lastMinuteFor);
  const [buttonOncePressed, setButtonOncePressed] = useState(initialState.buttonOncePressed);

  const resetState = stateToChange => {
    setVotesPerPlayer(stateToChange?.votesPerPlayer ?? initialState.votesPerPlayer);
    setAvaliableVoters(stateToChange?.avaliableVoters ?? initialState.avaliableVoters);
    setCurrentPlayer(stateToChange?.currentPlayer ?? initialState.currentPlayer);
    setCarCrash(stateToChange?.carCrash ?? initialState.carCrash);
    setCarCrashClosed(stateToChange?.carCrashClosed ?? initialState.carCrashClosed);
    setEndOfVoting(stateToChange?.endOfVoting ?? initialState.endOfVoting);
    setLastMinuteFor(stateToChange?.lastMinuteFor ?? initialState.lastMinuteFor);
    setButtonOncePressed(stateToChange?.buttonOncePressed ?? initialState.buttonOncePressed);
  };

  const { start: startVotingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 2000,
    onTimeOver: () => stopVotingSound.play('oneSec'),
  });

  useEffect(() => {
    // При обновлении компонента, при необходимых условиях, завершаем игру
    checkForEnd(players).status && dispatch(changeGameState({ phase: 'EndOfGame' }));
  });

  const getNewVotingList = () => {
    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в одного игрока
    const newVotingList = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    return newVotingList;
  };

  const votingFinishedClicked = killAll => {
    const newVotingList = getNewVotingList();

    if (newVotingList.length === 1) {
      // Если остался 1 игрок, то он умирает
      setEndOfVoting(true);
      setLastMinuteFor(lastMinuteFor.concat(newVotingList[0]));
    }

    // УБИЙСТВО ВСЕХ ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === true) {
      setEndOfVoting(true);
      setLastMinuteFor(lastMinuteFor.concat(selectedNumbers));
    }

    // УБИЙСТВО НИКОГО ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === false) {
      setEndOfVoting(true);
      setLastMinuteFor([]);
      return;
    }

    // ВКЛЮЧЕНИЕ АВТОКАТАСТРОФЫ
    if (newVotingList.length > 1) {
      // Если выставлено больше 2 игроков
      if (!carCrashClosed) {
        batch(() => {
          // Первый раз одинаковое кол-во голосов
          dispatch(clearSelectedNumbers());
          newVotingList.map(num => dispatch(addToSelectedNumbers(num)));
        });
      }
      setCarCrash(true);
    }
  };

  useEffect(() => {
    // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование, заканчиваем голосование убивая единственного выставленного игрока
    if (dayNumber > 1 && selectedNumbers.length === 1 && !skipVoting) votingFinishedClicked();

    if ((dayNumber === 1 && selectedNumbers.length === 1) || skipVoting) setEndOfVoting(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      const numberOfVotedOutPlayersWithFourthFoul = lastMinuteFor.filter(plNum => !players[plNum].isAlive).length;

      if (skipVoting && lastMinuteFor.length !== 0) {
        for (let i = 0; i < numberOfVotedOutPlayersWithFourthFoul; i++) dispatch(skipVotingDec());
      }
    };
  });

  const onNumberSelected = num => {
    const arr = [...votesPerPlayer];
    arr[currentPlayer] = votesPerPlayer[currentPlayer] === num + 1 ? null : num + 1;
    setVotesPerPlayer(arr);
  };

  const closeCarCrash = () => resetState({ carCrashClosed: true });

  const countAvaliableVoters = () => {
    const deadPlayers = players.filter(({ isAlive }) => !isAlive).length;
    const avaliableVoters = votesPerPlayer.length >= 1 ? 9 - votesPerPlayer.reduce((a, b) => a + b) : 9;

    setAvaliableVoters(avaliableVoters - deadPlayers);
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

  const resetVoting = () => {
    if (window.confirm('Сбросить голосование?')) {
      resetState();

      batch(() => {
        dispatch(clearSelectedNumbers());
        initialSelectedNumbers.forEach(num => dispatch(addToSelectedNumbers(num)));
      });
    }
  };

  const lastPlayer = currentPlayer === selectedNumbers.length - 1;

  if (endOfVoting || skipVoting)
    return (
      <EndOfVoting
        resetFn={resetVoting}
        votingSkipped={(skipVoting && lastMinuteFor.length === 0) || (dayNumber === 1 && selectedNumbers.length === 1)}
        lastMinuteFor={lastMinuteFor}
      />
    );

  if (carCrash)
    return (
      <>
        <ResetButton onClick={resetVoting} />

        <CarCrash
          closeCarCrash={closeCarCrash}
          secondTime={carCrashClosed}
          votingFinishedClicked={votingFinishedClicked}
        />
      </>
    );

  return (
    <>
      <ResetButton onClick={resetVoting} />

      {carCrashClosed && <PopUpLabel className='h2'>Повторное голосование</PopUpLabel>}

      <PopUpCircle mini={carCrashClosed}>{selectedNumbers[currentPlayer] + 1 || null}</PopUpCircle>

      <VictimSelector
        lastPlayer={lastPlayer} // для автоматической подсветки при последнем игроке
        votesLeft={avaliableVoters} // для disabled кнопки
        key={currentPlayer} // чтобы перерендеривался каждый раз
        onNumberSelected={onNumberSelected} // callback
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

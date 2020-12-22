import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from 'helpers/localStorageHelpers';
import useOnMount from 'helpers/useOnMount';
import { clearSelectedNumbers, addToSelectedNumbers, skipVotingDisable } from 'redux/actions/gameActions';
import { useCheckForEnd } from 'helpers/checkForEnd';
import useCustomRef from 'helpers/useCustomRef';
import useOnUnmount from 'helpers/useOnUnmount';
import { gameSelector, playersSelector } from 'redux/selectors';

import EndOfVoting from './EndOfVoting';
import CarCrash from './CarCrash';
import ResetButton from './ResetButton';
import StandartVoting from './StandartVoting';

const getNewVotesArray = (selectedNumbers: number[]) => Array(selectedNumbers.length).fill(0);

export default function Voting() {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const {
    selectedNumbers,
    skipVoting,
    gameState: { dayNumber },
  } = useSelector(gameSelector);

  const [initialSelectedNumbers] = useCustomRef<number[]>(
    getFromLocalStorage('initialSelectedNumbers') ?? selectedNumbers,
  );
  const initialVotesPerPlayer = getNewVotesArray(initialSelectedNumbers);

  const [votesPerPlayer, setVotesPerPlayer] = useState<number[]>(
    getFromLocalStorage('votesPerPlayer') ?? getNewVotesArray(selectedNumbers),
  ); // Кол-во проголосовавших за каждого игрока
  const [isCarCrash, setIsCarCrash] = useState<boolean>(getFromLocalStorage('isCarCrash') ?? false); // Стадия автокатастрофы. 0 - нет. 1 - переголосовка. 2 - Повторная ничья. НУЖНО ПРОВЕРИТЬ, ИСПОЛЬЗУЕТСЯ ЛИ 2 УРОВЕНЬ.
  const [isCarCrashClosed, setIsCarCrashClosed] = useState<boolean>(getFromLocalStorage('isCarCrashClosed') ?? false); // true, после первой автокатастрофы
  const [isEndOfVoting, setIsEndOfVoting] = useState<boolean>(getFromLocalStorage('isEndOfVoting') ?? false);
  const [lastMinuteFor, setLastMinuteFor] = useState<number[]>(getFromLocalStorage('lastMinuteFor') ?? []); // Игрок(и), которых выводят из города

  const resetState = (replaceState?: { carCrashClosed: boolean }) => {
    setVotesPerPlayer(initialVotesPerPlayer);
    setIsCarCrash(false);
    setIsCarCrashClosed(replaceState?.carCrashClosed ?? false);
    setIsEndOfVoting(false);
    setLastMinuteFor([]);
  };

  useEffect(() => {
    addToLocalStorage({ isCarCrashClosed, isCarCrash, votesPerPlayer, isEndOfVoting, lastMinuteFor });

    return () => {
      removeFromLocalStorage(['isCarCrashClosed', 'isCarCrash', 'votesPerPlayer', 'isEndOfVoting', 'lastMinuteFor']);
    };
  }, [isCarCrashClosed, isCarCrash, votesPerPlayer, isEndOfVoting, lastMinuteFor]);

  useCheckForEnd();

  const getNewVotingList = () => {
    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в одного игрока
    const newVotingList: number[] = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    return newVotingList;
  };

  const enableCarCrash = (listOfPlayers: number[]) => {
    // Если выставлено больше 2 игроков
    if (!isCarCrashClosed) {
      batch(() => {
        // Первый раз одинаковое кол-во голосов
        dispatch(clearSelectedNumbers());
        listOfPlayers.map(num => dispatch(addToSelectedNumbers(num)));
      });
    }
    setIsCarCrash(true);
  };

  const endVoting = (killAll?: boolean) => {
    const newVotingList = getNewVotingList();

    if (newVotingList.length === 1) {
      // Если остался 1 игрок, то он умирает
      setIsEndOfVoting(true);
      !lastMinuteFor.length && setLastMinuteFor(lastMinuteFor.concat(newVotingList[0]));
    }

    // УБИЙСТВО ВСЕХ ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll) {
      setIsEndOfVoting(true);
      setLastMinuteFor(lastMinuteFor.concat(selectedNumbers));
    }

    // УБИЙСТВО НИКОГО ПОСЛЕ АВТОКАТАСТРОФЫ
    if (!killAll) {
      setIsEndOfVoting(true);
      setLastMinuteFor([]);
      return;
    }

    // ВКЛЮЧЕНИЕ АВТОКАТАСТРОФЫ
    if (newVotingList.length > 1) enableCarCrash(newVotingList);
  };

  useOnMount(() => {
    addToLocalStorage({ initialSelectedNumbers });

    // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование, заканчиваем голосование убивая единственного выставленного игрока
    if (dayNumber > 1 && selectedNumbers.length === 1 && !skipVoting) endVoting();

    if ((dayNumber === 1 && selectedNumbers.length === 1) || skipVoting) setIsEndOfVoting(true);
  });

  useOnUnmount(() => {
    removeFromLocalStorage('initialSelectedNumbers');

    dispatch(clearSelectedNumbers()); // Это нужно, чтобы не показывать кого убили, если конец игры, т.к это голосование.

    const numberOfVotedOutPlayersWithFourthFoul = lastMinuteFor.filter(plNum => !players[plNum].isAlive).length;

    if (skipVoting && lastMinuteFor.length !== 0) {
      for (let i = 0; i < numberOfVotedOutPlayersWithFourthFoul; i++) dispatch(skipVotingDisable());
    }
  });

  const resetVoting = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Сбросить голосование?')) {
      resetState();

      batch(() => {
        dispatch(clearSelectedNumbers());
        initialSelectedNumbers.forEach(num => dispatch(addToSelectedNumbers(num)));
      });
    }
  };

  if (isEndOfVoting || skipVoting)
    return (
      <EndOfVoting
        resetFn={resetVoting}
        votingSkipped={(skipVoting && lastMinuteFor.length === 0) || (dayNumber === 1 && selectedNumbers.length === 1)}
        lastMinuteFor={lastMinuteFor}
      />
    );

  if (isCarCrash)
    return (
      <>
        <ResetButton onClick={resetVoting} />

        <CarCrash
          closeCarCrash={() => {
            resetState({ carCrashClosed: true });
            setVotesPerPlayer(getNewVotesArray(selectedNumbers));
          }}
          secondTime={isCarCrashClosed}
          endVoting={endVoting}
        />
      </>
    );

  return (
    <StandartVoting
      votesPerPlayer={votesPerPlayer}
      setVotesPerPlayer={setVotesPerPlayer}
      endVoting={endVoting}
      resetVoting={resetVoting}
      isCarCrashClosed={isCarCrashClosed}
    />
  );
}

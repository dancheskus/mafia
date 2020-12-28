import { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from 'helpers/localStorageHelpers';
import useOnMount from 'helpers/useOnMount';
import { clearSelectedNumbers, addToSelectedNumbers } from 'redux/actions/gameActions';
import { useCheckForEnd } from 'helpers/checkForEnd';
import useCustomRef from 'helpers/useCustomRef';
import useOnUnmount from 'helpers/useOnUnmount';
import { gameSelector, settingsSelector } from 'redux/selectors';

import EndOfVoting from './EndOfVoting';
import CarCrash from './CarCrash';
import ResetButton from './ResetButton';
import StandartVoting from './StandartVoting';

const getNewVotesArray = (selectedNumbers: number[]) => Array(selectedNumbers.length).fill(0);

export default function Voting() {
  const dispatch = useDispatch();
  const { multiplePlayerRemove } = useSelector(settingsSelector);
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
  const [isCarCrashOnceClosed, setIsCarCrashOnceClosed] = useState<boolean>(
    getFromLocalStorage('isCarCrashOnceClosed') ?? false,
  ); // true, после первой автокатастрофы
  const [isEndOfVoting, setIsEndOfVoting] = useState<boolean>(getFromLocalStorage('isEndOfVoting') ?? false);
  const [lastMinuteFor, setLastMinuteFor] = useState<number[]>(getFromLocalStorage('lastMinuteFor') ?? []); // Игрок(и), которых выводят из города

  const resetState = (replaceState?: { isCarCrashOnceClosed: boolean }) => {
    setVotesPerPlayer(initialVotesPerPlayer);
    setIsCarCrash(false);
    setIsCarCrashOnceClosed(replaceState?.isCarCrashOnceClosed ?? false);
    setIsEndOfVoting(false);
    setLastMinuteFor([]);
  };

  useEffect(() => {
    addToLocalStorage({ isCarCrashOnceClosed, isCarCrash, votesPerPlayer, isEndOfVoting, lastMinuteFor });

    return () => {
      removeFromLocalStorage([
        'isCarCrashOnceClosed',
        'isCarCrash',
        'votesPerPlayer',
        'isEndOfVoting',
        'lastMinuteFor',
      ]);
    };
  }, [isCarCrashOnceClosed, isCarCrash, votesPerPlayer, isEndOfVoting, lastMinuteFor]);

  useOnMount(() => {
    addToLocalStorage({ initialSelectedNumbers });

    // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование, заканчиваем голосование убивая единственного выставленного игрока
    if (dayNumber > 1 && selectedNumbers.length === 1 && !skipVoting) endVoting();

    if ((dayNumber === 1 && selectedNumbers.length === 1) || skipVoting) setIsEndOfVoting(true);
  });

  useOnUnmount(() => {
    removeFromLocalStorage('initialSelectedNumbers');

    dispatch(clearSelectedNumbers()); // Это нужно, чтобы не показывать кого убили, если конец игры, т.к это голосование.
  });

  useCheckForEnd();

  const enableCarCrash = (newVotingList: number[]) => {
    setIsCarCrash(true);

    if (isCarCrashOnceClosed) return; // Если CarCrash уже выполнялся и был закрыт, дальнейшее не выполнять

    batch(() => {
      dispatch(clearSelectedNumbers());
      newVotingList.map(num => dispatch(addToSelectedNumbers(num)));
    });
  };

  const endCarCrash = (killAll: boolean) => {
    // убийство ВСЕХ или НИКОГО после автокатастрофы
    setLastMinuteFor(killAll ? lastMinuteFor.concat(selectedNumbers) : []);
    setIsEndOfVoting(true);
  };

  const getNewVotingList = () => {
    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в одного игрока
    const newVotingList: number[] = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    return newVotingList;
  };

  const endVoting = () => {
    const newVotingList = getNewVotingList();

    if (newVotingList.length === 1) {
      // При старте или после голосования остался 1 кандидат
      setIsEndOfVoting(true);
      !lastMinuteFor.length && setLastMinuteFor(lastMinuteFor.concat(newVotingList[0]));
    } else {
      // Если выставлено больше 2 кандидатов, включаем автокатастрофу
      if (isCarCrashOnceClosed && !multiplePlayerRemove) return setIsEndOfVoting(true);
      enableCarCrash(newVotingList);
    }
  };

  const resetVoting = () => {
    resetState();

    batch(() => {
      dispatch(clearSelectedNumbers());
      initialSelectedNumbers.forEach(num => dispatch(addToSelectedNumbers(num)));
    });
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
            resetState({ isCarCrashOnceClosed: true });
            setVotesPerPlayer(getNewVotesArray(selectedNumbers));
          }}
          isSecondTime={isCarCrashOnceClosed}
          endCarCrash={endCarCrash}
        />
      </>
    );

  return (
    <StandartVoting
      votesPerPlayer={votesPerPlayer}
      setVotesPerPlayer={setVotesPerPlayer}
      endVoting={endVoting}
      resetVoting={resetVoting}
      isCarCrashOnceClosed={isCarCrashOnceClosed}
    />
  );
}

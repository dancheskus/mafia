import { useEffect, useState } from 'react';
import { shuffle, range, random } from 'lodash';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useTimer } from 'use-timer';
import { useTranslation } from 'react-i18next';

import { addToSelectedNumbers, clearSelectedNumbers, changeGameState } from 'redux/actions/gameActions';
import useOnMount from 'helpers/useOnMount';
import { gameSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import { PopUpButton } from '../styled-components';
import BigCircle from './style';

const getShuffledNumbers = () => shuffle(range(0, 10));

export default function SeatAllocator() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { selectedNumbers } = useSelector(gameSelector);

  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [seats, setSeats] = useState(getShuffledNumbers());

  const delayAfterResultTimer = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => setRandomNumber(seats.length ? null : randomNumber),
  });

  const randomAnimationTimer = useTimer({
    initialTime: 20,
    endTime: 0,
    interval: 40,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      const seatsArrCopy = seats;
      const newRandomNumber = seatsArrCopy.pop()!;

      setSeats(seatsArrCopy);
      setRandomNumber(newRandomNumber + 1);

      dispatch(addToSelectedNumbers(newRandomNumber));

      delayAfterResultTimer.start();
    },
    onTimeUpdate: () => {
      if (randomAnimationTimer.status === 'STOPPED') return;

      // Just for animation. No real meaning of these numbers
      setRandomNumber(random(1, 10));
    },
  });

  const resetSeatAllocator = () => {
    setSeats(getShuffledNumbers());
    setRandomNumber(null);
  };

  useOnMount(() => dispatch(clearSelectedNumbers()));

  useEffect(() => {
    // If "Start new game" was pressed before unmounting this component this should reset component state
    if (selectedNumbers.length) return;

    if (seats.length < 10 || !seats.length) resetSeatAllocator();
  }, [selectedNumbers]); // eslint-disable-line react-hooks/exhaustive-deps

  const startPlaying = () => {
    batch(() => {
      dispatch(changeGameState({ phase: PHASE.ROLEDEALING }));
      dispatch(clearSelectedNumbers());
    });
  };

  const timersAreRunning = randomAnimationTimer.status === 'RUNNING' || delayAfterResultTimer.status === 'RUNNING';

  return (
    <>
      <BigCircle
        data-testid='randomNumberButton'
        className='d-flex justify-content-center align-items-center seat-allocator-big-circle'
        onClick={randomAnimationTimer.start}
        number={!!randomNumber}
        disabled={timersAreRunning || !seats.length}
      >
        {randomNumber || t('pressButton')}
      </BigCircle>

      <PopUpButton color={PHASE.SEATALLOCATOR} onClick={startPlaying} className='seat-allocator-popup-button'>
        {seats.length ? t('skipButton') : t('nextButton')}
      </PopUpButton>
    </>
  );
}

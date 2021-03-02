import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Timer from 'components/Timer';
import VictimSelector from 'components/VictimSelector';
import { gameSelector, playersSelector } from 'redux/selectors';
import { getAllAlivePlayers, getAllDeadPlayers } from 'helpers/roleHelpers';

import CarCrashNotification from './CarCrashNotification';
import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';

interface Props {
  isSecondTime: boolean;
  closeCarCrash: () => void;
  endCarCrash: (killAll: boolean) => void;
}

export default function CarCrash({ isSecondTime, closeCarCrash, endCarCrash }: Props) {
  const { t } = useTranslation(['common', 'voting']);
  const { selectedNumbers } = useSelector(gameSelector);
  const players = useSelector(playersSelector);

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [notification, setNotification] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const alivePlayers = getAllAlivePlayers(players).length;
  const deadPlayers = getAllDeadPlayers(players).length;

  const onNumberSelected = (num: number) => setSelectedNumber(num + 1 === selectedNumber ? null : num + 1);

  if (isSecondTime)
    return (
      <>
        <PopUpLabel className='h2 text-warning'>{t('voting:carCrash.withDrawAll')}</PopUpLabel>

        <VictimSelector onNumberSelected={onNumberSelected} votesLeft={9 - deadPlayers} />

        <PopUpButton color='Voting' onClick={() => endCarCrash(selectedNumber! > alivePlayers / 2)}>
          {t('finishButton')}
        </PopUpButton>
      </>
    );

  if (notification) return <CarCrashNotification closeNotification={() => setNotification(false)} />;

  const lastPlayer = currentPlayer === selectedNumbers.length - 1;
  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);

  return (
    <>
      <PopUpCircle>{selectedNumbers[currentPlayer] + 1}</PopUpCircle>

      <Timer time={30} key={currentPlayer} />

      <PopUpButton color='Voting' onClick={lastPlayer ? closeCarCrash : nextPlayer}>
        {lastPlayer ? t('finishButton') : t('nextButton')}
      </PopUpButton>
    </>
  );
}

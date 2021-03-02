import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { TargetIcon, NextIcon } from 'icons/svgIcons';
import { killPlayer } from 'redux/actions/playersActions';
import { changeGameState, addKilledAtNightPlayer } from 'redux/actions/gameActions';
import { checkForEnd } from 'helpers/checkForEnd';
import { gameSelector, playersSelector } from 'redux/selectors';
import { playerIsBlack } from 'helpers/roleHelpers';
import PHASE from 'common/phaseEnums';

import { BackButton, BlackTeamPlayers, Target } from './style';
import { PopUpButton, PopUpLabel } from '../styled-components';

interface Props {
  setSheriffTime: Dispatch<SetStateAction<boolean>>;
  playerToKill: number | undefined;
}

export default function SheriffTimePage({ setSheriffTime, playerToKill }: Props) {
  const { t } = useTranslation(['common', 'night']);
  const dispatch = useDispatch();
  const { dayNumber } = useSelector(gameSelector).gameState;
  const players = useSelector(playersSelector);

  const goToDayPressed = () => {
    playerToKill! >= 0 && dispatch(addKilledAtNightPlayer(playerToKill!));

    if (checkForEnd(players, playerToKill)) {
      // Если мы сейчас перейдем на окончание игры, то убиваем игрока перед последним экраном
      playerToKill! >= 0 && dispatch(killPlayer(playerToKill!));

      dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
    } else {
      // Если переходим в день то убъем игрока после его последней минуты в дневном экране
      dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: dayNumber + 1 }));
    }
  };

  const allBlackPlayerNumbers = players.flatMap(({ role }, i) => (playerIsBlack(role) ? i : []));

  return (
    <>
      <BackButton data-testid='backToDonTimeButton' onClick={() => setSheriffTime(false)}>
        <NextIcon />
      </BackButton>

      <PopUpLabel color='Night' className='h2'>
        {t('night:sheriffSearchesMafia')}
      </PopUpLabel>

      <BlackTeamPlayers>
        {allBlackPlayerNumbers.map(plNum => (
          <Target key={plNum}>
            <TargetIcon size='100%' />

            <span>{plNum + 1}</span>
          </Target>
        ))}
      </BlackTeamPlayers>

      <PopUpButton onClick={goToDayPressed} color='Night'>
        {t('dayButton')}
      </PopUpButton>
    </>
  );
}

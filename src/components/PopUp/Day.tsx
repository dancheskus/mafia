import { batch, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useOnMount from 'helpers/useOnMount';
import { closePopup, openPopup, changeGameState, removeKilledAtNightPlayer } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import Timer from 'components/Timer';
import useCustomRef from 'helpers/useCustomRef';
import useOnUnmount from 'helpers/useOnUnmount';
import { gameSelector, playersSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';
import { addToLocalStorage, removeFromLocalStorage } from 'helpers/localStorageHelpers';

import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';

export default function Day() {
  const { t } = useTranslation(['common', 'day']);
  const {
    activePlayer,
    killedAtNightPlayer,
    gameState: { dayNumber },
  } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  const [killedPlayerRef] = useCustomRef(killedAtNightPlayer ?? localStorage.killedAtNightPlayer);
  const playerShouldBeKilled = Number.isInteger(killedPlayerRef);

  useOnMount(() => {
    playerShouldBeKilled && addToLocalStorage({ killedPlayerRef });
  });

  useOnUnmount(() => {
    removeFromLocalStorage('killedAtNightPlayer');
    batch(() => {
      dispatch(removeKilledAtNightPlayer());
      dispatch(openPopup());
    });

    // Component is unmounting when Day ended and Night is activated
  });

  const goToDay = () => {
    batch(() => {
      dispatch(closePopup());
      playerShouldBeKilled && dispatch(killPlayer(killedPlayerRef));
      if (killedPlayerRef === activePlayer) dispatch(changeGameState({ phase: PHASE.DAY, dayNumber }));
    });
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  return (
    <>
      {playerShouldBeKilled ? (
        <>
          <PopUpLabel className='h1'>{t('day:killed')}</PopUpLabel>

          <PopUpCircle mini color='Night'>
            {killedPlayerRef + 1}
          </PopUpCircle>

          <Timer killedOnLastMinute={!players[killedPlayerRef].isAlive} />
        </>
      ) : (
        <>
          <PopUpLabel className='h1'>{t('day:noKills')}</PopUpLabel>

          <PopUpCircle>
            <CylinderIcon fill={colors.Day.popupNightResult} size='80%' />
          </PopUpCircle>
        </>
      )}

      <PopUpButton color='Day' onClick={goToDay}>
        {t('closeButton')}
      </PopUpButton>
    </>
  );
}

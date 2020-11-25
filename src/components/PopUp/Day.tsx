import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

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

import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';

export default () => {
  const {
    popupOpened,
    activePlayer,
    killedAtNightPlayer,
    gameState: { dayNumber },
  } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  const [killedPlayerRef] = useCustomRef(killedAtNightPlayer ?? localStorage.killedAtNightPlayer);
  const playerShouldBeKilled = Number.isInteger(killedPlayerRef);

  useOnMount(() => {
    popupOpened && playerShouldBeKilled && localStorage.setItem('killedAtNightPlayer', killedPlayerRef);
  });

  useOnUnmount(() => {
    localStorage.removeItem('killedAtNightPlayer');
    batch(() => {
      dispatch(removeKilledAtNightPlayer());
      dispatch(openPopup());
    });
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
          <PopUpLabel className='h1'>Убит</PopUpLabel>

          <PopUpCircle mini color='Night'>
            {killedPlayerRef + 1}
          </PopUpCircle>

          {/* @ts-expect-error */}
          <Timer killedOnLastMinute={!players[killedPlayerRef].isAlive} key={popupOpened} />
        </>
      ) : (
        <>
          <PopUpLabel className='h1'>Несострел</PopUpLabel>

          <PopUpCircle>
            <CylinderIcon fill={colors.Day.popupNightResult} size='80%' />
          </PopUpCircle>
        </>
      )}

      <PopUpButton color='Day' onClick={goToDay}>
        Закрыть
      </PopUpButton>
    </>
  );
};

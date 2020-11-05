import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import useOnMount from 'helpers/useOnMount';

import { clearSelectedNumbers, closePopup, openPopup, changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import Timer from 'components/Timer';
import { useCustomRef } from 'helpers/useCustomRef';

import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';

export default () => {
  const {
    players,
    game: {
      selectedNumbers,
      popupOpened,
      activePlayer,
      gameState: { dayNumber },
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const [killedPlayerRef] = useCustomRef(
    selectedNumbers[0] >= 0 ? selectedNumbers[0] : Number(localStorage.killedPlayer)
  );

  useOnMount(() => {
    dispatch(clearSelectedNumbers());

    popupOpened && localStorage.setItem('killedPlayer', killedPlayerRef);

    dayNumber === 1 && dispatch(closePopup());

    return () => {
      localStorage.removeItem('killedPlayer');
      dispatch(openPopup());
    };
  });

  const goToDay = () => {
    batch(() => {
      dispatch(closePopup());
      killedPlayerRef >= 0 && dispatch(killPlayer(killedPlayerRef));
      if (killedPlayerRef === activePlayer) dispatch(changeGameState({ phase: 'Day', dayNumber }));
    });
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  if (dayNumber === 1) return null;

  return (
    <>
      {killedPlayerRef >= 0 ? (
        <>
          <PopUpLabel className='h1'>Убит</PopUpLabel>

          <PopUpCircle mini color='Night'>
            {killedPlayerRef + 1}
          </PopUpCircle>

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

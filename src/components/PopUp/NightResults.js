import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearSelectedNumbers, closePopup, openPopup, changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'style/colors';

import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';
import Timer from '../Timer';

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

  const { current: killedPlayer } = useRef(
    selectedNumbers[0] >= 0 ? selectedNumbers[0] : Number(localStorage.killedPlayer)
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem('killedPlayer');
      dispatch(openPopup());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedNumbers());

    popupOpened && localStorage.setItem('killedPlayer', killedPlayer);

    dayNumber === 1 && dispatch(closePopup());
  }, [dispatch, dayNumber, killedPlayer, popupOpened]);

  const goToDay = () => {
    dispatch(closePopup());
    killedPlayer >= 0 && dispatch(killPlayer(killedPlayer));
    if (killedPlayer === activePlayer) dispatch(changeGameState({ phase: 'Day', dayNumber }));
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  return (
    <>
      {killedPlayer >= 0 ? (
        <>
          <PopUpLabel className='h1'>Убит</PopUpLabel>

          <PopUpCircle mini color='Night'>
            {killedPlayer + 1}
          </PopUpCircle>

          <Timer killedOnLastMinute={!players[killedPlayer].isAlive} key={popupOpened} />
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

import React from 'react';
import { useSelector } from 'react-redux';

import { SheriffStarIcon, NextIcon } from 'icons/svgIcons';
import { playersSelector } from 'redux/selectors';

import { PopUpLabel, PopUpButton } from '../styled-components';
import { BackButton, Sheriff } from './style';

export default ({ setDonTime, setPlayerToKill, setSheriffTime }) => {
  const players = useSelector(playersSelector);

  return (
    <>
      <BackButton
        onClick={() => {
          setDonTime(false);
          setPlayerToKill(undefined);
        }}
      >
        <NextIcon />
      </BackButton>

      <PopUpLabel color='Night' className='h2'>
        Дон ищет шерифа
      </PopUpLabel>

      <Sheriff>
        <SheriffStarIcon />

        <span>{players.findIndex(({ role }) => role === 'ШЕРИФ') + 1}</span>
      </Sheriff>

      <PopUpButton onClick={() => setSheriffTime(true)} color='Night'>
        Далее
      </PopUpButton>
    </>
  );
};
